// WHS WebView: Audit log, clearing the pass log, and the web code.
// Files load in order (see index.html) and share one global scope.
// Staff activity log for school audits. Each entry is a WHSAuditLog record: what was done, which pass
// IDs, and from where. CloudKit stamps who created it and when. Entries hold no student names, and
// staff can't change or delete them (Create-only in CloudKit Dashboard).
const AUDIT_TYPE = "WHSAuditLog";
let lastAuditLogView = 0;
async function auditLog(action, passIDs, count) {
  try {
    if (!verifiedStaffRole() || !ckWebAuthToken()) return;
    if (action === "view_log") {
      if (Date.now() - lastAuditLogView < 10 * 60 * 1000) return;
      lastAuditLogView = Date.now();
    }
    const ids = (passIDs || []).map((id) => String(id || "").trim()).filter(Boolean);
    const actor = String((profile && (profile.displayName || profile.firstName)) || "").slice(0, 80);
    await restModify({
      recordType: AUDIT_TYPE,
      recordName: "audit." + crypto.randomUUID(),
      fields: {
        action: { value: action },
        passIDs: { value: ids.slice(0, 60).join(",") },
        count: { value: Number.isFinite(count) ? count : ids.length },
        actor: { value: actor },
        platform: { value: "web" }
      }
    }, "create");
  } catch (_) {}
}
// Audit log viewer (administrators only). Entries come straight from CloudKit with the admin's own
// Apple sign-in; anyone without the WHSAdmin role gets ACCESS_DENIED from CloudKit.
// Every value is escaped before display. The "who" line shows the Apple ID CloudKit recorded,
// because the typed staff name in an entry could be anything.
function renderAuditLog() {
  const c = t();
  const node = document.getElementById("view-audit");
  if (!node) return;
  node.innerHTML = `${backBar()}
    <div class="card wide">
      <div class="t">${escapeHtml(c.auditTitle)}</div>
      <p class="muted" style="margin:6px 0 10px;">${escapeHtml(c.auditIntro)}</p>
      <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:8px;">
        <button class="ghost" type="button" data-action="auditRefresh">${escapeHtml(c.refresh)}</button>
      </div>
      <input class="search" id="auditQuery" aria-label="${escapeHtml(c.auditSearch)}" placeholder="${escapeHtml(c.auditSearch)}" autocomplete="off" spellcheck="false">
    </div>
    <div id="auditList"><p class="muted">${escapeHtml(c.auditLoading)}</p></div>`;
  auditLog("view_audit");
  loadAuditLog(true);
}
async function loadAuditLog(reset) {
  if (!canSeeAuditLog() || window._auditBusy) return;
  const c = t();
  if (reset) { window._auditEntries = []; window._auditMarker = null; }
  if (!reset && !window._auditMarker) return;
  window._auditBusy = true;
  let message = "";
  try {
    if (!ckWebAuthToken()) throw Object.assign(new Error("APPLE"), { code: "APPLE" });
    const body = {
      query: { recordType: AUDIT_TYPE, sortBy: [{ systemFieldName: "createdTimestamp", ascending: false }] },
      resultsLimit: 100,
      desiredKeys: ["action", "passIDs", "count", "actor", "platform"]
    };
    if (window._auditMarker) body.continuationMarker = window._auditMarker;
    const response = await fetch(restPublicUrl("records/query", false), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });
    const payload = await response.json().catch(() => ({}));
    const code = String(payload.serverErrorCode || "");
    if (code) throw Object.assign(new Error(code), { code });
    (payload.records || []).forEach((record) => {
      if (!record || record.recordType !== AUDIT_TYPE) return;
      window._auditEntries.push({
        when: Number((record.created && record.created.timestamp) || 0),
        who: String((record.created && record.created.userRecordName) || ""),
        action: String(fieldValue(record, "action") || ""),
        passIDs: String(fieldValue(record, "passIDs") || ""),
        count: Number(fieldValue(record, "count") || 0),
        actor: String(fieldValue(record, "actor") || ""),
        platform: String(fieldValue(record, "platform") || "")
      });
    });
    window._auditMarker = payload.continuationMarker || null;
  } catch (error) {
    const code = String((error && error.code) || "");
    if (code === "APPLE" || /AUTHENTICATION/.test(code)) message = c.auditNeedApple;
    else if (/ACCESS_DENIED|PERMISSION/.test(code)) message = c.auditDenied;
    else if (/BAD_REQUEST/.test(code)) message = c.auditNeedIndex;
    else message = c.auditFail;
  } finally {
    window._auditBusy = false;
  }
  paintAuditLog(message);
}
function auditActionLabel(action) {
  const c = t();
  return ({
    view_log: c.auditViewLog,
    issue_pass: c.auditIssue,
    revoke_pass: c.auditRevoke,
    clear_log: c.auditClear,
    view_audit: c.auditViewAudit,
    delete_pass: c.auditDelete
  })[action] || action;
}
function paintAuditLog(message) {
  const c = t();
  const list = document.getElementById("auditList");
  if (!list || view !== "audit") return;
  if (message) {
    list.innerHTML = `<div class="card wide"><p class="error" style="margin:0;">${escapeHtml(message)}</p></div>`;
    return;
  }
  const q = String((document.getElementById("auditQuery") || {}).value || "").trim().toLowerCase();
  const entries = (window._auditEntries || []).filter((entry) => {
    if (!q) return true;
    return [auditActionLabel(entry.action), entry.actor, entry.who, entry.platform, entry.passIDs].join(" ").toLowerCase().includes(q);
  });
  if (!entries.length) {
    list.innerHTML = `<div class="card wide"><p class="muted" style="margin:0;">${escapeHtml(c.auditEmpty)}</p></div>`;
    return;
  }
  const rows = entries.map((entry) => {
    const when = entry.when ? new Date(entry.when).toLocaleString(lang === "es" ? "es-US" : "en-US") : "";
    const ids = entry.passIDs.split(",").map((id) => id.trim()).filter(Boolean);
    const shownIDs = ids.slice(0, 3).map((id) => id.slice(0, 8)).join(", ") + (ids.length > 3 ? ` +${ids.length - 3}` : "");
    const appleID = entry.who ? `${c.auditAppleID} …${entry.who.slice(-8)}` : "";
    return `<div class="card wide" style="padding:12px 16px;">
        <div style="display:flex;justify-content:space-between;gap:12px;flex-wrap:wrap;">
          <b>${escapeHtml(auditActionLabel(entry.action))}</b>
          <span class="muted">${escapeHtml(when)}</span>
        </div>
        <div class="s">${escapeHtml(entry.actor || c.auditUnknown)}${appleID ? " · " + escapeHtml(appleID) : ""}${entry.platform ? " · " + escapeHtml(entry.platform) : ""}</div>
        ${entry.count ? `<div class="s">${escapeHtml(c.auditPasses)}: ${escapeHtml(String(entry.count))}${shownIDs ? " · " + escapeHtml(shownIDs) : ""}</div>` : ""}
      </div>`;
  }).join("");
  const more = window._auditMarker ? `<button class="ghost" type="button" data-action="auditMore" style="width:100%;margin-top:8px;">${escapeHtml(c.auditMore)}</button>` : "";
  list.innerHTML = rows + more;
}
async function revokePassRecord(id) {
  const unique = String(id || "").trim();
  if (!unique || unique === MANIFEST || unique === CLEARED) return;
  watchAppleSignIn();
  auditLog("revoke_pass", [unique]);
  const existing = (window._passRecords || {})[unique];
  const patch = {
    recordType: PASS_TYPE,
    recordName: unique,
    fields: { revoked: { value: 1 } }
  };
  if (existing && existing.recordChangeTag) patch.recordChangeTag = existing.recordChangeTag;
  try {
    await ckCreateRecords([patch]);
  } catch (error) {
    if (isAuthError(error) && !ckWebAuthToken()) throw Object.assign(new Error("APPLE"), { apple: true });
  }
  try {
    await restModify(patch, "forceUpdate");
  } catch (error) {
    if (isAuthError(error) && !ckWebAuthToken()) throw Object.assign(new Error("APPLE"), { apple: true });
  }
  if (!(await markPassesRevoked([unique]))) {
    throw Object.assign(new Error(ckWebAuthToken() ? "FAIL" : "APPLE"), { apple: !ckWebAuthToken() });
  }
}
async function handleRevokePass(id) {
  if (!canRevokePass()) return;
  try {
    await ensureCloud();
    watchAppleSignIn();
    if (!(await ensureSavedStaffSession())) throw Object.assign(new Error("APPLE"), { apple: true });
    await requireEnrolledStaff();
    await revokePassRecord(id);
    closeSheet();
    if (view === "passes") await loadPasses();
  } catch (error) {
    window._pendingRevokeId = id;
    const apple = (error && error.apple) || error.message === "APPLE" || isAuthError(error);
    showRevokePassError(apple ? "APPLE" : "FAIL");
  }
}
function setPassWipeError(message) {
  const err = document.getElementById("passWipeError");
  const ok = document.getElementById("passWipeOk");
  if (err) err.textContent = message || "";
  if (ok) ok.classList.toggle("hidden", !!message);
}
async function confirmClearPassLog() {
  if (!canClearPassLog()) return;
  const c = t();
  const typed = String((document.getElementById("passWipeCode") || {}).value || "").trim().toUpperCase();
  if (typed !== "CLEAR") {
    setPassWipeError(c.adminPassWipeBadCode);
    return;
  }
  setPassWipeError("");
  openSheet(`
    <div class="card-title"><b>${c.adminPassWipeConfirmTitle}</b><button type="button" data-action="closeSheet">${c.close}</button></div>
    <p>${c.adminPassWipeConfirmBody}</p>
    <p class="muted">${c.adminPassWipeBody}</p>
    <button class="ghost" type="button" data-action="closeSheet" style="width:100%;">${c.adminPassWipeCancel}</button>
    <button class="primary" type="button" data-action="clearPassLog" style="width:100%;margin-top:8px;background:#B42318;">${c.adminPassWipeConfirm}</button>`);
}
function showWorkProgress(percent, title, step, detail, finished, closeAction) {
  const c = t();
  const pct = Math.max(0, Math.min(100, Math.round(percent || 0)));
  const action = closeAction || "closeSheet";
  const close = finished
    ? `<button type="button" data-action="${action}">${c.close}</button>`
    : `<span class="wipe-pct">${pct}%</span>`;
  openSheet(`
    <div class="card-title"><b>${title}</b>${close}</div>
    <p class="muted">${step || ""}</p>
    <div class="wipe-track" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${pct}"><div class="wipe-fill" style="width:${pct}%"></div></div>
    <p class="wipe-pct">${pct}%</p>
    ${detail ? `<p class="muted">${escapeHtml(detail)}</p>` : ""}
    ${finished ? `<button class="primary" type="button" data-action="${action}" style="width:100%;margin-top:8px;">${c.close}</button>` : ""}`);
}
function showPassWipeProgress(percent, step, detail, finished, failed) {
  const c = t();
  showWorkProgress(percent, finished ? (failed ? c.adminPassWipeFail : c.adminPassWipeDone) : c.adminPassWipeWorking, step, detail, finished, "finishPassWipe");
}
async function emptyPassManifest() {
  await storePassIndex(CAMPUS_LOG, MANIFEST, "manifest", [], false);
}
async function saveClearedPassIDs(ids) {
  const unique = [...new Set((ids || []).map((id) => String(id || "").trim()).filter(Boolean))];
  const existing = await readExact(CAMPUS_CLEARED) || await readExact(CLEARED);
  const merged = [...new Set(indexIDs(existing).concat(unique))];
  await storePassIndex(CAMPUS_CLEARED, CLEARED, "cleared", merged, true);
}
// Pass IDs from the staff copies of passes, newest first. This replaces the shared list every
// teacher used to edit, so teachers only create records and only admins change other people's.
// Needs Queryable "kind" and Sortable "createdTimestamp" indexes on WHSCampusLog. Only staff can
// read those records. Returns null when CloudKit can't run the query.
async function queryStaffPassIDs(maxCount) {
  if (!ckWebAuthToken()) return null;
  for (const sorted of [true, false]) {
    const ids = [];
    let marker = null;
    let ok = true;
    for (let page = 0; page < 200 && ids.length < maxCount; page += 1) {
      const query = {
        recordType: CAMPUS_TYPE,
        filterBy: [{ fieldName: "kind", comparator: "EQUALS", fieldValue: { value: "body" } }]
      };
      if (sorted) query.sortBy = [{ systemFieldName: "createdTimestamp", ascending: false }];
      const body = { query, resultsLimit: Math.min(200, maxCount - ids.length), desiredKeys: ["kind"] };
      if (marker) body.continuationMarker = marker;
      let payload = {};
      try {
        const response = await fetch(restPublicUrl("records/query", false), {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body)
        });
        payload = await response.json().catch(() => ({}));
        if (!response.ok || payload.serverErrorCode) { ok = page > 0; break; }
      } catch (_) { ok = page > 0; break; }
      (payload.records || []).forEach((record) => {
        const name = String(record.recordName || "");
        if (name.indexOf("body.") === 0) ids.push(name.slice(5));
      });
      marker = payload.continuationMarker;
      if (!marker) break;
    }
    if (ok) return ids.slice(0, maxCount);
  }
  return null;
}
async function collectCampusPassIDs() {
  const names = new Set();
  ((await queryStaffPassIDs(20000)) || []).forEach((id) => names.add(id));
  try { indexIDs(await readExact(CAMPUS_ARCHIVE)).forEach((id) => names.add(id)); } catch (_) {}
  (window._passLogList || []).forEach((record) => {
    const id = passRecordName(record);
    if (id) names.add(id);
  });
  return [...names].filter((id) => {
    if (!id || id === MANIFEST || id === CLEARED || isGateRecordName(id)) return false;
    return true;
  });
}
// Clearing means deleting: remove each pass, its staff copy, and its images.
// Only the empty "revoked." markers stay, so student devices drop their copies.
async function deletePassData(ids, clearArchive) {
  const names = [];
  ids.forEach((id) => names.push(id, "body." + id, "seal." + id));
  for (let start = 0; start < ids.length; start += 180) {
    let heads = [];
    try { heads = await restLookupExact(ids.slice(start, start + 180).map((id) => "passimg." + id + ".0")); } catch (_) {}
    heads.forEach((record) => {
      const base = passRecordName(record).replace(/\.0$/, "");
      if (!base) return;
      const count = Math.min(Math.max(parseInt(fieldValue(record, "dates"), 10) || 1, 1), 200);
      for (let i = 0; i < count; i += 1) names.push(base + "." + i);
    });
  }
  if (clearArchive) names.push(CAMPUS_ARCHIVE);
  for (let start = 0; start < names.length; start += 40) {
    const ops = names.slice(start, start + 40).map((recordName) => ({ operationType: "forceDelete", record: { recordName } }));
    try { await restModifyOps(ops); } catch (_) {}
  }
}
async function handleClearPassLog() {
  if (!canClearPassLog() || window._passWipeBusy) return;
  const c = t();
  const typed = String((document.getElementById("passWipeCode") || {}).value || "").trim().toUpperCase();
  if (typed !== "CLEAR") {
    window._passWipeBusy = false;
    setPassWipeError(c.adminPassWipeBadCode);
    closeSheet();
    return;
  }
  window._passWipeBusy = true;
  let ids = [];
  try {
    showPassWipeProgress(4, c.adminPassWipeStepCollect, "", false, false);
    await ensureCloud();
    watchAppleSignIn();
    if (!(await ensureSavedStaffSession())) throw Object.assign(new Error("APPLE"), { apple: true });
    const role = await requireEnrolledStaff();
    if (role !== "administrator") throw Object.assign(new Error("FAIL"), { reason: "staff" });
    showPassWipeProgress(10, c.adminPassWipeStepCollect, "", false, false);
    ids = await collectCampusPassIDs();
    await auditLog("clear_log", ids, ids.length);
    if (ids.length) {
      showPassWipeProgress(18, c.adminPassWipeStepRevoke, `${c.adminPassWipeCount} 0 / ${ids.length}`, false, false);
      await markPassesRevoked(ids);
      const patches = ids.map((id) => ({
        recordType: PASS_TYPE,
        recordName: id,
        fields: { revoked: { value: 1 } }
      }));
      for (let i = 0; i < patches.length; i += 40) {
        const slice = patches.slice(i, i + 40);
        try {
          await restModifyOps(slice.map((record) => ({ operationType: "forceUpdate", record })));
        } catch (_) {
          for (const record of slice) {
            try { await revokePassRecord(record.recordName); } catch (_) {}
          }
        }
        const done = Math.min(ids.length, i + slice.length);
        const pct = 18 + Math.round((done / ids.length) * 62);
        showPassWipeProgress(pct, c.adminPassWipeStepRevoke, `${c.adminPassWipeCount} ${done} / ${ids.length}`, false, false);
      }
      showPassWipeProgress(84, c.adminPassWipeStepClear, `${c.adminPassWipeCount} ${ids.length} / ${ids.length}`, false, false);
      await saveClearedPassIDs(ids);
    }
    showPassWipeProgress(92, c.adminPassWipeStepEmpty, "", false, false);
    await emptyPassManifest();
    if (ids.length) await deletePassData(ids, true);
    window._passLogList = [];
    window._revokedPassIDs = new Set(ids.map((id) => id.toLowerCase()));
    window._clearedPassIDs = new Set(ids.map((id) => id.toLowerCase()));
    const ok = document.getElementById("passWipeOk");
    if (ok) {
      ok.textContent = c.adminPassWipeDone;
      ok.classList.remove("hidden");
    }
    setPassWipeError("");
    const code = document.getElementById("passWipeCode");
    if (code) code.value = "";
    window._passWipeProof = "";
    if (view === "passes") await loadPasses();
    window._passWipeBusy = false;
    showPassWipeProgress(100, c.adminPassWipeDone, "", true, false);
  } catch (error) {
    window._passWipeBusy = false;
    const apple = (error && error.apple) || error.message === "APPLE" || isAuthError(error);
    const message = apple ? c.adminPassWipeNeedApple : c.adminPassWipeFail;
    showPassWipeProgress(100, message, "", true, true);
    setPassWipeError(message);
  }
}
function finishPassWipe() {
  window._passWipeBusy = false;
  window._passWipeProof = "";
  closeSheet();
  if (view === "more") renderMore();
}
function finishIssuePass() {
  window._issuePassBusy = false;
  closeSheet();
}
async function allocateGuestStudentKey(person) {
  if (!schoolToken() || !ckWebAuthToken()) return "";
  try { await ensureCloud(); } catch (_) {}
  for (let i = 0; i < 8; i += 1) {
    const key = makeWebUnlockKey();
    let existing = [];
    try { existing = await restLookup([key]); } catch (_) { existing = []; }
    if (existing.length) continue;
    const sealedGrade = await sealText(key, String(person.grade || ""));
    const fields = {
      displayName: { value: person.displayName || person.firstName || "Warrior" },
      firstName: { value: person.firstName || person.displayName || "" },
      role: { value: "student" }
    };
    if (String(sealedGrade).indexOf("whs1.") === 0) fields.gradeSeal = { value: sealedGrade };
    try {
      await restModify({
        recordType: "WHSWebProfile",
        recordName: key,
        fields
      }, "create");
      return key;
    } catch (_) {}
  }
  return "";
}
async function ensureGuestStudentProfile() {
  if (!isGuestStudent() || hasWebKey()) return;
  const key = await allocateGuestStudentKey(profile || {});
  if (!key || !profile) return;
  profile.key = key;
  profile.guest = true;
  if (!profile.role || profile.role === "guest") profile.role = "student";
  localStorage.setItem("whsWebProfile", JSON.stringify(profile));
}
function askResetWebCode() {
  const c = t();
  openSheet(`
    <div class="card-title"><b>${c.webCodeResetTitle}</b><button type="button" data-action="closeSheet">${c.close}</button></div>
    <p class="muted">${c.webCodeResetBody}</p>
    <p class="error" id="webCodeResetError"></p>
    <button class="primary" type="button" data-action="closeSheet">${c.webCodeResetCancel}</button>
    <button class="ghost" type="button" data-action="confirmResetWebCode" id="confirmResetWebCode" style="width:100%;margin-top:8px;color:#B42318;">${c.webCodeResetConfirm}</button>`);
}
// Gives a web-only student a new code: saves the profile under the new code, then deletes
// everything stored under the old one. (Students with the iPhone app reset it in the app.)
async function resetWebCode() {
  if (!isGuestStudent() || !hasWebKey() || window._webCodeResetBusy) return;
  const c = t();
  const err = document.getElementById("webCodeResetError");
  const button = document.getElementById("confirmResetWebCode");
  const old = { ...profile };
  if (old.cloudSaved && !ckWebAuthToken()) {
    if (err) err.textContent = c.webCodeResetNeedApple;
    return;
  }
  window._webCodeResetBusy = true;
  if (button) { button.disabled = true; button.textContent = c.webCodeResetWorking; }
  try {
    let next = "";
    if (ckWebAuthToken()) {
      next = await allocateGuestStudentKey({ displayName: old.displayName, firstName: old.firstName, grade: old.grade });
      if (!next) throw new Error("FAIL");
    } else {
      // Never saved to the school site, so the code only lives in this browser.
      do { next = makeWebUnlockKey(); } while (next === normalizeCode(old.key));
    }
    // Sign-in was checked above, so this removes the old profile, passes, and seals.
    if (old.cloudSaved) await eraseOwnedProfileRecords(old);
    profile.key = next;
    profile.cloudSaved = !!ckWebAuthToken();
    localStorage.setItem("whsWebProfile", JSON.stringify(profile));
    dropPassFieldCache();
    window._studentPassUsable = [];
    closeSheet();
    renderMore();
  } catch (_) {
    if (err) err.textContent = c.webCodeResetFail;
    if (button) { button.disabled = false; button.textContent = c.webCodeResetConfirm; }
  } finally {
    window._webCodeResetBusy = false;
  }
}
// The code is a password, so it starts hidden each time the More tab opens. While hidden, the page
// holds only a blurred placeholder, never the real code.
const WEB_CODE_MASK = "XXXXX-XXXXX";
function webCodeValueHTML() {
  const shown = !!window._webCodeShown;
  const label = shown ? "" : ` aria-label="${escapeHtml(t().webCodeHiddenLabel)}"`;
  return `<div class="s web-code${shown ? "" : " is-hidden"}" id="webCodeValue"${label}>${shown ? escapeHtml(formatWebKey(profile.key)) : WEB_CODE_MASK}</div>`;
}
function setWebCodeShown(shown) {
  window._webCodeShown = !!shown;
  const value = document.getElementById("webCodeValue");
  if (value) value.outerHTML = webCodeValueHTML();
  const button = document.getElementById("toggleWebCode");
  if (button) button.textContent = shown ? t().webCodeHide : t().webCodeShow;
}
function guestWebCodeCard() {
  const c = t();
  if (!isGuestStudent() || !hasWebKey()) return "";
  return `<div class="card wide">
      <div class="t">${c.webCodeTitle}</div>
      ${webCodeValueHTML()}
      <div style="display:flex;gap:8px;flex-wrap:wrap;">
        <button class="ghost" type="button" data-action="toggleWebCode" id="toggleWebCode" aria-controls="webCodeValue">${window._webCodeShown ? c.webCodeHide : c.webCodeShow}</button>
        <button class="ghost" type="button" data-action="copyWebCode" id="copyWebCode">${c.webCodeCopy}</button>
        <button class="ghost" type="button" data-action="askResetWebCode" style="color:#B42318;">${c.webCodeReset}</button>
      </div>
    </div>`;
}
async function fetchByNames(db, names) {
  try {
    const looked = await restLookupDetailed(names, false);
    if (looked.complete || looked.records.length) return looked.records;
  } catch (_) {}
  const unique = [...new Set(names.filter(Boolean).flatMap(lookupNames))];
  if (!unique.length) return [];
  const found = [];
  const remember = (record) => {
    if (!usableRecord(record)) return;
    const id = record.recordName || "";
    if (id && found.some((item) => item.recordName === id)) return;
    found.push(record);
  };
  if (db && typeof db.fetchRecord === "function") {
    for (const name of unique) {
      try { recordsFrom(await db.fetchRecord(name)).forEach(remember); } catch (_) {}
    }
    if (found.length) return found;
  }
  if (db && typeof db.fetchRecords === "function") {
    const attempts = [unique, unique.map((recordName) => ({ recordName })), { records: unique.map((recordName) => ({ recordName })) }];
    for (const argument of attempts) {
      try { recordsFrom(await db.fetchRecords(argument)).forEach(remember); } catch (_) {}
      if (found.length) return found;
    }
  }
  return found;
}

