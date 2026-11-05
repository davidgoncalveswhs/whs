// In-page checks for the WHS website. tests/web/run.mjs loads the site and runs these.
// CloudKit is stubbed, so nothing here talks to the real database.
window.runWhsChecks = async function runWhsChecks() {
  const failed = [];
  let passed = 0;
  const check = (ok, name) => { if (ok) passed += 1; else failed.push(name); };
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  const saved = {};
  const stub = (name, fn) => { if (!(name in saved)) saved[name] = window[name]; window[name] = fn; };
  const restore = () => { Object.keys(saved).forEach((k) => { window[k] = saved[k]; delete saved[k]; }); };
  const realFetch = window.fetch;
  window.fetch = async (url, opts) => String(url).includes("apple-cloudkit") ? new Response(JSON.stringify({ records: [] })) : realFetch(url, opts);
  const asRole = (role) => {
    profile = role === "student"
      ? { displayName: "Test Student", firstName: "Test", role: "student", grade: "10", key: "MJ5HZ7CGCV", guest: true, cloudSaved: false, classes: [] }
      : { displayName: "Test " + role, firstName: "Test", role, guest: true, key: "" };
    stub("verifiedStaffRole", () => (role === "student" ? "" : role));
    stub("ckWebAuthToken", () => "test");
  };
  try {
    check(getComputedStyle(document.documentElement).display !== "none", "page shows when it is the top window");

    // Every screen opens for every role, and staff screens stay closed to students.
    const screens = ["home", "news", "lunch", "contacts", "more", "swipe", "classes", "mypasses", "passes", "issuepass", "posts", "audit"];
    for (const role of ["student", "teacher", "administrator"]) {
      asRole(role);
      for (const name of screens) {
        try { show(name); await sleep(60); } catch (e) { failed.push(role + " can open " + name + ": " + e.message); }
      }
      restore();
    }
    asRole("student"); show("audit"); check(view !== "audit", "students can't open the audit log"); show("passes"); check(view !== "passes", "students can't open the pass log"); restore();
    asRole("teacher"); show("audit"); check(view !== "audit", "teachers can't open the audit log"); restore();
    asRole("administrator"); show("audit"); check(view === "audit", "administrators can open the audit log"); restore();

    // Text from the cloud is shown as text, never run as code.
    const bad = '<img src=x onerror="window.__xss=1">';
    window.__xss = 0;
    const box = document.createElement("div");
    box.innerHTML = newsRowsHTML([{ id: "n1", title: bad, subtitle: bad, image: "" }]);
    check(!box.querySelector("img[src='x']"), "news titles are escaped");
    box.innerHTML = passPaper({ recordName: "p", fields: { kind: { value: "hallway" }, studentName: { value: bad }, destination: { value: bad }, dates: { value: bad }, teacherName: { value: bad } } }, false);
    check(!box.querySelector("img[src='x']"), "pass fields are escaped");
    asRole("administrator"); view = "audit";
    document.getElementById("view-audit").innerHTML = '<div id="auditList"></div>';
    window._auditEntries = [{ when: Date.now(), who: "_x", action: "issue_pass", passIDs: "", count: 1, actor: bad, platform: "web" }];
    paintAuditLog();
    check(!document.querySelector("#auditList img"), "audit entries are escaped");
    restore();
    await sleep(50);
    check(window.__xss === 0, "no injected code ran");

    // The web code is hidden until the student chooses to show it.
    asRole("student"); show("more"); await sleep(60);
    check(document.getElementById("webCodeValue").textContent === "XXXXX-XXXXX", "web code starts hidden");
    check(!document.documentElement.innerHTML.includes("MJ5HZ-7CGCV"), "hidden web code isn't in the page");
    setWebCodeShown(true);
    check(document.getElementById("webCodeValue").textContent === "MJ5HZ-7CGCV", "Show code reveals it");
    show("home"); show("more");
    check(document.getElementById("webCodeValue").textContent === "XXXXX-XXXXX", "it hides again when More reopens");
    restore();

    // Teacher browsers don't keep student codes.
    check(typeof window.rememberPassCode === "undefined" && localStorage.getItem("whsPassWebKeys") === null, "teacher browsers don't store student codes");

    // The site's own database setting can't be overridden from the browser.
    localStorage.setItem("whsAdminEnv", "production");
    check(schoolEnv() === (window.WHS_CK_ENV === "production" ? "production" : "development"), "saved environment is ignored");
    localStorage.removeItem("whsAdminEnv");

    // Staff copies: school key works, wrong or missing key and old formats don't.
    const key = await crypto.subtle.importKey("raw", crypto.getRandomValues(new Uint8Array(32)), "AES-GCM", false, ["encrypt", "decrypt"]);
    window._staffKeyPromise = Promise.resolve(key);
    const sealedBody = await sealStaffBody('{"studentName":"T"}');
    check(sealedBody.indexOf("whs3.") === 0 && (await openStaffBody(sealedBody)) === '{"studentName":"T"}', "school key seals and opens staff copies");
    check((await openStaffBody("whs2.AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA")) === "", "old fixed-key copies stay closed");
    window._staffKeyPromise = null;
    stub("ckWebAuthToken", () => "");
    check((await sealStaffBody("secret")) === "", "nothing is saved without the school key");
    restore();

    // Revoke markers go out in batches.
    const calls = [];
    stub("ckCreateRecords", async () => false);
    stub("restModifyOps", async (ops) => { calls.push(ops.length); return { records: ops.map((o) => ({ recordName: o.record.recordName })) }; });
    await markPassesRevoked(Array.from({ length: 95 }, (_, i) => "ID-" + i));
    check(calls.join(",") === "40,40,15", "95 revoke markers take 3 requests");
    restore();

    // Deleting a pass: administrators only, revoke first, archive untouched.
    const fake = { recordName: "P-1", recordType: "WHSTeacherPass", fields: {} };
    window._passRecords = { "P-1": fake }; window._passLogList = [fake]; view = "passes";
    asRole("teacher"); openPass("P-1");
    check(!document.querySelector('[data-action="askDeletePass"]'), "teachers don't see Delete pass");
    closeSheet(); restore();
    asRole("administrator");
    const steps = [];
    stub("ensureCloud", async () => true);
    stub("ensureSavedStaffSession", async () => true);
    stub("requireEnrolledStaff", async () => "administrator");
    stub("auditLog", async (a) => steps.push("audit:" + a));
    stub("markPassesRevoked", async () => steps.push("revoked"));
    stub("saveClearedPassIDs", async () => steps.push("cleared"));
    stub("restLookupExact", async () => []);
    stub("restModifyOps", async (ops) => steps.push("delete:" + ops.map((o) => o.record.recordName).join("|")));
    confirmDeletePass("P-1"); await handleDeletePass("P-1");
    check(steps[0] === "audit:delete_pass" && steps[1] === "revoked" && /^delete:P-1\|body\.P-1\|seal\.P-1$/.test(steps[3] || ""), "delete logs, revokes, then deletes the pass records");
    check(!steps.join(" ").includes("whs-campus-archive"), "deleting one pass leaves the archive alone");

    // The same code must give the same names and keys as the app (values come from the app's tests).
    check(await profileRecordName("abcde-23456") === "profile.v2.5cc110d3709f3aa31942364a676d2032", "code-derived names match the app");
    // CloudKit calls carry a time limit so a stalled connection can't hang the page.
    let sawSignal = false;
    const fetchBefore = window.fetch;
    window.fetch = async (url, init) => { sawSignal = !!(init && init.signal); return new Response("{}"); };
    await cloudFetch("https://api.apple-cloudkit.com/test", { method: "POST" });
    window.fetch = fetchBefore;
    check(sawSignal, "CloudKit calls are sent with a time limit");
    const derivedNames = [await profileRecordName("ABCDE23456"), await webPassLinkName("ABCDE23456")].concat(await studentInboxNames("ABCDE23456"));
    check(derivedNames.length === 162 && derivedNames.every((n) => !n.toUpperCase().includes("ABCDE23456")), "record names never contain the code");
    check(await openSeal("ABCDE23456", "whs1.C6t8uM5f3OYCmyozqyq6wi3pGxGATVjaoZi8K1GdfoL8wLmPdqmvDuvM92YQ2R2OxoseOGI/") === "Grade 10 · Señor García", "the website opens text the app locked");
    check(await sealText("SHORT", "Grade 10") === "" && await sealText("ABCDE23456", "") === "", "text is never stored in the clear when it can't be locked");
    const lockedNames = await sealProfileNames("ABCDE23456", "Jordan S", "Jordan");
    const namesBack = await profileNames({ fields: { nameSeal: { value: lockedNames } } }, "ABCDE23456");
    check(lockedNames.indexOf("whs1.") === 0 && !lockedNames.includes("Jordan") && namesBack.firstName === "Jordan" && namesBack.displayName === "Jordan S", "student names on the school site are locked with the code");
    check((await profileNames({ fields: { nameSeal: { value: lockedNames } } }, "ZZZZZ99999")).firstName === "", "the wrong code can't read the name");

    // Deleting a profile only reports success when iCloud confirms every record is gone.
    const guest = { key: "ABCDE23456", cloudSaved: true };
    stub("restLookupDetailed", async () => ({ records: [], complete: true, failed: [] }));
    stub("ckWebAuthToken", () => "");
    check(await eraseOwnedProfileRecords(guest) === "needsApple", "deleting without Apple sign-in says so instead of succeeding");
    stub("ckWebAuthToken", () => "test");
    let deleteCalls = 0;
    stub("restModifyOps", async (ops) => { deleteCalls += 1; return { records: ops.map((o) => ({ recordName: o.record.recordName, serverErrorCode: "SERVER_ERROR" })) }; });
    check(await eraseOwnedProfileRecords(guest) === "failed" && deleteCalls === 10, "a failed delete is retried (5 batches, twice each), then reported");
    stub("restModifyOps", async () => { throw new Error("offline"); });
    check(await eraseOwnedProfileRecords(guest) === "failed", "an offline delete is reported");
    stub("restModifyOps", async (ops) => ({ records: ops.map((o) => ({ recordName: o.record.recordName, serverErrorCode: "NOT_FOUND" })) }));
    check(await eraseOwnedProfileRecords(guest) === true, "records that are already gone count as deleted");
    check(await eraseOwnedProfileRecords({ key: "ABCDE23456", cloudSaved: false }) === true, "profiles the app owns are left to the app");
    let deletedNames = [];
    stub("restModifyOps", async (ops) => { deletedNames.push(...ops.map((o) => o.record.recordName)); return { records: ops.map((o) => ({ recordName: o.record.recordName, serverErrorCode: "NOT_FOUND" })) }; });
    await eraseOwnedProfileRecords(guest);
    check(deletedNames.length === 162 && deletedNames.includes("profile.v2.5cc110d3709f3aa31942364a676d2032") && deletedNames.some((n) => n.indexOf("inbox.v2.") === 0) && deletedNames.some((n) => n.indexOf("webpass.v2.") === 0), "a delete targets every record the code could own, found or not");
    stub("restLookupDetailed", async () => ({ records: [], complete: false, failed: ["x"] }));
    check(await eraseOwnedProfileRecords(guest) === "failed", "a lookup that didn't finish is reported, not treated as success");
    stub("restLookupDetailed", async () => ({ records: [], complete: true, failed: [] }));
    stub("restModifyOps", async (ops) => ({ records: ops.map((o) => ({ recordName: o.record.recordName, serverErrorCode: o.record.recordName.indexOf("profile.") === 0 ? "NOT_FOUND" : "ACCESS_DENIED" })) }));
    check(await eraseOwnedProfileRecords(guest) === "partial", "teacher-made records the student can't delete are reported as left behind, not deleted");
    stub("restModifyOps", async (ops) => ({ records: ops.map((o) => ({ recordName: o.record.recordName, serverErrorCode: "ACCESS_DENIED" })) }));
    check(await eraseOwnedProfileRecords(guest) === "failed", "the student's own profile has to be deleted");
    profile = { displayName: "T", firstName: "T", role: "student", key: "ABCDE23456", guest: true, cloudSaved: true, classes: [] };
    stub("restModifyOps", async () => { throw new Error("offline"); });
    confirmRemoveProfile();
    await removeChromebookProfile();
    check(profile && profile.key === "ABCDE23456" && (document.getElementById("removeProfileError") || {}).textContent, "a failed delete keeps the profile and shows why");
    closeSheet();
    restore();
    await privateCodeTag("ABCDE23456");
    forgetLocalProfile();
    check(codeKeyCache.size === 0, "signing out clears cached code keys");

    // The browser saves a locked device key, never the code.
    profile = { displayName: "T", firstName: "T", role: "student", key: "ABCDE23456", guest: true, cloudSaved: true, classes: [] };
    const keptForLater = await rememberProfileCode("ABCDE23456");
    const savedText = localStorage.getItem("whsWebProfile") || sessionStorage.getItem("whsWebProfileSession") || "";
    check(keptForLater && savedText && !savedText.toUpperCase().includes("ABCDE23456") && JSON.parse(savedText).key === "whsk:5cc110d3709f3aa31942364a676d2032", "the saved profile holds a device key, not the code");
    const handle = JSON.parse(savedText).key;
    forgetCodeKeys();
    check(await profileRecordName(handle) === "profile.v2.5cc110d3709f3aa31942364a676d2032", "the device key finds the same records after a restart");
    check(await openSeal(handle, "whs1.C6t8uM5f3OYCmyozqyq6wi3pGxGATVjaoZi8K1GdfoL8wLmPdqmvDuvM92YQ2R2OxoseOGI/") === "Grade 10 · Señor García", "the device key opens the student's data");
    const stored = await keyStoreDo("readonly", (store) => store.get("5cc110d3709f3aa31942364a676d2032"));
    check(stored && stored.extractable === false, "the device key can't be read out of the browser");
    profile.key = handle;
    check(hasWebKey() && !guestWebCodeCard().includes("ABCDE") && guestWebCodeCard().includes(t().webCodeNotKept), "after the browser closes, More shows a note instead of the code");
    profile.key = "ABCDE23456";
    check(guestWebCodeCard().includes('data-action="toggleWebCode"'), "during the session the code can still be shown");
    forgetLocalProfile();
    await sleep(150);
    check(!(await keyStoreDo("readonly", (store) => store.count())) && !sessionStorage.getItem("whsSessionCode"), "signing out removes the device key and the session code");

    // Saved profile details are locked with the device key.
    profile = { displayName: "Jordan S", firstName: "Jordan", role: "student", grade: "11", key: "ABCDE23456", guest: true, cloudSaved: true, classes: [{ name: "Chemistry" }] };
    await rememberProfileCode("ABCDE23456", true);
    const shellText = localStorage.getItem("whsWebProfile") || "";
    check(shellText && !/Jordan|Chemistry|"grade"/.test(shellText) && JSON.parse(shellText).sealed.indexOf("whs1.") === 0, "the saved profile keeps no name, grade, or classes in the clear");
    profile = JSON.parse(shellText);
    forgetCodeKeys();
    check(await unlockStoredProfile() && profile.firstName === "Jordan" && profile.grade === "11" && profile.classes[0].name === "Chemistry", "the device key opens the saved profile again");
    profile = JSON.parse(shellText);
    profile.key = "whsk:" + "0".repeat(32);
    check(await unlockStoredProfile() === false, "a missing device key can't open the saved profile");
    forgetLocalProfile();
    await sleep(150);

    // Not choosing to stay signed in keeps nothing for later.
    profile = { displayName: "T", firstName: "T", role: "student", key: "ABCDE23456", guest: true, cloudSaved: true, classes: [] };
    const keptKey = await rememberProfileCode("ABCDE23456", false);
    check(!keptKey && !(await keyStoreDo("readonly", (store) => store.count())) && !localStorage.getItem("whsWebProfile") && !!sessionStorage.getItem("whsWebProfileSession"), "without Keep me signed in, nothing outlasts the browser session");
    forgetLocalProfile();
    await sleep(150);
    check(!!document.getElementById("keepSignedIn") && !document.getElementById("keepSignedIn").checked && !document.getElementById("guestKeepSignedIn").checked, "Keep me signed in is offered and starts unchecked");

    // Without Keep me signed in, 30 idle minutes sign the student out; activity keeps them in.
    profile = { displayName: "T", firstName: "T", role: "student", key: "ABCDE23456", guest: true, cloudSaved: false, classes: [], keyStored: false };
    sessionStorage.setItem("whsLastActive", String(Date.now() - 10 * 60000));
    checkStudentIdle();
    check(!!profile, "a session stays signed in after 10 idle minutes");
    sessionStorage.setItem("whsLastActive", String(Date.now() - 31 * 60000));
    checkStudentIdle();
    check(profile === null && gateError.textContent === t().idleSignedOut, "a session signs out after 30 idle minutes");
    profile = { displayName: "T", firstName: "T", role: "student", key: "whsk:" + "1".repeat(32), guest: false, classes: [], seenAt: Date.now() - 91 * 86400000 };
    checkStudentIdle();
    check(!!profile, "a kept device key still works after 91 days without use");
    profile = { displayName: "T", firstName: "T", role: "student", key: "whsk:" + "1".repeat(32), guest: false, classes: [], seenAt: Date.now() - 181 * 86400000 };
    checkStudentIdle();
    check(profile === null, "a kept device key is dropped after 180 days without use, even while the page is open");
    profile = { displayName: "T", firstName: "T", role: "student", key: "whsk:" + "1".repeat(32), guest: false, classes: [], seenAt: Date.now() - 2 * 86400000 };
    const seenBefore = profile.seenAt;
    checkStudentIdle();
    check(profile && profile.seenAt === seenBefore, "an open page with no input doesn't restart the 180 days");
    noteActivity();
    check(profile && profile.seenAt > seenBefore, "real input restarts the 180 days");
    profile = { displayName: "T", firstName: "T", role: "student", key: "whsk:" + "1".repeat(32), guest: false, classes: [], seenAt: Date.now() - 181 * 86400000 };
    noteActivity();
    check(profile === null, "a device waking after 180 days is signed out by its first tap, not renewed");
    profile = { displayName: "T", firstName: "T", role: "student", key: "ABCDE23456", guest: true, cloudSaved: false, classes: [], keyStored: false };
    sessionStorage.setItem("whsLastActive", String(Date.now() - 31 * 60000));
    noteActivity();
    check(profile === null, "a session waking after 30 idle minutes is signed out by its first tap, not renewed");
    gateError.textContent = "";
    profile = null;

    // Signing out in another tab signs this one out too.
    profile = { displayName: "T", firstName: "T", role: "student", key: "ABCDE23456", guest: true, classes: [] };
    window.dispatchEvent(new StorageEvent("storage", { key: "whsSignedOutAt", newValue: String(Date.now()) }));
    check(profile === null, "a sign-out in another tab (storage event) signs this tab out");
    if (typeof BroadcastChannel === "function") {
      profile = { displayName: "T", firstName: "T", role: "student", key: "ABCDE23456", guest: true, classes: [] };
      const otherTab = new BroadcastChannel("whs-session");
      otherTab.postMessage({ type: "signout" });
      await sleep(100);
      check(profile === null, "a sign-out in another tab (broadcast) signs this tab out");
      let heard = false;
      otherTab.onmessage = (event) => { heard = event.data && event.data.type === "signout"; };
      profile = { displayName: "T", firstName: "T", role: "student", key: "ABCDE23456", guest: true, classes: [] };
      forgetLocalProfile();
      await sleep(100);
      check(heard && !!localStorage.getItem("whsSignedOutAt"), "signing out tells every other open tab");
      otherTab.close();
    }

    // A code reset that leaves teacher-made records says so.
    profile = { displayName: "T", firstName: "T", role: "student", key: "ABCDE23456", guest: true, cloudSaved: true, classes: [] };
    stub("ckWebAuthToken", () => "test");
    stub("allocateGuestStudentKey", async () => "FGHJK23456");
    stub("eraseOwnedProfileRecords", async () => "partial");
    stub("rememberProfileCode", async () => true);
    await resetWebCode();
    check(profile && profile.key === "FGHJK23456" && document.getElementById("sheetCard").textContent.includes(t().webCodeResetLeftBehind.slice(0, 30)), "a code reset that leaves records behind tells the student");
    closeSheet();
    restore();

    // A browser-only profile says its code can't bring it back.
    profile = { displayName: "T", firstName: "T", role: "student", key: "ABCDE23456", guest: true, cloudSaved: false, classes: [] };
    check(guestWebCodeCard().includes("localOnlyNote"), "a browser-only profile explains its code can't restore it");
    profile.cloudSaved = true;
    check(!guestWebCodeCard().includes("localOnlyNote"), "a school-site profile doesn't show that note");
    forgetLocalProfile();
    await sleep(100);
    gateError.textContent = "";

    // Signing out of this device only keeps the school-site profile.
    profile = { displayName: "T", firstName: "T", role: "student", key: "ABCDE23456", guest: true, cloudSaved: true, classes: [] };
    show("more");
    await sleep(80);
    check(!!document.querySelector('[data-action="askSignOutOnly"]'), "students get a Sign out that doesn't delete their profile");
    let erased = false;
    stub("eraseOwnedProfileRecords", async () => { erased = true; return true; });
    signOutThisDevice("");
    check(profile === null && !erased, "Sign out leaves the school-site profile alone");
    restore();

    // A save still running when the student signs out writes nothing back.
    profile = { displayName: "Late", firstName: "Late", role: "student", key: "ABCDE23456", guest: true, cloudSaved: true, classes: [] };
    const lateRemember = rememberProfileCode("ABCDE23456", true);
    forgetLocalProfile();
    await lateRemember;
    await sleep(150);
    check(!localStorage.getItem("whsWebProfile") && !sessionStorage.getItem("whsWebProfileSession") && !(await keyStoreDo("readonly", (store) => store.count())) && !codeKeyCache.has("ABCDE23456"), "a save still running at sign-out leaves nothing behind");
    profile = { displayName: "Late", firstName: "Late", role: "student", key: "ABCDE23456", keyHandle: "whsk:5cc110d3709f3aa31942364a676d2032", guest: true, classes: [] };
    const lateStore = storeProfile();
    forgetLocalProfile();
    await lateStore;
    check(!localStorage.getItem("whsWebProfile"), "a queued profile write is dropped after sign-out");
    profile = { role: "student", key: "whsk:" + "2".repeat(32), sealed: "whs1.AAAA" };
    storeProfile();
    await sleep(50);
    check(!localStorage.getItem("whsWebProfile"), "a still-locked profile is never saved over");
    forgetLocalProfile();
    await sleep(100);

    // Student codes typed by teachers don't stay in memory.
    await privateCodeTag("ZZZZZ22222");
    forgetCodeKey("zzzzz-22222");
    check(!codeKeyCache.has("ZZZZZ22222"), "a teacher's browser forgets a student's code after use");
    for (const c of ["AAAAA22222", "BBBBB22222", "CCCCC22222", "DDDDD22222", "EEEEE22222"]) await privateCodeTag(c);
    check(codeKeyCache.size <= 4, "at most four codes are kept in memory");
    forgetCodeKeys();
    profile = { displayName: "T", firstName: "T", role: "student", key: "ABCDE23456", classes: [] };
    let askedFor = [];
    stub("fetchByNames", async (db, names) => { askedFor = names; return []; });
    await ownProfileSecrets();
    check(askedFor.length === 1 && askedFor[0] === "profile.v2.5cc110d3709f3aa31942364a676d2032", "photo, ID, and study data load from the derived profile name");
    restore();
    profile = null;
    restore();
  } catch (error) {
    failed.push("checks crashed: " + (error && error.message));
  } finally {
    restore();
    window.fetch = realFetch;
    profile = null;
    localStorage.clear();
    try { closeSheet(); show("home"); } catch (_) {}
  }
  return { passed, failed };
};
