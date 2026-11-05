// WHS WebView: Campus pass log, sign-in screens, button handling, and startup.
// Files load in order (see index.html) and share one global scope.
function parsePassDate(text) {
  const raw = String(text || "").trim().replace(/[–—]/g, "-");
  if (!raw) return null;
  const start = raw.split(/\s+(?:to|through|thru|al|hasta)\s+/i)[0].split(/\s+-\s+/)[0].trim();
  const tryOne = (value) => {
    const parsed = Date.parse(value);
    if (Number.isNaN(parsed)) return null;
    const date = new Date(parsed);
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
  };
  return tryOne(start) || tryOne(raw) || (() => {
    const match = raw.match(/([A-Za-z]{3,9}\.?\s+\d{1,2}(?:,?\s+\d{2,4})?|\d{1,2}\/\d{1,2}(?:\/\d{2,4})?|\d{4}-\d{2}-\d{2})/);
    return match ? tryOne(match[1]) : null;
  })();
}
function passCreatedStamp(record) {
  const created = record && record.created;
  if (created) {
    if (typeof created.timestamp === "number") return created.timestamp;
    if (typeof created === "number") return created;
    const parsed = Date.parse(created.timestamp || created);
    if (!Number.isNaN(parsed)) return parsed;
  }
  const modified = record && record.modified;
  if (modified && typeof modified.timestamp === "number") return modified.timestamp;
  const field = record && record.fields && record.fields.createdAt;
  const raw = field && Object.prototype.hasOwnProperty.call(field, "value") ? field.value : field;
  if (typeof raw === "number") return raw;
  const fromText = Date.parse(fieldValue(record, "createdAt"));
  return Number.isNaN(fromText) ? 0 : fromText;
}
function passDayStamp(record) {
  const fromDates = parsePassDate(fieldValue(record, "dates"));
  if (fromDates) return fromDates.getTime();
  const created = passCreatedStamp(record);
  if (created) {
    const date = new Date(created);
    return new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();
  }
  return 0;
}
function formatPassDay(stamp) {
  if (!stamp) return t().passNoDate;
  const date = new Date(stamp);
  const loc = lang === "es" ? "es-US" : "en-US";
  let weekday = date.toLocaleDateString(loc, { weekday: "long" });
  weekday = weekday.charAt(0).toUpperCase() + weekday.slice(1);
  const month = date.toLocaleDateString(loc, { month: "short" }).replace(/\.$/, "") + ".";
  const day = date.getDate();
  return lang === "es" ? `${weekday} ${day} ${month}` : `${weekday} ${month} ${day}`;
}
function passSearchBlob(record) {
  const stamp = passDayStamp(record);
  const date = stamp ? new Date(stamp) : null;
  const loc = lang === "es" ? "es-US" : "en-US";
  const extras = date ? [
    formatPassDay(stamp),
    date.toLocaleDateString(loc, { weekday: "long" }),
    date.toLocaleDateString(loc, { month: "long" }),
    date.toLocaleDateString(loc, { month: "short" }),
    `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`,
    `${date.getMonth() + 1}/${date.getDate()}`,
    `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`
  ] : [];
  return [fieldValue(record, "studentName"), fieldValue(record, "destination"), fieldValue(record, "dates")]
    .concat(extras)
    .join(" ")
    .toLowerCase();
}
function passSlotHTML(record, order) {
  const c = t();
  const id = passRecordName(record) || String(Math.random());
  const revoked = passIsRevoked(record);
  const stamp = revoked ? `<span class="pass-revoked-stamp">${c.revoked}</span>` : "";
  const orderStyle = Number.isFinite(order) ? ` style="order:${order}"` : "";
  return `<div class="pass-slot"${orderStyle}><button type="button" class="action" data-action="openPass" data-pass-id="${escapeHtml(id)}"><span class="paper-wrap${revoked ? " is-revoked" : ""}">${passPaper(record, false)}${stamp}</span></button></div>`;
}
function passGridHTML(records) {
  const left = [];
  const right = [];
  records.forEach((record, index) => {
    const html = passSlotHTML(record, index);
    if (index % 2 === 0) left.push(html);
    else right.push(html);
  });
  return `<div class="pass-grid"><div class="pass-col">${left.join("")}</div><div class="pass-col">${right.join("")}</div></div>`;
}
function paintPassLog() {
  const node = document.getElementById("passes");
  if (!node) return;
  const c = t();
  const query = String((document.getElementById("passQuery") || {}).value || window._passQuery || "").trim().toLowerCase();
  window._passQuery = query;
  const list = (window._passLogList || []).filter((record) => !query || passSearchBlob(record).indexOf(query) !== -1);
  if (!list.length) {
    node.innerHTML = `<div class="card"><p class="muted">${(window._passLogList || []).length ? c.passSearchEmpty : c.emptyPasses}</p></div>`;
    return;
  }
  const groups = new Map();
  list.forEach((record) => {
    const stamp = passDayStamp(record);
    const key = String(stamp);
    if (!groups.has(key)) groups.set(key, { stamp, records: [] });
    groups.get(key).records.push(record);
  });
  const days = [...groups.values()].sort((a, b) => b.stamp - a.stamp);
  days.forEach((day) => {
    day.records.sort((a, b) => {
      const recency = passCreatedStamp(b) - passCreatedStamp(a);
      if (recency) return recency;
      const name = fieldValue(a, "studentName").localeCompare(fieldValue(b, "studentName"));
      if (name) return name;
      return fieldValue(a, "destination").localeCompare(fieldValue(b, "destination"));
    });
  });
  node.innerHTML = days.map((day) => (
    `<section class="pass-day"><h2 class="section">${escapeHtml(formatPassDay(day.stamp))}</h2>${passGridHTML(day.records)}</section>`
  )).join("");
}
async function loadPasses() {
  if (view !== "passes") return;
  if (window._passLoadBusy) {
    window._passLoadAgain = true;
    return;
  }
  window._passLoadBusy = true;
  const node = document.getElementById("view-passes");
  const c = t();
  const query = String((document.getElementById("passQuery") || {}).value || window._passQuery || "");
  window._passQuery = query;
  if (!document.getElementById("passes")) {
    node.innerHTML = `<div class="toolbar" style="display:flex;gap:8px;flex-wrap:wrap;">${canIssuePass() ? `<button class="ghost" type="button" data-go="issuepass">${c.issuePass}</button>` : ""}<button class="ghost" type="button" id="refreshPasses">${c.refresh}</button></div><input class="search" id="passQuery" aria-label="${escapeHtml(c.passSearch)}" placeholder="${c.passSearch}" value="${escapeHtml(query)}"><div id="passes"></div>`;
  }
  if (window._passLogList && window._passLogList.length) paintPassLog();
  if (!(await ensureCloud())) {
    window._passLoadBusy = false;
    if (!document.getElementById("passes")) {
      node.insertAdjacentHTML("beforeend", `<div class="card"><p class="muted">${c.adminHint}</p></div>`);
    }
    return;
  }
  const seen = new Map();
  const remember = (record) => { if (record && record.recordName) seen.set(record.recordName, record); };
  try {
    const db = CloudKit.getDefaultContainer().publicCloudDatabase;
    // The staff log is a CloudKit query over the staff copies of passes.
    const ids = [...new Set((await queryStaffPassIDs(500)) || [])].slice(0, 500);
    const hasManifest = ids.length > 0;
    if (ids.length) {
      (await fetchByNames(db, ids.concat(ids.flatMap((id) => [tombstoneName(id), revokedName(id)]), [CLEARED, CAMPUS_CLEARED]))).forEach(remember);
      const privateCleared = await readExact(CAMPUS_CLEARED);
      if (privateCleared) remember(privateCleared);
    } else if (hasManifest) {
      (await fetchByNames(db, [CLEARED, CAMPUS_CLEARED])).forEach(remember);
    }
    window._revokedPassIDs = collectRevokedIDs([...seen.values()]);
    window._clearedPassIDs = collectClearedIDs([...seen.values()]);
    const usable = [...seen.values()].filter((r) => {
      if (isPassMarker(r)) return false;
      const id = passRecordName(r).toLowerCase();
      if (window._clearedPassIDs && window._clearedPassIDs.has(id)) return false;
      return !!(fieldValue(r, "studentName") || fieldValue(r, "teacherName"));
    });
    await applyStaffBodies(usable);
    window._passRecords = {};
    usable.forEach((record) => {
      const id = passRecordName(record);
      if (id) window._passRecords[id] = record;
    });
    window._passLogList = usable;
    if (view === "passes") paintPassLog();
    if (usable.length) auditLog("view_log", [], usable.length);
    await applyPassIcons(usable);
    if (view === "passes") paintPassLog();
  } catch (error) {
    if (view === "passes" && node && !document.getElementById("passes")) {
      node.insertAdjacentHTML("beforeend", `<p class="error">${escapeHtml(error.message)}</p>`);
    }
  }
  window._passLoadBusy = false;
  if (window._passLoadAgain) {
    window._passLoadAgain = false;
    loadPasses();
  }
}