function showGate() {
  const inProfile = signedIn();
  gate.classList.toggle("hidden", inProfile);
  gate.toggleAttribute("hidden", inProfile);
  if (!inProfile) showPairStep();
  applyChrome();
}

function applyChrome() {
  const c = t();
  const name = profile ? profile.displayName : "";
  hello.textContent = greeting(name);
  dateLine.textContent = new Date().toLocaleDateString(lang === "es" ? "es" : "en", {
    weekday: "long", month: "long", day: "numeric"
  });
  applyAvatar(window._profilePhoto || "");
  const roleText = roleLabel();
  const gradeText = profile && profile.grade ? `${c.grade} ${profile.grade}` : "";
  roleLine.textContent = [roleText, gradeText].filter(Boolean).join(" · ");
  roleLine.classList.toggle("hidden", !roleText);
  if (window._gateStep === "guest") {
    gateTitle.textContent = c.guestTitle;
    gateBody.textContent = c.guestBody;
  } else if (window._gateStep === "apple") {
    gateTitle.textContent = c.appleStepTitle;
    gateBody.textContent = c.appleStepBody;
  } else {
    gateTitle.textContent = c.welcome;
    gateBody.textContent = c.gateBody;
  }
  codeLabel.textContent = c.codeLabel;
  const nameLabel = document.getElementById("nameLabel");
  const gradeLabel = document.getElementById("gradeLabel");
  const rolePickLabel = document.getElementById("rolePickLabel");
  const staffCodeLabel = document.getElementById("staffCodeLabel");
  const roleOptStudent = document.getElementById("roleOptStudent");
  const roleOptTeacher = document.getElementById("roleOptTeacher");
  const roleOptAdmin = document.getElementById("roleOptAdmin");
  if (nameLabel) nameLabel.textContent = c.nameLabel;
  if (gradeLabel) gradeLabel.textContent = c.gradeLabel;
  if (rolePickLabel) rolePickLabel.textContent = c.role;
  if (staffCodeLabel) staffCodeLabel.textContent = c.staffCodeLabel;
  if (roleOptStudent) roleOptStudent.textContent = c.roleStudent;
  if (roleOptTeacher) roleOptTeacher.textContent = c.roleTeacher;
  if (roleOptAdmin) roleOptAdmin.textContent = c.admin;
  syncGuestRoleFields();
  const guestFinish = document.getElementById("guestFinish");
  if (guestFinish) guestFinish.textContent = c.enter;
  enterSite.textContent = c.enter;
  const skip = document.getElementById("skipSite");
  if (skip) skip.textContent = c.skip;
  const guestTitle = document.getElementById("guestTitle");
  const guestBody = document.getElementById("guestBody");
  if (guestTitle) guestTitle.textContent = c.guestTitle;
  if (guestBody) guestBody.textContent = c.guestBody;
  document.getElementById("bell").innerHTML = icons.bell;
  const booksIco = '<img class="tab-glyph" src="./books-vertical.png" alt="">';
  const contactsIco = '<span class="tab-glyph tone" style="--glyph:url(./person-crop-rectangle-stack.png)"></span>';
  const tabItems = [["home", icons.house, c.home]];
  if (isPairedStudent() || isGuestStudent()) tabItems.push(["classes", booksIco, c.classes]);
  if (canPostNews()) tabItems.push(["posts", icons.mega, c.postsNav]);
  tabItems.push(["contacts", contactsIco, c.contacts], ["more", icons.more, c.more]);
  tabs.classList.toggle("with-classes", tabItems.length > 3);
  const tabOn = (id) => {
    if (id === "classes") return view === "classes" || view === "class" || view === "study";
    return view === id;
  };
  tabs.innerHTML = `<button type="button" class="web-mark" data-go="home"><img src="./app-icon-192.png" alt=""><span>WebView</span></button>` + tabItems.map(([id, ico, label]) => `<button type="button" data-view="${id}" class="${tabOn(id) ? "on" : ""}"><span class="ico">${ico}</span>${label}</button>`).join("");
}

