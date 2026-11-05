// WHS WebView: CloudKit requests, encryption, and the school key.
// Files load in order (see index.html) and share one global scope.
function restPublicUrl(path, schoolOnly) {
  const token = schoolToken();
  let url = `https://api.apple-cloudkit.com/database/1/${CONTAINER}/${schoolEnv()}/public/${path}?ckAPIToken=${encodeURIComponent(token)}`;
  const web = schoolOnly ? "" : ckWebAuthToken();
  if (web) url += `&ckWebAuthToken=${encodeURIComponent(web)}`;
  return url;
}

function lookupNames(value) {
  const raw = String(value || "").trim();
  return raw ? [raw] : [];
}
function usableRecord(record) {
  if (!record || record.deleted) return false;
  const err = String(record.serverErrorCode || record.reason || "").toUpperCase();
  if (/NOT_FOUND|UNKNOWN|AUTHENTICATION|ACCESS_DENIED|PERMISSION/.test(err)) return false;
  return !!(record.recordName || record.recordType || (record.fields && Object.keys(record.fields).length));
}
async function restQuery(recordType, limit) {
  const token = schoolToken();
  if (!token || !recordType) return [];
  const url = restUrl("query");
  const response = await cloudFetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query: { recordType }, resultsLimit: limit || 80 })
  });
  const payload = await response.json();
  return recordsFrom(payload).filter(usableRecord);
}
async function restLookupDetailed(names, exact) {
  const unique = exact
    ? [...new Set((names || []).map((name) => String(name || "").trim()).filter(Boolean))]
    : [...new Set((names || []).filter(Boolean).flatMap(lookupNames))];
  const token = schoolToken();
  if (!token || !unique.length) return { records: [], complete: false, failed: unique };
  const slices = [];
  for (let start = 0; start < unique.length; start += 150) slices.push(unique.slice(start, start + 150));
  const results = await Promise.all(slices.map(async (slice) => {
    const once = async () => {
      try {
        const response = await cloudFetch(restUrl("lookup"), {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ records: slice.map((recordName) => ({ recordName })) })
        });
        const payload = await response.json();
        const ok = response.ok || !!(payload && payload.records);
        const rows = recordsFrom(payload);
        const hidden = rows.filter((row) => !usableRecord(row)).map((row) => row.recordName).filter(Boolean);
        return { records: rows.filter(usableRecord), ok, failed: ok ? hidden : slice };
      } catch (_) {
        return { records: [], ok: false, failed: slice };
      }
    };
    const first = await once();
    if (first.ok) return first;
    return once();
  }));
  const records = [];
  const failed = [];
  results.forEach((item) => {
    item.records.forEach((record) => records.push(record));
    failed.push(...item.failed);
  });
  return { records, complete: results.every((item) => item.ok), failed };
}
async function restLookup(names) {
  return (await restLookupDetailed(names, false)).records;
}
async function restLookupExact(names) {
  const looked = await restLookupDetailed(names, true);
  const found = looked.records.slice();
  const db = cloudDb();
  const pending = looked.failed || [];
  if (!pending.length) return found;
  if (db && typeof db.fetchRecord === "function") {
    for (const name of pending) {
      try { recordsFrom(await db.fetchRecord(name)).forEach((record) => { if (usableRecord(record)) found.push(record); }); } catch (_) {}
    }
  }
  return found;
}
// A student's WHS Web Code is a password. The encryption key for their data and the tag used in their
// record names both come from the code through PBKDF2-SHA256 (150,000 rounds), so record names never
// contain the code, and checking a guessed code is slow. This must match WHSPrivateSeal.swift exactly.
const CODE_KDF_SALT = new TextEncoder().encode("whs-code-v2");
const CODE_KDF_ROUNDS = 150000;
const codeKeyCache = new Map();
function deriveCodeKeys(code) {
  if (isKeyHandle(code)) return deviceKeyFor(code);
  const compact = normalizeCode(code);
  if (compact.length !== 10) return Promise.resolve(null);
  if (!codeKeyCache.has(compact)) {
    const ticket = profileSession;
    // Keep only a handful of codes in memory; a full cache starts over.
    if (codeKeyCache.size >= 4) codeKeyCache.clear();
    const pending = (async () => {
      const base = await crypto.subtle.importKey("raw", new TextEncoder().encode(compact), "PBKDF2", false, ["deriveBits"]);
      const bits = new Uint8Array(await crypto.subtle.deriveBits(
        { name: "PBKDF2", hash: "SHA-256", salt: CODE_KDF_SALT, iterations: CODE_KDF_ROUNDS }, base, 384));
      const key = await crypto.subtle.importKey("raw", bits.slice(0, 32), "AES-GCM", false, ["encrypt", "decrypt"]);
      const tag = Array.from(bits.slice(32, 48)).map((b) => b.toString(16).padStart(2, "0")).join("");
      return { key, tag };
    })();
    pending.catch(() => codeKeyCache.delete(compact));
    // Finished after a sign-out: hand back the result but don't keep it cached.
    pending.then(() => { if (!sameSession(ticket) && codeKeyCache.get(compact) === pending) codeKeyCache.delete(compact); }, () => {});
    codeKeyCache.set(compact, pending);
  }
  return codeKeyCache.get(compact);
}
// Forgets one code's keys, e.g. a student's code a teacher typed, or an old code after a reset.
function forgetCodeKey(code) {
  codeKeyCache.delete(normalizeCode(code));
}
// Drops every cached code key, e.g. on sign-out.
function forgetCodeKeys() {
  codeKeyCache.clear();
  deviceKeys.clear();
}
async function sealKey(code) {
  const derived = await deriveCodeKeys(code);
  if (!derived) throw new Error("CODE");
  return derived.key;
}
async function privateCodeTag(code) {
  const derived = await deriveCodeKeys(code);
  return derived ? derived.tag : "";
}
// Record names that belong to a student, built from the derived tag, never from the code itself.
async function profileRecordName(code) {
  const tag = await privateCodeTag(code);
  return tag ? "profile.v2." + tag : "";
}
async function webPassLinkName(code) {
  const tag = await privateCodeTag(code);
  return tag ? "webpass.v2." + tag : "";
}
function bytesToBase64(bytes) {
  let bin = "";
  for (let i = 0; i < bytes.length; i += 0x8000) {
    bin += String.fromCharCode.apply(null, bytes.subarray(i, i + 0x8000));
  }
  return btoa(bin);
}
function base64ToBytes(text) {
  const bin = atob(String(text || ""));
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i += 1) bytes[i] = bin.charCodeAt(i);
  return bytes;
}
// Staff copies of passes are encrypted with the school key: a random key stored once in CloudKit
// in its own staff-only record type, WHSStaffKey. No key is in this code. "whs3." marks that format;
// older "whs2." copies used a key that was in the code and can't be opened.
const STAFF_KEY_TYPE = "WHSStaffKey";
const STAFF_KEY_NAME = "whs-staff-key";
const STAFF_BODY_PREFIX = "whs3.";
const STAFF_BODY_CONTEXT = new TextEncoder().encode("whs-staff-body-v3");
async function readStaffKeyRecord() {
  const response = await cloudFetch(restPublicUrl("records/lookup", false), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ records: [{ recordName: STAFF_KEY_NAME }] })
  });
  const payload = await response.json().catch(() => ({}));
  const row = ((payload && payload.records) || [])[0];
  if (!row) return { state: "error" };
  const code = String(row.serverErrorCode || "");
  if (/NOT_FOUND|UNKNOWN_ITEM/i.test(code)) return { state: "missing" };
  if (code || String(row.recordType || "") !== STAFF_KEY_TYPE) return { state: "error" };
  let bytes = null;
  try { bytes = base64ToBytes(String(fieldValue(row, "key") || "")); } catch (_) { bytes = null; }
  if (!bytes || bytes.length !== 32) return { state: "error" };
  const key = await crypto.subtle.importKey("raw", bytes, "AES-GCM", false, ["encrypt", "decrypt"]);
  return { state: "found", key };
}
async function loadOrCreateStaffKey() {
  if (!ckWebAuthToken()) return null;
  try {
    const first = await readStaffKeyRecord();
    if (first.state === "found") return first.key;
    if (first.state !== "missing") return null;
    // The first enrolled staff member to need the key creates it.
    try { await requireEnrolledStaff(); } catch (_) { return null; }
    const fresh = crypto.getRandomValues(new Uint8Array(32));
    try {
      await restModify({
        recordType: STAFF_KEY_TYPE,
        recordName: STAFF_KEY_NAME,
        fields: { key: { value: bytesToBase64(fresh) }, version: { value: 1 } }
      }, "create");
    } catch (_) {}
    // Read it back either way: if another staff device created it first, use theirs.
    const second = await readStaffKeyRecord();
    return second.state === "found" ? second.key : null;
  } catch (_) {
    return null;
  }
}
async function staffBodyKey() {
  if (!window._staffKeyPromise) window._staffKeyPromise = loadOrCreateStaffKey();
  const key = await window._staffKeyPromise;
  if (!key) window._staffKeyPromise = null;
  return key;
}
async function sealStaffBody(plain) {
  const text = String(plain || "");
  if (!text) return "";
  const key = await staffBodyKey();
  if (!key) return "";
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const cipher = new Uint8Array(await crypto.subtle.encrypt({ name: "AES-GCM", iv, additionalData: STAFF_BODY_CONTEXT }, key, new TextEncoder().encode(text)));
  const blob = new Uint8Array(iv.length + cipher.length);
  blob.set(iv, 0);
  blob.set(cipher, iv.length);
  return STAFF_BODY_PREFIX + bytesToBase64(blob);
}
async function openStaffBody(stored) {
  const raw = String(stored || "");
  if (raw.indexOf("whs2.") === 0) return "";
  if (raw.indexOf(STAFF_BODY_PREFIX) !== 0) return raw;
  const blob = (() => { try { return base64ToBytes(raw.slice(STAFF_BODY_PREFIX.length)); } catch (_) { return null; } })();
  if (!blob || blob.length <= 28) return "";
  const attempt = async () => {
    const key = await staffBodyKey();
    if (!key) return null;
    try {
      const clear = await crypto.subtle.decrypt({ name: "AES-GCM", iv: blob.slice(0, 12), additionalData: STAFF_BODY_CONTEXT }, key, blob.slice(12));
      return new TextDecoder().decode(clear);
    } catch (_) {
      return null;
    }
  };
  let text = await attempt();
  if (text === null) {
    // The key may have been replaced in CloudKit since this page loaded; reload it once.
    window._staffKeyPromise = null;
    text = await attempt();
  }
  return text || "";
}
// Locks text with the student's code. Returns "" when it can't be locked, so a bad code never
// stores the text in the clear.
async function sealText(code, plain) {
  const text = String(plain || "");
  if (!text || !isUsableCode(code)) return "";
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const cipher = new Uint8Array(await crypto.subtle.encrypt({ name: "AES-GCM", iv }, await sealKey(code), new TextEncoder().encode(text)));
  const blob = new Uint8Array(iv.length + cipher.length);
  blob.set(iv, 0);
  blob.set(cipher, iv.length);
  return "whs1." + bytesToBase64(blob);
}
async function openSeal(code, stored) {
  const raw = String(stored || "");
  if (raw.indexOf("whs1.") !== 0) return raw;
  try {
    const blob = base64ToBytes(raw.slice(5));
    if (blob.length <= 28) return "";
    const clear = await crypto.subtle.decrypt(
      { name: "AES-GCM", iv: blob.slice(0, 12) },
      await sealKey(code),
      blob.slice(12)
    );
    return new TextDecoder().decode(clear);
  } catch (_) {
    return "";
  }
}
async function sealedOrPlain(code, sealed, plain) {
  const opened = await openSeal(code, sealed);
  if (opened) return opened;
  const fallback = String(plain || "");
  return fallback.indexOf("whs1.") === 0 ? "" : fallback;
}
async function decryptSealedBytes(code, bytes) {
  if (!bytes || bytes.length < 29) return null;
  let head = "";
  try { head = new TextDecoder().decode(bytes.slice(0, 5)); } catch (_) { head = ""; }
  if (head === "whs1.") {
    const opened = await openSeal(code, new TextDecoder().decode(bytes));
    return opened ? new TextEncoder().encode(opened) : null;
  }
  try {
    const clear = await crypto.subtle.decrypt(
      { name: "AES-GCM", iv: bytes.slice(0, 12) },
      await sealKey(code),
      bytes.slice(12)
    );
    return new Uint8Array(clear);
  } catch (_) {
    return null;
  }
}
function imageValueFromBytes(bytes) {
  if (!bytes || !bytes.length) return "";
  let head = "";
  try { head = new TextDecoder().decode(bytes.slice(0, 5)); } catch (_) { head = ""; }
  if (head === "data:") return new TextDecoder().decode(bytes);
  return "data:image/jpeg;base64," + bytesToBase64(bytes);
}
async function openSealedFile(code, record, field) {
  const url = fieldValue(record, field);
  if (!url || !/^https?:/i.test(url)) return null;
  try {
    const response = await fetch(url, { credentials: "omit", cache: "no-store" });
    if (!response.ok) return null;
    return decryptSealedBytes(code, new Uint8Array(await response.arrayBuffer()));
  } catch (_) {
    return null;
  }
}
// The student's name is locked with their code too (nameSeal). Older records kept it in the clear.
async function profileNames(record, code) {
  let names = null;
  try { names = JSON.parse((await openSeal(code, fieldValue(record, "nameSeal"))) || "null"); } catch (_) {}
  const displayName = String((names && names.displayName) || fieldValue(record, "displayName") || "");
  const firstName = String((names && names.firstName) || fieldValue(record, "firstName") || "");
  return { displayName, firstName };
}
async function sealProfileNames(code, displayName, firstName) {
  return sealText(code, JSON.stringify({ displayName: String(displayName || ""), firstName: String(firstName || "") }));
}
async function profileSecrets(record, code) {
  const photoFile = await openSealedFile(code, record, "photoFile");
  const swipeFile = await openSealedFile(code, record, "swipeFile");
  const studyFile = await openSealedFile(code, record, "studyFile");
  return {
    grade: await sealedOrPlain(code, fieldValue(record, "gradeSeal"), fieldValue(record, "grade")),
    photo: photoFile ? imageValueFromBytes(photoFile) : await sealedOrPlain(code, fieldValue(record, "photoSeal"), fieldValue(record, "profilePhoto")),
    swipe: swipeFile ? imageValueFromBytes(swipeFile) : await sealedOrPlain(code, fieldValue(record, "swipeSeal"), fieldValue(record, "swipeCard")),
    study: studyFile ? new TextDecoder().decode(studyFile) : await sealedOrPlain(code, fieldValue(record, "studySeal"), fieldValue(record, "studyJSON"))
  };
}
function isGateRecordName(id) {
  const key = String(id || "").toLowerCase();
  return key.indexOf("whs-staff-gate.") === 0 || key.indexOf("whs-wipe-gate.") === 0 || key.indexOf("whs-staff-user.") === 0;
}
function requireCloudWrite() {
  if (ckWebAuthToken()) return true;
  throw Object.assign(new Error("APPLE"), { apple: true, serverErrorCode: "AUTHENTICATION_REQUIRED" });
}
async function restModifySchool() {
  throw Object.assign(new Error("APPLE"), { apple: true, serverErrorCode: "AUTHENTICATION_REQUIRED" });
}
async function restModify(record, operationType) {
  await refreshCloudAuth();
  requireCloudWrite();
  const token = schoolToken();
  if (!token || !record || !record.recordName) return null;
  const url = restPublicUrl("records/modify", false);
  const response = await cloudFetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      operations: [{
        operationType: operationType || "create",
        record
      }]
    })
  });
  const payload = await response.json();
  const records = recordsFrom(payload).filter(usableRecord);
  if (records.length) return records[0];
  throw cloudRecordError(payload, payload.records && payload.records[0]);
}
async function restModifyOps(operations) {
  await refreshCloudAuth();
  requireCloudWrite();
  const token = schoolToken();
  if (!token || !operations.length) return {};
  const url = restPublicUrl("records/modify", false);
  const response = await cloudFetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ operations })
  });
  return response.json();
}
function passRecordName(record) {
  return String((record && record.recordName) || fieldValue(record, "recordName") || "").trim();
}
function mountCkAuth() {}
async function waitForVisibleSlot(node) {
  for (let i = 0; i < 40; i += 1) {
    if (node && node.getBoundingClientRect().width > 40 && node.getBoundingClientRect().height > 20) return true;
    await new Promise((resolve) => window.setTimeout(resolve, 40));
  }
  return false;
}
async function showAppleStep() {
  window._gateStep = "apple";
  window._appleEpoch = (window._appleEpoch || 0) + 1;
  const epoch = window._appleEpoch;
  document.body.classList.add("whs-apple-gate");
  document.getElementById("gatePair").classList.add("hidden");
  document.getElementById("gateSetup").classList.add("hidden");
  const apple = document.getElementById("gateApple");
  if (apple) apple.classList.remove("hidden");
  applyChrome();
  const err = document.getElementById("appleError");
  if (!schoolToken()) {
    if (err) err.textContent = t().appleNoSchool;
    return;
  }
  const slot = document.getElementById("apple-sign-in-placeholder");
  await waitForVisibleSlot(slot);
  try { await setupCloudAuth(); } catch (_) {}
  let ready = false;
  for (let i = 0; i < 80; i += 1) {
    const node = document.querySelector("#ck-auth .apple-auth-button, #ck-auth iframe");
    const rect = node ? node.getBoundingClientRect() : null;
    if (rect && rect.width > 40 && rect.height > 20) {
      ready = true;
      break;
    }
    await new Promise((resolve) => setTimeout(resolve, 80));
  }
  if (ckWebAuthToken()) {
    if (err) err.textContent = t().appleSignOutFirst;
    watchAppleSignOut(epoch);
    return;
  }
  if (!ready && err) err.textContent = t().appleButtonMissing;
  else if (err) err.textContent = "";
  watchAppleSignIn(epoch);
}
function watchAppleSignOut(epoch) {
  try {
    const container = CloudKit.getDefaultContainer();
    if (container && typeof container.whenUserSignsOut === "function") {
      container.whenUserSignsOut().then(() => {
        if (epoch !== window._appleEpoch) return;
        window._ckUserRecordName = "";
        const err = document.getElementById("appleError");
        if (err) err.textContent = "";
        watchAppleSignIn(epoch);
      }).catch(() => {});
    }
  } catch (_) {}
  const wait = async () => {
    for (let i = 0; i < 400; i += 1) {
      if (epoch !== window._appleEpoch || window._gateStep !== "apple") return;
      if (!ckWebAuthToken()) {
        window._ckUserRecordName = "";
        const err = document.getElementById("appleError");
        if (err) err.textContent = "";
        watchAppleSignIn(epoch);
        return;
      }
      await new Promise((resolve) => setTimeout(resolve, 500));
    }
  };
  wait();
}
function showRevokePassError(kind) {
  const c = t();
  const needApple = kind === "APPLE";
  openSheet(`
    <div class="card-title"><b>${needApple ? c.revokePassNeedApple : c.revokePassFail}</b><button type="button" data-action="closeSheet">${c.close}</button></div>`);
}
// Administrators can permanently delete one pass, for example when a parent or the school asks to
// delete a student's records. CloudKit only lets the WHSAdmin role delete other staff's passes.
function confirmDeletePass(id) {
  if (!canClearPassLog()) return;
  const c = t();
  openSheet(`
    <div class="card-title"><b>${c.deletePassTitle}</b><button type="button" data-action="closeSheet">${c.close}</button></div>
    <p class="muted">${c.deletePassBody}</p>
    <p class="error" id="deletePassError"></p>
    <button class="primary" type="button" data-action="closeSheet">${c.deletePassCancel}</button>
    <button class="ghost" type="button" data-action="deletePass" data-pass-id="${escapeHtml(id || "")}" id="deletePassConfirm" style="width:100%;margin-top:8px;color:#B42318;">${c.deletePass}</button>`);
}
async function handleDeletePass(id) {
  const unique = String(id || "").trim();
  if (!canClearPassLog() || !unique || window._deletePassBusy) return;
  const c = t();
  const err = document.getElementById("deletePassError");
  const button = document.getElementById("deletePassConfirm");
  window._deletePassBusy = true;
  if (button) { button.disabled = true; button.textContent = c.deletePassWorking; }
  try {
    await ensureCloud();
    watchAppleSignIn();
    if (!(await ensureSavedStaffSession())) throw Object.assign(new Error("APPLE"), { apple: true });
    if ((await requireEnrolledStaff()) !== "administrator") throw new Error("STAFF");
    await auditLog("delete_pass", [unique]);
    // Revoked marker first, so students' phones and the website drop their copies.
    await markPassesRevoked([unique]);
    await saveClearedPassIDs([unique]);
    await deletePassData([unique], false);
    window._passLogList = (window._passLogList || []).filter((record) => passRecordName(record) !== unique);
    if (window._passRecords) delete window._passRecords[unique];
    closeSheet();
    if (view === "passes") paintPassLog();
  } catch (error) {
    const apple = (error && error.apple) || (error && error.message === "APPLE") || isAuthError(error);
    if (err) err.textContent = apple ? c.revokePassNeedApple : c.deletePassFail;
    if (button) { button.disabled = false; button.textContent = c.deletePass; }
  } finally {
    window._deletePassBusy = false;
  }
}
function confirmRevokePass(id) {
  if (!canRevokePass()) return;
  const c = t();
  openSheet(`
    <div class="card-title"><b>${c.revokePassTitle}</b><button type="button" data-action="closeSheet">${c.close}</button></div>
    <p class="muted">${c.revokePassBody}</p>
    <button class="primary" type="button" data-action="closeSheet">${c.close}</button>
    <button class="ghost" type="button" data-action="revokePass" data-pass-id="${escapeHtml(id || "")}" style="width:100%;margin-top:8px;color:#B42318;">${c.revokePass}</button>`);
}
function watchAppleSignIn(epoch) {
  if (window._ckWatch) return;
  window._ckWatch = true;
  const ticket = epoch == null ? window._appleEpoch : epoch;
  try {
    CloudKit.getDefaultContainer().whenUserSignsIn().then((userInfo) => {
      window._ckWatch = false;
      if (window._gateStep === "apple" && ticket != null && ticket !== window._appleEpoch) return;
      const signedName = userNameFromInfo(userInfo);
      if (signedName) window._ckUserRecordName = signedName;
      const fromForm = pendingStaffFromForm();
      if (fromForm) window._pendingGuestStaff = fromForm;
      if (window._pendingGuestStaff) {
        finishPendingGuestStaff();
        watchAppleSignIn();
        return;
      }
      const id = window._pendingRevokeId;
      window._pendingRevokeId = "";
      const newsId = window._pendingDeleteNewsId;
      if (id) handleRevokePass(id);
      else if (newsId) deleteNewsPost(newsId);
      else if (window._pendingNewsPost) publishNewsPost();
      else if (window._pendingIssuePass) {
        window._pendingIssuePass = false;
        issuePassFromWeb();
      }
      watchAppleSignIn();
    }).catch(() => { window._ckWatch = false; });
  } catch (_) { window._ckWatch = false; }
}
function isAuthError(error, payload) {
  const text = [
    error && error.ckErrorCode,
    error && error.serverErrorCode,
    error && error.message,
    error && error.reason,
    payload && payload.serverErrorCode,
    payload && payload.reason
  ].filter(Boolean).join(" ");
  if (/ACCESS_DENIED|PERMISSION_FAILURE/i.test(text)) return false;
  return /AUTH|421|authorization|sign in/i.test(text);
}
function cloudRecordError(payload, record) {
  const row = record || {};
  const code = String((payload && payload.serverErrorCode) || row.serverErrorCode || (payload && payload.reason) || row.reason || "FAIL");
  const reason = String((payload && payload.reason) || row.reason || "");
  return Object.assign(new Error(code), {
    apple: isAuthError({ message: code + " " + reason }, payload),
    code,
    reason
  });
}
function tombstoneName(id) {
  return "cleared." + String(id || "").trim();
}
function revokedName(id) {
  return "revoked." + String(id || "").trim();
}
function isPassMarker(record) {
  const id = String((record && record.recordName) || "");
  const key = id.toLowerCase();
  const kind = String(fieldValue(record, "kind") || "").toLowerCase();
  if (!id || key === MANIFEST.toLowerCase() || key === CLEARED.toLowerCase() || key === CAMPUS_LOG.toLowerCase() || key === CAMPUS_CLEARED.toLowerCase() || key === NEWS_MANIFEST.toLowerCase()) return true;
  if (key.indexOf("cleared.") === 0 || key.indexOf("revoked.") === 0 || key.indexOf("news.") === 0 || key.indexOf("newsimg.") === 0 || key.indexOf("webpass.") === 0 || key.indexOf("passimg.") === 0 || key.indexOf("inbox.") === 0 || key.indexOf("body.") === 0) return true;
  if (isGateRecordName(id)) return true;
  if (kind === "cleared" || kind === "revoked" || kind === "news" || kind === "newsimg" || kind === "webpass" || kind === "passimg" || kind === "inbox" || kind === "staffgate" || kind === "wipegate" || kind === "staffuser" || kind === "manifest" || kind === "body" || kind === "nfchomework" || kind === "nfccourse") return true;
  return false;
}
function isRevokedFlag(record) {
  const raw = String(fieldValue(record, "revoked") || "").trim().toLowerCase();
  return raw === "1" || raw === "true" || raw === "yes" || raw === "revoked";
}
function collectClearedIDs(records) {
  const out = new Set();
  (records || []).forEach((record) => {
    const id = String(record.recordName || "");
    const key = id.toLowerCase();
    const kind = String(fieldValue(record, "kind") || "").toLowerCase();
    if (key === CLEARED.toLowerCase() || kind === "cleared") {
      parsePassIDs(fieldValue(record, "passIDs")).forEach((item) => out.add(item.toLowerCase()));
    }
    if (key.indexOf("cleared.") === 0) out.add(key.slice("cleared.".length));
  });
  return out;
}
function collectRevokedIDs(records) {
  const out = new Set();
  (records || []).forEach((record) => {
    const id = String(record.recordName || "");
    const key = id.toLowerCase();
    const kind = String(fieldValue(record, "kind") || "").toLowerCase();
    if (key === CLEARED.toLowerCase() || kind === "cleared" || kind === "revoked") {
      parsePassIDs(fieldValue(record, "passIDs")).forEach((item) => out.add(item.toLowerCase()));
    }
    if (key.indexOf("cleared.") === 0) out.add(key.slice("cleared.".length));
    if (key.indexOf("revoked.") === 0) out.add(key.slice("revoked.".length));
    if (!isPassMarker(record) && isRevokedFlag(record)) out.add(key);
  });
  return out;
}
function passIsRevoked(record) {
  const id = passRecordName(record).toLowerCase();
  if (isRevokedFlag(record)) return true;
  return !!(window._revokedPassIDs && window._revokedPassIDs.has(id));
}
async function ckDeleteNames(names) {
  if (!ckWebAuthToken()) return false;
  const db = cloudDb();
  if (!(db && names.length && typeof db.deleteRecords === "function")) return false;
  const result = await db.deleteRecords(names);
  if (result && result.hasErrors) return false;
  return true;
}
async function ckCreateRecords(records) {
  if (!ckWebAuthToken()) return false;
  const db = cloudDb();
  if (!(db && records.length && typeof db.saveRecords === "function")) return false;
  const result = await db.saveRecords(records);
  if (result && result.hasErrors) return false;
  return true;
}
function parsePassIDs(raw) {
  return String(raw || "").split(",").map((part) => part.trim()).filter(Boolean);
}
function capNewestIDs(existing, id, limit) {
  const ids = (existing || []).slice();
  const token = String(id || "").trim();
  if (token && !ids.some((item) => item.toLowerCase() === token.toLowerCase())) ids.unshift(token);
  const cap = Math.max(1, limit || 400);
  return ids.slice(0, cap);
}
function isConflictError(error) {
  const text = [error && error.code, error && error.message, error && error.reason, error && error.serverErrorCode].filter(Boolean).join(" ");
  return /CONFLICT|serverRecordChanged|ATOMIC_ERROR/i.test(text);
}
async function restDeleteNames(names) {
  if (!names.length) return false;
  const payload = await restModifyOps(names.map((recordName) => ({
    operationType: "forceDelete",
    record: { recordName }
  })));
  if (isAuthError(null, payload)) throw Object.assign(new Error("APPLE"), { apple: true });
  return (payload.records || []).some((row) => row && (row.deleted || !row.serverErrorCode));
}
async function markPassesRevoked(ids) {
  const unique = [...new Set((ids || []).map((id) => String(id || "").trim()).filter((id) => id && id !== MANIFEST && id !== CLEARED))];
  if (!unique.length) return false;
  const records = unique.map((id) => ({
    recordType: PASS_TYPE,
    recordName: revokedName(id),
    fields: {
      kind: { value: "revoked" },
      passIDs: { value: id }
    }
  }));
  try {
    if (await ckCreateRecords(records)) return true;
  } catch (error) {
    if (isAuthError(error)) throw Object.assign(new Error("APPLE"), { apple: true });
  }
  // Next try 40 markers per request; only fall back to one request per pass if that fails.
  try {
    let batched = true;
    for (let start = 0; start < records.length && batched; start += 40) {
      const result = await restModifyOps(records.slice(start, start + 40).map((record) => ({ operationType: "forceReplace", record })));
      const rows = (result && result.records) || [];
      if (!result || result.serverErrorCode || rows.length === 0 || rows.some((row) => row && row.serverErrorCode)) batched = false;
    }
    if (batched) return true;
  } catch (error) {
    if (isAuthError(error)) throw Object.assign(new Error("APPLE"), { apple: true });
  }
  for (const record of records) {
    try {
      await restModify(record, "create");
    } catch (error) {
      if (isAuthError(error)) throw Object.assign(new Error("APPLE"), { apple: true });
      try {
        await restModify(record, "forceUpdate");
      } catch (retry) {
        if (isAuthError(retry)) throw Object.assign(new Error("APPLE"), { apple: true });
        return false;
      }
    }
  }
  return true;
}
