// WHS WebView: Profile, roles, and Apple sign-in.
// Files load in order (see index.html) and share one global scope.
let lang = localStorage.getItem("whsAdminLang") || "en";
let view = "home";
let configured = false;
let staff = [];
let profile = JSON.parse(localStorage.getItem("whsWebProfile") || "null");
if (profile && typeof profile === "object") {
  delete profile.staffProof;
  delete profile.staffEnrolled;
}
let lunchReady = false;
let deferredInstall = null;
function normalizeRole(value) {
  const raw = String(value || "").toLowerCase().trim();
  if (raw === "administrator" || raw === "admin") return "administrator";
  if (raw === "teacher") return "teacher";
  if (raw === "parent") return "parent";
  if (raw === "student") return "student";
  if (raw === "guest") return "guest";
  return "";
}
function currentRole() { return normalizeRole(profile && profile.role); }
function isGuest() {
  if (!profile) return false;
  if (profile.guest) return true;
  if (currentRole() === "guest") return true;
  return !String(profile.key || "").trim();
}
function hasWebKey() {
  return normalizeCode(profile && profile.key).length === 10;
}
function isPairedStudent() {
  return currentRole() === "student" && hasWebKey() && !isGuest();
}
function isGuestStudent() {
  if (!isGuest()) return false;
  const role = currentRole();
  return role === "student" || role === "guest" || role === "";
}
function canSeeOwnPasses() {
  return hasWebKey() && (isPairedStudent() || isGuestStudent());
}
function formatWebKey(value) {
  const compact = normalizeCode(value);
  if (compact.length === 10) return compact.slice(0, 5) + "-" + compact.slice(5);
  return compact;
}
function makeWebUnlockKey() {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const bytes = new Uint8Array(10);
  crypto.getRandomValues(bytes);
  let key = "";
  for (let i = 0; i < bytes.length; i += 1) key += alphabet[bytes[i] % alphabet.length];
  return key;
}
function isStandaloneApp() {
  return window.matchMedia("(display-mode: standalone)").matches
    || window.matchMedia("(display-mode: window-controls-overlay)").matches
    || window.navigator.standalone === true;
}
window.addEventListener("beforeinstallprompt", (event) => {
  event.preventDefault();
  deferredInstall = event;
});
window.addEventListener("appinstalled", () => {
  deferredInstall = null;
  closeSheet();
  if (view === "more") renderMore();
});
function guestHomeCard() {
  const c = t();
  if (isStandaloneApp()) {
    return `<div class="card wide"><div class="t">${c.addHomeOnDevice}</div><div class="s">${c.addHomeOnDeviceSub}</div></div>`;
  }
  return `<button class="card action" type="button" data-action="addHome"><div class="t">${c.addHome}</div><div class="s">${c.addHomeSub}</div></button>`;
}
function showAddHome() {
  const c = t();
  const install = deferredInstall
    ? `<button class="primary" type="button" data-action="installHome" style="width:100%;margin-top:12px;">${c.addHomeInstall}</button>`
    : "";
  openSheet(`
    <div class="card-title"><b>${c.addHomeTitle}</b><button type="button" data-action="closeSheet">${c.close}</button></div>
    <ul class="home-steps">
      <li>${c.addHomeIPhone}</li>
      <li>${c.addHomeAndroid}</li>
      <li>${c.addHomeChrome}</li>
    </ul>
    ${install}`);
}
async function promptInstallHome() {
  if (!deferredInstall) {
    showAddHome();
    return;
  }
  const prompt = deferredInstall;
  deferredInstall = null;
  try {
    await prompt.prompt();
  } catch (_) {}
  closeSheet();
  if (view === "more") renderMore();
}
function verifiedStaffRole() {
  return window._verifiedStaffRole === "teacher" || window._verifiedStaffRole === "administrator"
    ? window._verifiedStaffRole
    : "";
}
function canSeePassLog() {
  const role = verifiedStaffRole();
  return role === "teacher" || role === "administrator";
}
function showPassMenu() {
  const role = currentRole();
  return canSeePassLog() || role === "teacher" || role === "administrator";
}
function canClearPassLog() {
  return verifiedStaffRole() === "administrator";
}
// Only shows the button. CloudKit is the real lock: it returns audit entries only to Apple IDs
// with the WHSAdmin role, so changing this page can't reveal them to anyone else.
function canSeeAuditLog() {
  return verifiedStaffRole() === "administrator";
}
function canRevokePass() {
  return canSeePassLog();
}
function canIssuePass() {
  return canSeePassLog();
}
function canPostNews() {
  return verifiedStaffRole() === "administrator";
}
function signedIn() {
  if (isGuest()) return true;
  return !!(profile && profile.key && currentRole());
}
if (profile && !signedIn()) {
  localStorage.removeItem("whsWebProfile");
  profile = null;
}
function t() { return copy[lang] || copy.en; }
// The site's own token and environment always win. ck-public.js sets both when the site deploys.
function schoolToken() {
  return String(window.WHS_SCHOOL_TOKEN || "").trim();
}
function schoolEnv() {
  return window.WHS_CK_ENV === "production" ? "production" : "development";
}
// Older versions let staff save a token and environment in the browser; clear those once.
try {
  localStorage.removeItem("whsAdminToken");
  localStorage.removeItem("whsAdminEnv");
} catch (_) {}
function cloudDb() {
  try { return CloudKit.getDefaultContainer().publicCloudDatabase; } catch (_) { return null; }
}
function escapeHtml(value) {
  return String(value || "").replace(/[&<>"']/g, (ch) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  }[ch]));
}
function greeting(name) {
  const hour = new Date().getHours();
  const n = name || "Warrior";
  if (lang === "es") {
    if (hour >= 5 && hour < 12) return "Buenos días, " + n;
    if (hour >= 12 && hour < 21) return "Buenas tardes, " + n;
    return "Buenas noches, " + n;
  }
  if (hour >= 5 && hour < 12) return "Good morning, " + n;
  if (hour >= 12 && hour < 17) return "Good afternoon, " + n;
  if (hour >= 17 && hour < 21) return "Good evening, " + n;
  return "Good night, " + n;
}
const icons = {
  house: '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M12.4 3.15a.7.7 0 0 0-.8 0L2.7 9.7a.75.75 0 0 0 .45 1.33h1.4v8.22c0 .7.56 1.25 1.25 1.25h3.7v-5.6c0-.55.45-1 1-1h3c.55 0 1 .45 1 1v5.6h3.7c.7 0 1.25-.55 1.25-1.25V11h1.4a.75.75 0 0 0 .45-1.33z"/></svg>',
  books: '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M6.2 3.5h3.1c.7 0 1.2.55 1.2 1.2v14.6c0 .7-.55 1.2-1.2 1.2H6.2c-.7 0-1.2-.5-1.2-1.2V4.7c0-.65.5-1.2 1.2-1.2zm8.5 0h3.1c.7 0 1.2.55 1.2 1.2v12.3c.7.15 1.2.75 1.2 1.5 0 .85-.7 1.5-1.5 1.5h-4c-.8 0-1.5-.65-1.5-1.5 0-.75.5-1.35 1.2-1.5V4.7c0-.65.5-1.2 1.2-1.2z"/></svg>',
  person: '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 12.2a4.35 4.35 0 1 0 0-8.7 4.35 4.35 0 0 0 0 8.7zM4.4 20.4c.45-3.55 3.55-6 7.6-6s7.15 2.45 7.6 6c.08.6-.4 1.1-1 1.1H5.4c-.6 0-1.08-.5-1-1.1z"/></svg>',
  more: '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><circle cx="6.5" cy="12" r="1.9"/><circle cx="12" cy="12" r="1.9"/><circle cx="17.5" cy="12" r="1.9"/></svg>',
  bell: '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 22.2a2.35 2.35 0 0 0 2.3-2.2h-4.6A2.35 2.35 0 0 0 12 22.2zM19.2 16V11a7.2 7.2 0 0 0-5.1-6.85V3.7a2.1 2.1 0 1 0-4.2 0v.45A7.2 7.2 0 0 0 4.8 11v5L3.15 17.7c-.55.55-.16 1.5.62 1.5h16.46c.78 0 1.17-.95.62-1.5z"/></svg>',
  fork: '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M8.2 2.5c.45 0 .8.35.8.8v6.1c0 .9-.55 1.65-1.35 1.9V20.7c0 .45-.35.8-.8.8s-.8-.35-.8-.8v-9.4C5.25 10.85 4.7 10.1 4.7 9.2V3.3c0-.45.35-.8.8-.8s.8.35.8.8v5.3h.55V3.3c0-.45.35-.8.8-.8s.8.35.8.8v5.3h.55V3.3c0-.45.35-.8.8-.8zM16.6 2.5c.45 0 .8.35.8.8v7.2h.7c.9 0 1.65.75 1.65 1.65V20.7c0 .45-.35.8-.8.8s-.8-.35-.8-.8v-8h-.75c-.9 0-1.65-.75-1.65-1.65V3.3c0-.45.35-.8.85-.8z"/></svg>',
  mega: '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M21 6.2v11.6c0 .7-.8 1.1-1.4.7L14 15H8.5C5.5 15 3 12.5 3 9.5S5.5 4 8.5 4H14l5.6-3.5c.6-.4 1.4 0 1.4.7zM8.2 16.5 10 19.8c.3.5 0 1.2-.6 1.2H7.3c-.4 0-.7-.2-.9-.6L4.8 16.5z"/></svg>'
};
function initials(name) {
  const parts = String(name || "W").trim().split(/\s+/);
  return ((parts[0] || "W")[0] + (parts[1] ? parts[1][0] : "")).toUpperCase();
}
function roleLabel() {
  const role = currentRole();
  if (role === "administrator") return t().admin;
  if (role === "teacher") return t().roleTeacher;
  if (role === "parent") return lang === "es" ? "Padre" : "Parent";
  if (role === "student") return t().roleStudent;
  if (role === "guest") return t().guest;
  return "";
}
function withApiToken(url) {
  const token = schoolToken();
  if (!url) return "";
  if (!token) return url;
  return String(url)
    .replace(/\$\{apiToken\}/g, encodeURIComponent(token))
    .replace(/%24%7BapiToken%7D/gi, encodeURIComponent(token));
}
function findDownloadURL(node) {
  if (!node || typeof node !== "object") return "";
  if (typeof node.downloadURL === "string" && node.downloadURL) return node.downloadURL;
  if (typeof node.downloadURL === "function") {
    try {
      const got = node.downloadURL();
      if (got) return String(got);
    } catch (_) {}
  }
  if (typeof node.getDownloadURL === "function") {
    try {
      const got = node.getDownloadURL();
      if (got) return String(got);
    } catch (_) {}
  }
  if (node.value && node.value !== node) return findDownloadURL(node.value);
  return "";
}
function unwrapField(field) {
  if (field == null) return "";
  if (typeof field !== "object") return String(field);
  const asset = findDownloadURL(field);
  if (asset) return withApiToken(asset);
  const value = Object.prototype.hasOwnProperty.call(field, "value") ? field.value : field;
  if (value == null) return "";
  if (typeof value === "number" && value > 1000000000000) return new Date(value).toLocaleString();
  return typeof value === "object" ? "" : String(value);
}
function fieldValue(record, key) {
  if (!record) return "";
  if (typeof record.get === "function") {
    try {
      const got = record.get(key);
      if (got != null && got !== "") return unwrapField(got);
    } catch (_) {}
  }
  if (record[key] != null && record[key] !== "") return unwrapField(record[key]);
  return unwrapField(record.fields && record.fields[key]);
}
function recordsFrom(response) {
  if (!response) return [];
  if (Array.isArray(response)) return response;
  if (Array.isArray(response.records)) return response.records;
  if (response.recordName) return [response];
  return [];
}
function normalizeCode(value) {
  return String(value || "").toUpperCase().replace(/[^A-Z0-9]/g, "");
}
function gateIsOpen() {
  return gate && !gate.classList.contains("hidden");
}
function gateWantsAppleAuth() {
  return window._gateStep === "apple" && !!window._pendingGuestStaff;
}
function parkCkAuth() {
  if (gateWantsAppleAuth()) return;
  document.body.classList.remove("whs-apple-gate");
}
function closeSheet() {
  if (window._passWipeBusy || window._issuePassBusy) return;
  if (!gateWantsAppleAuth()) parkCkAuth();
  sheet.classList.add("hidden");
  sheetCard.innerHTML = "";
}
function openSheet(html) {
  sheetCard.innerHTML = html;
  sheet.classList.remove("hidden");
}
function confirmRemoveProfile() {
  const c = t();
  openSheet(`
    <div class="card-title"><b>${c.signOutTitle}</b><button type="button" data-action="closeSheet">${c.close}</button></div>
    <p class="muted">${c.signOutBody}</p>
    <button class="primary" type="button" data-action="closeSheet">${c.signOutCancel}</button>
    <button class="ghost" type="button" data-action="removeProfile" style="width:100%;margin-top:8px;color:#B42318;">${c.signOutConfirm}</button>`);
}
function removeChromebookProfile() {
  const person = profile;
  closeSheet();
  eraseOwnedProfileRecords(person).then((removed) => {
    forgetLocalProfile();
    showGate();
    if (removed === false && gateError) gateError.textContent = t().signOutCloudSkipped;
  }).catch(() => {
    forgetLocalProfile();
    showGate();
  });
}
async function eraseOwnedProfileRecords(person) {
  const key = normalizeCode(person && person.key);
  const names = [];
  if (key.length === 10) {
    const tag = await privateCodeTag(key);
    names.push(key, "webpass." + key, "webpass." + key.slice(0, 5) + "-" + key.slice(5));
    if (tag) names.push("webpass.p." + tag);
    inboxNames(key).forEach((name) => names.push(name));
    privateInboxNames(tag).forEach((name) => names.push(name));
  }
  const unique = [...new Set(names.filter(Boolean))];
  if (!unique.length) return;
  let foundRecords = [];
  try { foundRecords = await restLookupExact(unique); } catch (_) {}
  foundRecords.forEach((record) => {
    if (normalizeCode(record.recordName) !== key) return;
    parsePassIDs(fieldValue(record, "passIDs")).forEach((id) => names.push("seal." + id));
  });
  const found = foundRecords.map((record) => String(record.recordName || "")).filter(Boolean);
  const seals = names.filter((name) => name.indexOf("seal.") === 0);
  const targets = [...new Set(found.concat(seals).concat(key.length === 10 ? [key, "webpass." + key] : []))];
  if (!targets.length) return true;
  if (!ckWebAuthToken()) return false;
  for (let start = 0; start < targets.length; start += 40) {
    const ops = targets.slice(start, start + 40).map((recordName) => ({
      operationType: "forceDelete",
      record: { recordName }
    }));
    try { await restModifyOps(ops); } catch (_) {}
  }
  return true;
}
function forgetLocalProfile() {
  try {
    const container = CloudKit.getDefaultContainer();
    if (container && typeof container.signOut === "function") container.signOut();
  } catch (_) {}
  dropStaleCloudSession();
  try {
    const auth = CloudKit.getDefaultContainer()._auth;
    if (auth && typeof auth._setSession === "function") auth._setSession(null);
    if (auth) auth._ckSession = "";
  } catch (_) {}
  const expires = "expires=Thu, 01 Jan 1970 00:00:00 GMT";
  document.cookie = CONTAINER + "=; " + expires + "; path=/";
  document.cookie = CONTAINER + "=; " + expires + "; path=";
  try {
    const drop = [];
    for (let i = 0; i < localStorage.length; i += 1) {
      const name = localStorage.key(i);
      if (name === "whsPassWebKeys" || (name && name.indexOf("whsPassCache:") === 0)) drop.push(name);
    }
    drop.forEach((name) => localStorage.removeItem(name));
    localStorage.removeItem("whsWebProfile");
  } catch (_) {}
  try { localStorage.removeItem("whsNewsIds"); } catch (_) {}
  try {
    Object.keys(sessionStorage).forEach((key) => {
      if (/^whs/i.test(key)) sessionStorage.removeItem(key);
    });
  } catch (_) {}
  profile = null;
  window._ckUserRecordName = "";
  window._appleReady = false;
  window._appleNeedsRenew = true;
  window._pendingGuestStaff = null;
  window._verifiedStaffRole = "";
  window._pendingNewsPost = false;
  window._pendingIssuePass = false;
  window._newsDraftFile = null;
  window._passWipeProof = "";
  window._passRecords = {};
  window._staffKeyPromise = null;
  window._passLogList = [];
  window._revokedPassIDs = new Set();
  window._clearedPassIDs = new Set();
  window._profilePhoto = "";
  applyAvatar("");
  if (window.caches && caches.keys) {
    caches.keys().then((keys) => keys.forEach((key) => caches.delete(key))).catch(() => {});
  }
}

async function ensureCloud() {
  return !!schoolToken();
}
async function refreshCloudAuth() {
  if (!configured) return;
  try { await CloudKit.getDefaultContainer().setUpAuth(); } catch (_) {}
}
async function setupCloudAuth() {
  const token = schoolToken();
  if (!token) return false;
  const node = document.getElementById("apple-sign-in-placeholder");
  if (node) node.getBoundingClientRect();
  if (!configured) {
    CloudKit.configure({
      containers: [{
        containerIdentifier: CONTAINER,
        apiTokenAuth: {
          apiToken: token,
          persist: true,
          signInButton: { id: "apple-sign-in-placeholder", theme: "black" },
          signOutButton: { id: "apple-sign-out-placeholder", theme: "black" }
        },
        environment: schoolEnv()
      }]
    });
    configured = true;
  }
  try { await CloudKit.getDefaultContainer().setUpAuth(); } catch (_) {}
  return true;
}
function parkAuthForRestore() {
  const parked = [];
  ["gate", "gateApple"].forEach((id) => {
    const node = document.getElementById(id);
    if (!node) return;
    parked.push({ node, wasHidden: node.classList.contains("hidden") });
    node.classList.add("whs-auth-park");
    node.classList.remove("hidden");
  });
  return parked;
}
function unparkAuth(parked) {
  (parked || []).forEach(({ node, wasHidden }) => {
    node.classList.remove("whs-auth-park");
    if (window._gateStep === "apple") return;
    node.classList.toggle("hidden", !!wasHidden);
  });
}
function rememberAppleUser(name) {
  const id = String(name || "").trim();
  if (!id) return;
  window._ckUserRecordName = id;
  if (!profile || profile.appleUser === id) return;
  profile.appleUser = id;
  try { localStorage.setItem("whsWebProfile", JSON.stringify(profile)); } catch (_) {}
}
function dropStaleCloudSession() {
  window._ckUserRecordName = "";
  window._appleReady = false;
  window._appleNeedsRenew = true;
  try {
    const auth = CloudKit.getDefaultContainer()._auth;
    if (auth && auth._signInURL) window._appleSignInURL = auth._signInURL;
    if (auth) auth._ckSession = "";
  } catch (_) {}
}
function appleSignInURL() {
  try {
    const auth = CloudKit.getDefaultContainer()._auth;
    const url = String((auth && auth._signInURL) || window._appleSignInURL || "");
    if (url) window._appleSignInURL = url;
    return url;
  } catch (_) {
    return String(window._appleSignInURL || "");
  }
}
function storeAppleSession(session) {
  const value = String(session || "").trim();
  if (!value) return false;
  try {
    const auth = CloudKit.getDefaultContainer()._auth;
    if (auth && typeof auth._setSession === "function") auth._setSession(value);
    else if (auth) auth._ckSession = value;
  } catch (_) {
    return false;
  }
  window._appleNeedsRenew = false;
  window._appleReady = !!ckWebAuthToken();
  return window._appleReady;
}
function appleMessageOrigin(origin) {
  try {
    const host = new URL(origin).hostname;
    return host === "apple.com" || host.endsWith(".apple.com") || host === "icloud.com" || host.endsWith(".icloud.com") || host === "apple-cloudkit.com" || host.endsWith(".apple-cloudkit.com");
  } catch (_) {
    return false;
  }
}
function waitForCkSession(popup) {
  return new Promise((resolve) => {
    let done = false;
    const finish = (value) => {
      if (done) return;
      done = true;
      window.removeEventListener("message", onMessage);
      clearInterval(watch);
      clearTimeout(timer);
      resolve(value || "");
    };
    const onMessage = (event) => {
      const fromPopup = popup && event.source === popup;
      if (!fromPopup && !appleMessageOrigin(event.origin)) return;
      const data = event.data;
      if (!data || typeof data !== "object" || !data.ckSession) return;
      finish(String(data.ckSession));
    };
    window.addEventListener("message", onMessage);
    const watch = setInterval(() => {
      if (popup && popup.closed) finish("");
    }, 400);
    const timer = setTimeout(() => finish(""), 120000);
  });
}
async function fetchAppleSignInURL() {
  const existing = appleSignInURL();
  if (existing) return existing;
  if (!schoolToken()) return "";
  try {
    const response = await fetch(restPublicUrl("users/caller", true), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: "{}"
    });
    const payload = await response.json();
    const url = String((payload && payload.redirectURL) || "");
    if (url) window._appleSignInURL = url;
    return url;
  } catch (_) {
    return "";
  }
}
async function renewAppleForSend(popup) {
  if (window._appleReady && ckWebAuthToken() && !window._appleNeedsRenew) {
    try { if (popup && !popup.closed) popup.close(); } catch (_) {}
    return true;
  }
  const url = await fetchAppleSignInURL();
  let win = popup && !popup.closed ? popup : null;
  if (win && url) {
    try { win.location.href = url; } catch (_) { win = null; }
  }
  if ((!win || win.closed) && url) win = window.open(url, "whsAppleRenew", "width=640,height=720");
  if (!win || win.closed || !url) {
    window._applePopupBlocked = !win;
    try { if (win && !win.closed) win.close(); } catch (_) {}
    return false;
  }
  window._applePopupBlocked = false;
  const session = await waitForCkSession(win);
  try { if (win && !win.closed) win.close(); } catch (_) {}
  if (!session || !storeAppleSession(session)) return false;
  try {
    const identity = await CloudKit.getDefaultContainer().fetchCurrentUserIdentity();
    const name = userNameFromInfo(identity) || userNameFromInfo(identity && identity.userInfo);
    if (name) rememberAppleUser(name);
  } catch (_) {}
  window._appleReady = !!ckWebAuthToken();
  window._appleNeedsRenew = !window._appleReady;
  return window._appleReady;
}
async function appleSessionAlive() {
  try {
    const container = CloudKit.getDefaultContainer();
    if (!container) return false;
    const info = await container.setUpAuth();
    const fromAuth = userNameFromInfo(info);
    if (fromAuth && ckWebAuthToken()) {
      rememberAppleUser(fromAuth);
      window._appleReady = true;
      window._appleNeedsRenew = false;
      return true;
    }
    if (typeof container.fetchCurrentUserIdentity === "function") {
      const identity = await container.fetchCurrentUserIdentity();
      const fromId = userNameFromInfo(identity) || userNameFromInfo(identity && identity.userInfo);
      if (fromId && ckWebAuthToken()) {
        rememberAppleUser(fromId);
        window._appleReady = true;
        window._appleNeedsRenew = false;
        return true;
      }
    }
    if (typeof container.fetchUserRecordName === "function") {
      const fromFetch = await new Promise((resolve) => {
        let settled = false;
        const done = (value) => { if (!settled) { settled = true; resolve(value); } };
        try {
          const pending = container.fetchUserRecordName({
            success: (name) => done(name),
            failure: () => done("")
          });
          if (pending && typeof pending.then === "function") {
            pending.then((name) => done(name)).catch(() => done(""));
          }
        } catch (_) {
          done("");
        }
        setTimeout(() => done(""), 4000);
      });
      const fetched = userNameFromInfo(fromFetch);
      if (fetched && ckWebAuthToken()) {
        rememberAppleUser(fetched);
        window._appleReady = true;
        window._appleNeedsRenew = false;
        return true;
      }
    }
  } catch (error) {
    if (isAuthError(error)) {
      dropStaleCloudSession();
      return false;
    }
  }
  if (appleSignInURL() || !ckWebAuthToken()) dropStaleCloudSession();
  return false;
}
async function restoreStaffCloudSession() {
  if (window._staffAuthRestore) return window._staffAuthRestore;
  window._staffAuthRestore = (async () => {
    const needsSetup = !configured;
    const parked = needsSetup ? parkAuthForRestore() : [];
    let alive = false;
    try {
      if (needsSetup) {
        const slot = document.getElementById("apple-sign-in-placeholder");
        if (slot) await waitForVisibleSlot(slot);
      }
      try { await setupCloudAuth(); } catch (_) {}
      alive = await appleSessionAlive();
    } finally {
      unparkAuth(parked);
      window._staffAuthRestore = null;
    }
    return alive;
  })();
  return window._staffAuthRestore;
}
function ckWebAuthToken() {
  try {
    const auth = CloudKit.getDefaultContainer()._auth;
    if (auth && auth._ckSession) return String(auth._ckSession);
    if (auth && typeof auth.getConfig === "function") {
      const token = (auth.getConfig() || {}).ckWebAuthToken;
      if (!token) return "";
      try { return decodeURIComponent(token); } catch (_) { return String(token); }
    }
  } catch (_) {}
  return "";
}
function userNameFromInfo(info) {
  if (!info) return "";
  if (typeof info === "string") return info.trim();
  const name = info.userRecordName
    || (info.userInfo && info.userInfo.userRecordName)
    || (info.userIdentity && info.userIdentity.userRecordName);
  return String(name || "").trim();
}
async function ckUserRecordName() {
  if (window._ckUserRecordName) return String(window._ckUserRecordName);
  try {
    const container = CloudKit.getDefaultContainer();
    if (!container) return "";
    try {
      const info = await container.setUpAuth();
      const fromAuth = userNameFromInfo(info);
      if (fromAuth) {
        window._ckUserRecordName = fromAuth;
        return fromAuth;
      }
    } catch (_) {}
    if (typeof container.fetchCurrentUserIdentity === "function") {
      try {
        const identity = await container.fetchCurrentUserIdentity();
        const fromId = userNameFromInfo(identity) || userNameFromInfo(identity && identity.userInfo);
        if (fromId) {
          window._ckUserRecordName = fromId;
          return fromId;
        }
      } catch (_) {}
    }
    if (typeof container.fetchUserRecordName === "function") {
      const result = await new Promise((resolve) => {
        let settled = false;
        const done = (value) => { if (!settled) { settled = true; resolve(value); } };
        try {
          const pending = container.fetchUserRecordName({
            success: (name) => done(name),
            failure: () => done("")
          });
          if (pending && typeof pending.then === "function") {
            pending.then((name) => done(name)).catch(() => done(""));
          }
        } catch (_) {
          done("");
        }
        setTimeout(() => done(""), 4000);
      });
      const fromFetch = userNameFromInfo(result);
      if (fromFetch) {
        window._ckUserRecordName = fromFetch;
        return fromFetch;
      }
    }
  } catch (_) {}
  return "";
}
const STAFF_ROLE_TYPE = "WHSStaffRole";
function staffRoleRecordName(user) {
  const id = String(user || "").trim();
  return id ? "staff." + id : "";
}
async function fetchStaffRole() {
  if (!ckWebAuthToken()) return { state: "error" };
  let user = "";
  try { user = await ckUserRecordName(); } catch (_) { return { state: "error" }; }
  const name = staffRoleRecordName(user);
  if (!name) return { state: "error" };
  try { await ensureCloud(); } catch (_) {}
  let response;
  let payload = {};
  try {
    response = await fetch(restPublicUrl("records/lookup", false), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ records: [{ recordName: name }] })
    });
    payload = await response.json().catch(() => ({}));
  } catch (_) {
    return { state: "error" };
  }
  if (isAuthError(null, payload) || response.status === 421) return { state: "error" };
  const record = recordsFrom(payload).filter(usableRecord).find((item) => String(item.recordName || "") === name);
  if (record) {
    if (String(record.recordType || "") !== STAFF_ROLE_TYPE) return { state: "none" };
    const role = normalizeRole(fieldValue(record, "role"));
    if (role === "teacher" || role === "administrator") return { state: "staff", role };
    return { state: "none" };
  }
  const rows = (payload && payload.records) || [];
  const missing = rows.some((row) => /NOT_FOUND|UNKNOWN_ITEM|RESOURCE_NOT_FOUND/i.test(String((row && row.serverErrorCode) || "")));
  if (missing) return { state: "none" };
  if (!response.ok) return { state: "error" };
  return { state: "none" };
}
function dropRemovedStaff() {
  window._verifiedStaffRole = "";
  if (!profile) return;
  const staff = profile.role === "teacher" || profile.role === "administrator";
  if (!staff) return;
  if (hasWebKey() && !profile.guest) {
    profile.role = "student";
    try { localStorage.setItem("whsWebProfile", JSON.stringify(profile)); } catch (_) {}
    showGate();
    show(view || "home");
    return;
  }
  forgetLocalProfile();
  showGate();
  show("home");
}
let staffSyncing = false;
async function syncStaffRoleFromCloud() {
  if (staffSyncing) return;
  if (!profile || (currentRole() !== "teacher" && currentRole() !== "administrator")) return;
  if (!ckWebAuthToken()) return;
  staffSyncing = true;
  try {
    const looked = await fetchStaffRole();
    if (looked.state === "staff") {
      const changed = window._verifiedStaffRole !== looked.role || profile.role !== looked.role;
      window._verifiedStaffRole = looked.role;
      if (profile.role !== looked.role) {
        profile.role = looked.role;
        try { localStorage.setItem("whsWebProfile", JSON.stringify(profile)); } catch (_) {}
      }
      if (changed && view) show(view);
      return;
    }
    const hadStaff = verifiedStaffRole();
    window._verifiedStaffRole = "";
    if (looked.state === "none") dropRemovedStaff();
    else if (hadStaff && view) show(view);
  } finally {
    staffSyncing = false;
  }
}
async function requireEnrolledStaff() {
  if (!ckWebAuthToken()) throw Object.assign(new Error("APPLE"), { apple: true });
  const looked = await fetchStaffRole();
  if (looked.state === "staff") {
    window._verifiedStaffRole = looked.role;
    return looked.role;
  }
  window._verifiedStaffRole = "";
  if (looked.state === "error") throw Object.assign(new Error("FAIL"), { reason: "staff-unknown" });
  throw Object.assign(new Error("STAFF"), { staff: true });
}
async function createPassRecord(record, operation) {
  const op = operation || "create";
  requireCloudWrite();
  try {
    if (op === "create") {
      const saved = await ckCreateNews(record);
      if (saved) return saved;
    }
  } catch (error) {
    if (!(error && (error.apple || isAuthError(error)))) throw error;
  }
  const saved = await restModify(record, op);
  if (saved) return saved;
  throw Object.assign(new Error("FAIL"), { reason: "create" });
}
function keepAppleSessionFresh() {
  if (window._appleKeepalive) return;
  const renew = () => {
    if (!verifiedStaffRole() || !configured || !ckWebAuthToken()) return;
    try {
      const container = CloudKit.getDefaultContainer();
      if (container && typeof container.fetchCurrentUserIdentity === "function") {
        container.fetchCurrentUserIdentity().then((identity) => {
          const name = userNameFromInfo(identity) || userNameFromInfo(identity && identity.userInfo);
          if (name) rememberAppleUser(name);
          if (name && ckWebAuthToken()) {
            window._appleReady = true;
            window._appleNeedsRenew = false;
          }
        }).catch((error) => {
          if (isAuthError(error)) dropStaleCloudSession();
        });
      }
    } catch (_) {}
  };
  renew();
  window._appleKeepalive = setInterval(renew, 4 * 60 * 1000);
}
async function ensureSavedStaffSession(renewWindow) {
  try { await restoreStaffCloudSession(); } catch (_) {}
  if (!ckWebAuthToken()) {
    const renewed = await renewAppleForSend(renewWindow);
    if (!renewed && !ckWebAuthToken()) return false;
  } else if (renewWindow && !renewWindow.closed) {
    try { renewWindow.close(); } catch (_) {}
  }
  window._appleReady = true;
  window._appleNeedsRenew = false;
  keepAppleSessionFresh();
  return !!ckWebAuthToken();
}
function restUrl(action) {
  return restPublicUrl("records/" + action, true);
}