function show(id) {
  view = id;
  if (id !== "study") document.body.classList.remove("ql-open");
  closeSheet();
  ["home", "news", "lunch", "contacts", "more", "posts", "passes", "audit", "issuepass", "mypasses", "swipe", "classes", "class", "study"].forEach((name) => {
    const node = document.getElementById("view-" + name);
    if (node) node.classList.toggle("hidden", name !== id);
  });
  applyChrome();
  if (profile && profile.key) loadProfilePhoto();
  if (id === "home") {
    renderHome();
    loadNewsFeed();
    if (isPairedStudent()) {
      loadSwipeCard();
      loadStudentPasses();
      loadStudy();
    } else if (isGuestStudent()) {
      loadSwipeCard();
      loadStudy();
      if (!hasWebKey()) {
        ensureGuestStudentProfile().then(() => {
          if (view === "home") {
            renderHome();
            loadSwipeCard();
            loadStudentPasses();
            loadStudy();
          }
          if (view === "more") renderMore();
        });
      } else if (canSeeOwnPasses()) {
        loadStudentPasses();
      }
    } else if (canSeeOwnPasses()) {
      loadStudentPasses();
    }
  }
  if (id === "swipe") loadSwipeCard();
  if (id === "mypasses") loadStudentPasses();
  if (id === "classes" || id === "class") loadStudy();
  if (id === "study") renderStudy();
  if (id === "news") loadNews();
  if (id === "lunch") renderLunch();
  if (id === "contacts") renderStaff(document.getElementById("staffQuery") ? document.getElementById("staffQuery").value : "");
  if (id === "more") {
    window._webCodeShown = false;
    renderMore();
  }
  if (id === "posts") {
    if (!canPostNews()) {
      show("home");
      return;
    }
    renderPosts();
    loadNewsFeed();
  }
  if (id === "audit") {
    if (!canSeeAuditLog()) {
      show("more");
      return;
    }
    renderAuditLog();
  }
  if (id === "passes") {
    if (!showPassMenu()) {
      show("home");
      return;
    }
    if (!canSeePassLog()) {
      const node = document.getElementById("view-passes");
      node.innerHTML = `${backBar()}<div class="card wide"><p class="muted">${t().appleStepBody}</p></div>`;
      syncStaffRoleFromCloud().then(() => {
        if (view !== "passes") return;
        if (canSeePassLog()) loadPasses();
        else showAppleStep();
      }).catch(() => { if (view === "passes") showAppleStep(); });
      return;
    }
    loadPasses();
  }
  if (id === "issuepass") {
    if (!canIssuePass()) {
      show("home");
      return;
    }
    renderIssuePass();
  }
}