function returnToCodeGate() {
  localStorage.removeItem("whsWebProfile");
  profile = null;
  applyAvatar("");
  showGate();
}

async function enterWithCode() {
  gateError.textContent = "";
  const key = normalizeCode(webCode.value);
  if (key.length < 8) {
    gateError.textContent = t().gateFail;
    return;
  }
  if (!schoolToken()) {
    gateError.textContent = t().gateFail;
    return;
  }
  try { await ensureCloud({ skipAuth: true }); } catch (_) {}
  try {
    let db = null;
    try { db = CloudKit.getDefaultContainer().publicCloudDatabase; } catch (_) {}
    // Profiles are stored under a name derived from the code, never the code itself.
    const recordName = await profileRecordName(key);
    const records = await fetchByNames(db, [recordName]);
    const record = records.find((item) => String(item.recordName || "") === recordName);
    if (!record) {
      gateError.textContent = t().gateFail;
      return;
    }
    const role = normalizeRole(fieldValue(record, "role"));
    if (!role) {
      gateError.textContent = t().gateFail;
      return;
    }
    const secrets = await profileSecrets(record, key);
    const names = await profileNames(record, key);
    profile = {
      displayName: names.displayName || names.firstName || "Warrior",
      firstName: names.firstName || "",
      role,
      grade: secrets.grade || "",
      key
    };
    localStorage.setItem("whsWebProfile", JSON.stringify(profile));
    applyAvatar(secrets.photo);
    showGate();
    show("home");
  } catch (error) {
    gateError.textContent = error.message || t().gateFail;
  }
}

