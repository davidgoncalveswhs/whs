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

    // Teacher browsers keep only a few student codes.
    localStorage.removeItem("whsPassWebKeys");
    for (let i = 0; i < 60; i += 1) rememberPassCode("p" + i, "QQQQQ22222");
    const kept = JSON.parse(localStorage.getItem("whsPassWebKeys") || "{}");
    check(Object.keys(kept).length === 50 && kept.p59 && !kept.p0, "at most the 50 newest student codes are kept");
    localStorage.removeItem("whsPassWebKeys");

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