fetch("./staff.json").then((res) => res.json()).then((data) => {
  staff = data;
  if (view === "contacts") renderStaff("");
}).catch(() => {});

document.body.addEventListener("click", (event) => {
  const mail = event.target.closest("[data-mail]");
  if (mail && mail.dataset.mail) {
    window.location.href = mail.dataset.mail;
    return;
  }
  const action = event.target.closest("[data-action]");
  if (action) {
    const name = action.dataset.action;
    if (name === "copyStaffId") {
      const id = (document.getElementById("staffCloudId") || {}).textContent || window._ckUserRecordName || "";
      if (id && navigator.clipboard) navigator.clipboard.writeText(id).catch(() => {});
      return;
    }
    if (name === "guestSetup") {
      showGuestStep();
      return;
    }
    if (name === "swipe") show("swipe");
    if (name === "passesInfo") openPassesInfo();
    if (name === "ask") openAsk("");
    if (name === "aide") openAide();
    if (name === "askGo") answerAsk(document.getElementById("askBox") && document.getElementById("askBox").value);
    if (name === "closeSheet") closeSheet();
    if (name === "openNewsItem") {
      const item = window._newsItems && window._newsItems[action.dataset.newsId || ""];
      if (item) {
        openSheet(`
          <div class="card-title"><b>${escapeHtml(item.title)}</b><button type="button" data-action="closeSheet">${t().close}</button></div>
          ${item.image ? `<img class="news-full" alt="" src="${escapeHtml(item.image)}">` : ""}
          <p class="muted">${escapeHtml(item.subtitle)}</p>`);
      }
    }
    if (name === "composeNews") show("posts");
    if (name === "askDeleteNews") confirmDeleteNews(action.dataset.newsId || "");
    if (name === "deleteNews") deleteNewsPost(action.dataset.newsId || "");
    if (name === "pickNewsImage") {
      const picker = document.getElementById("newsImage");
      if (picker) picker.click();
    }
    if (name === "publishNews") publishNewsPost();
    if (name === "passKind") {
      window._issuePassKind = action.dataset.kind === "hallway" ? "hallway" : "flex";
      document.querySelectorAll("[data-action='passKind']").forEach((node) => {
        node.classList.toggle("on", node.dataset.kind === window._issuePassKind);
      });
    }
    if (name === "clearPassSig") {
      bindPassSignaturePad();
    }
    if (name === "issuePass") issuePassFromWeb();
    if (name === "useCode") returnToCodeGate();
    if (name === "toggleWebCode") setWebCodeShown(!window._webCodeShown);
    if (name === "auditMore") loadAuditLog(false);
    if (name === "auditRefresh") loadAuditLog(true);
    if (name === "askResetWebCode") askResetWebCode();
    if (name === "confirmResetWebCode") resetWebCode();
    if (name === "copyWebCode") {
      const formatted = formatWebKey(profile && profile.key);
      const button = document.getElementById("copyWebCode");
      const done = () => {
        if (button) button.textContent = t().webCodeCopied;
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(formatted).then(done).catch(done);
      } else {
        done();
      }
    }
    if (name === "pickSwipe") {
      const picker = document.getElementById("swipeFile");
      if (picker) picker.click();
    }
    if (name === "removeProfile") removeChromebookProfile();
    if (name === "addHome") showAddHome();
    if (name === "installHome") promptInstallHome();
    if (name === "openPass" || name === "openStudentPass") openPass(action.dataset.passId || "");
    if (name === "askDeletePass") confirmDeletePass(action.dataset.passId || "");
    if (name === "deletePass") handleDeletePass(action.dataset.passId || "");
    if (name === "askRevokePass") confirmRevokePass(action.dataset.passId || "");
    if (name === "revokePass") handleRevokePass(action.dataset.passId || "");
    if (name === "askClearPassLog") confirmClearPassLog();
    if (name === "clearPassLog") handleClearPassLog();
    if (name === "finishPassWipe") finishPassWipe();
    if (name === "finishIssuePass") finishIssuePass();
    if (name === "openClass") {
      window._classID = action.dataset.classId || "";
      show("class");
    }
    if (name === "addClass") showClassEditor(null);
    if (name === "editClass") showClassEditor(classById(action.dataset.classId || ""));
    if (name === "saveClass") saveClassFromSheet();
    if (name === "askDeleteClass") confirmDeleteClass(action.dataset.classId || "");
    if (name === "deleteClass") deleteGuestClass(action.dataset.classId || "");
    if (name === "openResource") openResource(action.dataset.classId || "", action.dataset.resource || "");
    if (name === "openReadySet") startLearnQuiz(action.dataset.set || "");
    if (name === "qlClose") {
      window._studyMode = { type: "readySets" };
      renderStudy();
    }
    if (name === "qlPick") {
      const ql = window._ql;
      if (ql && !ql.revealed && !ql.finished) {
        ql.selected = action.dataset.pick || "";
        ql.revealed = true;
        if (ql.selected === (ql.deck[ql.index] && ql.deck[ql.index].answer)) ql.correct += 1;
        renderStudy();
      }
    }
    if (name === "qlContinue") {
      const ql = window._ql;
      if (ql) {
        if (ql.index + 1 >= ql.deck.length) ql.finished = true;
        else {
          ql.index += 1;
          ql.selected = "";
          ql.revealed = false;
          loadLearnOptions();
        }
        renderStudy();
      }
    }
    if (name === "qlAgain") startLearnQuiz((window._ql && window._ql.setId) || "");
    if (name === "openList") {
      window._studyPairs = pairsFromList(action.dataset.kind || "spanish", action.dataset.folder || "", action.dataset.list || "");
      window._cardIndex = 0;
      window._cardFlip = false;
      window._quiz = null;
      window._studyMode = action.dataset.kind === "englishQuiz" ? { type: "quiz" } : { type: "cards" };
      if (window._studyMode.type === "quiz") startQuiz(window._studyPairs.filter((pair) => pair.back));
      show("study");
      renderStudy();
    }
    if (name === "openFile") {
      window._studyMode = { type: "file", file: action.dataset.file, kind: action.dataset.kind, title: action.dataset.title };
      show("study");
      renderStudy();
    }
    if (name === "flipCard") {
      window._cardFlip = !window._cardFlip;
      renderStudy();
    }
    if (name === "nextCard") {
      window._cardIndex = (window._cardIndex || 0) + 1;
      if (window._cardIndex >= (window._studyPairs || []).length) window._cardIndex = 0;
      window._cardFlip = false;
      renderStudy();
    }
    if (name === "prevCard") {
      window._cardIndex = (window._cardIndex || 0) - 1;
      if (window._cardIndex < 0) window._cardIndex = Math.max(0, (window._studyPairs || []).length - 1);
      window._cardFlip = false;
      renderStudy();
    }
    if (name === "startQuiz") {
      window._studyMode = { type: "quiz" };
      startQuiz((window._studyPairs || []).filter((pair) => pair.back));
      renderStudy();
    }
    if (name === "quizPick") {
      const quiz = window._quiz;
      if (quiz && quiz.order[quiz.index]) {
        const pick = Number(action.dataset.pick);
        const choices = quiz.choices[quiz.index] || [];
        if (choices[pick] === quiz.order[quiz.index].back) quiz.correct += 1;
        quiz.index += 1;
        renderStudy();
      }
    }
  }
  const go = event.target.closest("[data-go]");
  if (go) show(go.dataset.go);
  const tab = event.target.closest("button[data-view]");
  if (tab) show(tab.dataset.view);
  if (event.target.id === "en") { lang = "en"; localStorage.setItem("whsAdminLang", lang); show(view); }
  if (event.target.id === "es") { lang = "es"; localStorage.setItem("whsAdminLang", lang); show(view); }
  if (event.target.id === "signOutProfile" || event.target.closest("#signOutProfile")) {
    confirmRemoveProfile();
  }
  if (event.target.id === "openPasses") show("passes");
  if (event.target.id === "refreshPasses") loadPasses();
  if (event.target.closest("#bell")) show("news");
  if (event.target.closest("#me")) show("more");
  if (event.target.id === "skipSite" || event.target.closest("#skipSite")) showGuestStep();
  if (event.target.id === "guestFinish" || event.target.closest("#guestFinish")) enterGuest();
  if (event.target.id === "enterSite" || event.target.closest("#enterSite")) enterWithCode();
});
document.body.addEventListener("input", (event) => {
  if (event.target.id === "staffQuery") renderStaff(event.target.value);
  if (event.target.id === "passQuery") paintPassLog();
  if (event.target.id === "auditQuery") paintAuditLog();
});
document.body.addEventListener("change", (event) => {
  if (event.target.id === "guestRole") {
    const err = document.getElementById("setupError");
    if (err) err.textContent = "";
    syncGuestRoleFields();
  }
  if (event.target.id === "swipeFile" && event.target.files && event.target.files[0]) {
    handleSwipeFile(event.target.files[0]);
    event.target.value = "";
  }
  if (event.target.id === "newsImage" && event.target.files && event.target.files[0]) {
    handleNewsImage(event.target.files[0]);
    event.target.value = "";
  }
});
document.body.addEventListener("keydown", (event) => {
  if (event.key === "Enter" && event.target.id === "askBox") {
    event.preventDefault();
    answerAsk(event.target.value);
  }
  if (event.key === "Enter" && event.target.id === "webCode") {
    event.preventDefault();
    enterWithCode();
  }
  if (event.key === "Enter" && (event.target.id === "guestName" || event.target.id === "guestGrade")) {
    event.preventDefault();
    enterGuest();
  }
  if (event.key === "Escape") closeSheet();
});
sheet.addEventListener("click", (event) => {
  if (event.target === sheet) closeSheet();
});
function showPairStep() {
  window._gateStep = "pair";
  window._pendingGuestStaff = null;
  document.body.classList.remove("whs-apple-gate");
  document.getElementById("gatePair").classList.remove("hidden");
  document.getElementById("gateSetup").classList.add("hidden");
  const apple = document.getElementById("gateApple");
  if (apple) apple.classList.add("hidden");
  parkCkAuth();
  const err = document.getElementById("setupError");
  if (err) err.textContent = "";
  const appleErr = document.getElementById("appleError");
  if (appleErr) appleErr.textContent = "";
}
function showGuestStep() {
  window._gateStep = "guest";
  document.getElementById("gatePair").classList.add("hidden");
  document.getElementById("gateSetup").classList.remove("hidden");
  const apple = document.getElementById("gateApple");
  if (apple) apple.classList.add("hidden");
  applyChrome();
  const name = document.getElementById("guestName");
  if (name) name.focus();
}
function syncGuestRoleFields() {
  const role = normalizeRole((document.getElementById("guestRole") || {}).value);
  const staff = role === "teacher" || role === "administrator";
  const gradeRow = document.getElementById("guestGradeRow");
  if (gradeRow) gradeRow.classList.toggle("hidden", staff);
}
function pendingStaffFromForm() {
  if (!((window._gateStep === "guest" || window._gateStep === "apple") && gateIsOpen())) return null;
  const name = String((document.getElementById("guestName") || {}).value || "").trim();
  const role = normalizeRole((document.getElementById("guestRole") || {}).value);
  if ((role !== "teacher" && role !== "administrator") || !name) return null;
  return { name, role };
}
async function enterGuest() {
  const name = String((document.getElementById("guestName") || {}).value || "").trim();
  const role = normalizeRole((document.getElementById("guestRole") || {}).value);
  const grade = String((document.getElementById("guestGrade") || {}).value || "").trim();
  const err = document.getElementById("setupError");
  const staff = role === "teacher" || role === "administrator";
  if (!name) {
    if (err) err.textContent = t().guestNeedInfo;
    return;
  }
  if (role !== "student" && role !== "teacher" && role !== "administrator") {
    if (err) err.textContent = t().guestNeedRole;
    return;
  }
  if (role === "student" && !grade) {
    if (err) err.textContent = t().guestNeedInfo;
    return;
  }
  if (err) err.textContent = "";
  const finish = document.getElementById("guestFinish");
  if (staff) {
    window._pendingGuestStaff = { name, role };
    await showAppleStep();
    return;
  } else {
    if (finish) finish.disabled = true;
    const savedKey = await allocateGuestStudentKey({ displayName: name, firstName: name, grade });
    const key = savedKey || makeWebUnlockKey();
    if (finish) finish.disabled = false;
    profile = { displayName: name, firstName: name, role: "student", grade, key, guest: true, cloudSaved: !!savedKey, classes: [] };
  }
  localStorage.setItem("whsWebProfile", JSON.stringify(profile));
  applyAvatar("");
  showGate();
  show("home");
}
async function finishPendingGuestStaff() {
  const pending = window._pendingGuestStaff;
  const err = document.getElementById("appleError") || document.getElementById("setupError");
  if (!pending) return;
  if (!ckWebAuthToken()) {
    if (err) err.textContent = t().appleStepBody;
    return;
  }
  if (err) err.textContent = "";
  const looked = await fetchStaffRole();
  let appleUser = window._ckUserRecordName || "";
  if (!appleUser) {
    try { appleUser = await ckUserRecordName(); } catch (_) { appleUser = ""; }
  }
  if (looked.state === "error") {
    if (err) err.textContent = t().staffRoleRetry;
    return;
  }
  if (looked.state !== "staff") {
    window._verifiedStaffRole = "";
    if (err) err.textContent = t().staffNotListed + (appleUser ? " " + appleUser : "");
    return;
  }
  window._verifiedStaffRole = looked.role;
  window._pendingGuestStaff = null;
  document.body.classList.remove("whs-apple-gate");
  window._gateStep = "pair";
  parkCkAuth();
  profile = {
    displayName: pending.name,
    firstName: pending.name,
    role: looked.role,
    key: "",
    guest: true,
    appleUser
  };
  localStorage.setItem("whsWebProfile", JSON.stringify(profile));
  applyAvatar("");
  showGate();
  show("home");
}
window.show = show;
window.openAsk = openAsk;
window.openAide = openAide;
window.openPassesInfo = openPassesInfo;
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("./sw.js").catch(() => {});
}
showGate();
if (signedIn()) {
  show("home");
  if (currentRole() === "teacher" || currentRole() === "administrator") {
    restoreStaffCloudSession().then(() => {
      keepAppleSessionFresh();
      return syncStaffRoleFromCloud();
    }).catch(() => keepAppleSessionFresh());
  }
}
document.addEventListener("visibilitychange", () => {
  // Hide the web code again when the student switches away from this tab or app.
  if (document.visibilityState !== "visible") {
    if (window._webCodeShown) setWebCodeShown(false);
    return;
  }
  syncStaffRoleFromCloud().catch(() => {});
});
setInterval(() => {
  syncStaffRoleFromCloud().catch(() => {});
}, 30000);
