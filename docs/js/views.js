// WHS WebView: Home, More, contacts, swipe card, classes, and study screens.
// Files load in order (see index.html) and share one global scope.
function backBar() {
  return `<div class="toolbar"><button class="ghost" type="button" data-view="home">${t().back}</button></div>`;
}

function dashCard(go, title, subtitle) {
  return `<button class="card action" type="button" data-go="${go}"><div class="t">${title}</div>${subtitle ? `<div class="s">${subtitle}</div>` : ""}</button>`;
}
function homeLunchWireNews() {
  const c = t();
  return `<div class="shortcuts wide">
        <button class="shortcut" type="button" data-go="lunch">
          <span class="plate"><img class="sf-glyph" src="./fork-knife.png" alt=""></span>
          <div class="t">${c.lunchMenu}</div>
          <div class="s">${c.lunchSub}</div>
        </button>
        <a class="shortcut" href="https://whswarriorswire.com" target="_blank" rel="noopener">
          <img class="tile-wire" src="./WarriorsWire.png" alt="">
          <div class="t">${c.wire}</div>
          <div class="s">${c.wireSub}</div>
        </a>
      </div>
      <div class="card wide" id="homeNews"><div class="t">${c.newsFeed}</div></div>`;
}
function renderHome() {
  const c = t();
  const role = currentRole();
  let cards = "";
  if (role === "parent") {
    cards = `
      <div class="card wide"><p class="muted" style="margin:0;">${c.dashParent}</p></div>
      ${dashCard("news", c.openNews, "")}
      ${dashCard("lunch", c.openLunch, "")}
      ${dashCard("contacts", c.openContacts, "")}`;
  } else if (showPassMenu()) {
    cards = `
      <button class="card action hero-pass wide" type="button" data-go="passes">
        <div class="row-item">
          <img class="tile-mark" src="./FlexHallwayMark.png" alt="">
          <div><div class="t">${c.passesTile}</div></div>
          <span class="chev">›</span>
        </div>
      </button>
      ${homeLunchWireNews()}`;
  } else {
    const passTile = `<button class="card action hero-pass wide" type="button" data-go="mypasses">
        <div class="row-item">
          <img class="tile-mark" src="./FlexHallwayMark.png" alt="">
          <div><div class="t">${c.passesTile}</div><div class="s" id="passTileSub">${c.noneYet}</div></div>
          <span class="chev">›</span>
        </div>
      </button>`;
    const swipeTile = `<button class="card action hero-pass wide" type="button" data-go="swipe">
        <div class="row-item">
          <img class="tile-swipe" id="swipeTileMark" src="./SwipeCard.png" alt="">
          <div><div class="t">${c.swipe}</div><div class="s" id="swipeTileSub">${c.swipeSub}</div></div>
          <span class="chev">›</span>
        </div>
      </button>`;
    cards = `
      ${isPairedStudent() ? `${swipeTile}
      ${passTile}` : (isGuestStudent() ? `${swipeTile}${canSeeOwnPasses() ? passTile : ""}` : "")}
      ${homeLunchWireNews()}`;
  }
  document.getElementById("view-home").innerHTML = `<div class="dash">${cards}</div>`;
}

function renderLunch() {
  const node = document.getElementById("view-lunch");
  const c = t();
  node.innerHTML = `${backBar()}
    <div class="card wide" style="max-width:920px;">
      <div class="t">${c.lunchMenu}</div>
      <p class="muted">${c.lunchSub}</p>
      <iframe class="lunch" title="${c.lunchMenu}" src="./WHSLunchMenu.pdf?v=2026-11"></iframe>
      <p class="muted"><a href="${LUNCH}" target="_blank" rel="noopener">${c.lunchMenu}</a></p>
    </div>`;
  lunchReady = true;
}

function renderMore() {
  parkCkAuth();
  const c = t();
  const adminTools = canSeePassLog() ? `
      <div class="card wide">
        <b>${c.openPasses}</b>
        <p class="muted">${canSeePassLog() && currentRole() === "teacher" ? c.dashTeacher : c.dashAdmin}</p>
        ${canIssuePass() ? `<button class="ghost" type="button" data-go="issuepass" style="width:100%;margin-top:8px;">${c.issuePass}</button>` : ""}
        <button class="ghost" type="button" id="openPasses" style="width:100%;margin-top:8px;">${c.openPasses}</button>
        ${canSeeAuditLog() ? `<button class="ghost" type="button" data-go="audit" style="width:100%;margin-top:8px;">${c.auditOpen}</button>` : ""}
        ${canClearPassLog() ? `<div style="margin-top:16px;padding-top:12px;border-top:1px solid var(--line,#ddd);">
          <b>${c.adminPassWipeTitle}</b>
          <p class="muted">${c.adminPassWipeBody}</p>
          <label class="muted" for="passWipeCode">${c.adminPassWipeCode}</label>
          <input id="passWipeCode" type="text" autocomplete="off" spellcheck="false" style="margin:8px 0;">
          <button class="ghost" type="button" data-action="askClearPassLog" style="width:100%;color:#B42318;">${c.adminPassWipe}</button>
          <p class="error" id="passWipeError"></p>
          <p class="ok hidden" id="passWipeOk"></p>
        </div>` : ""}
        ${canSeePassLog() ? `<div id="ck-auth-more"></div>` : ""}
      </div>` : "";
  const face = window._profilePhoto
    ? `<span class="avatar"><img alt="" src="${escapeHtml(window._profilePhoto)}"></span>`
    : `<span class="avatar">${escapeHtml(initials(profile ? profile.displayName : ""))}</span>`;
  const localStaff = currentRole() === "teacher" || currentRole() === "administrator";
  const staffWait = localStaff && !verifiedStaffRole()
    ? `<div class="card wide"><b>${c.staffNotListed}</b><p class="muted" id="staffCloudId">${escapeHtml(window._ckUserRecordName || "")}</p><button class="ghost" type="button" data-action="copyStaffId" style="width:100%;">${c.staffCopyId}</button></div>`
    : "";
  document.getElementById("view-more").innerHTML = `
    <div class="dash">
      <div class="card wide"><div class="more-face">${face}<div><div class="t">${escapeHtml(profile ? profile.displayName : "")}</div><div class="s">${escapeHtml(roleLabel())}</div></div></div></div>
      ${staffWait}
      ${adminTools}
      ${guestWebCodeCard()}
      ${isGuest() ? `${guestHomeCard()}<button class="card action" type="button" data-action="useCode"><div class="t">${c.useCode}</div></button>` : ""}
      <button class="card action" type="button" id="signOutProfile">${c.signOut}</button>
    </div>`;
  const tokenEl = document.getElementById("token");
  const envEl = document.getElementById("env");
  if (tokenEl) tokenEl.value = schoolToken();
  if (envEl) envEl.value = schoolEnv();
  mountCkAuth(document.getElementById("ck-auth-more"));
  if (localStaff && !verifiedStaffRole() && ckWebAuthToken() && !window._ckUserRecordName) {
    ckUserRecordName().then((id) => {
      const node = document.getElementById("staffCloudId");
      if (node && id) node.textContent = id;
    }).catch(() => {});
  }
}

function personButton(person) {
  const mail = person.email ? `mailto:${person.email}` : "";
  return `<button class="staff" type="button" data-mail="${escapeHtml(mail)}">
    <span><div class="t">${escapeHtml(person.name)}</div>
    <div class="s">${escapeHtml(person.group || "")}${person.email ? " · " + escapeHtml(person.email) : ""}</div></span>
    <span class="s">${person.email ? t().email + " ›" : ""}</span>
  </button>`;
}

function renderStaff(query) {
  const q = String(query || "").trim().toLowerCase();
  const list = staff.filter((person) => {
    const blob = `${person.name} ${person.group} ${person.email}`.toLowerCase();
    return !q || blob.includes(q);
  });
  document.getElementById("view-contacts").innerHTML = `
    ${view === "contacts" ? backBar() : ""}
    <input class="search" id="staffQuery" aria-label="${escapeHtml(t().search)}" placeholder="${t().search}" value="${escapeHtml(query || "")}">
    <div class="people-grid">${list.slice(0, 120).map((person) => `<div class="card">${personButton(person)}</div>`).join("") || `<div class="card"><p class="muted">${t().search}</p></div>`}</div>`;
}

function swipeSubtitle(hasPhoto) {
  const c = t();
  if (!hasPhoto) return c.swipeSub;
  const name = (profile && (profile.firstName || profile.displayName)) || "";
  const grade = profile && profile.grade ? `${c.grade} ${profile.grade}` : "";
  return [name, grade].filter(Boolean).join(" · ") || c.swipe;
}

function applyAvatar(url) {
  window._profilePhoto = url || "";
  const node = document.getElementById("avatar");
  if (!node) return;
  if (url) {
    node.innerHTML = `<img alt="" src="${escapeHtml(url)}">`;
  } else {
    node.textContent = initials(profile ? profile.displayName : "");
  }
}

// Reads the signed-in student's own profile record (named from their code, never the code itself).
async function ownProfileSecrets() {
  const recordName = await profileRecordName(profile.key);
  if (!recordName) return profileSecrets(null, profile.key);
  const profiles = await fetchByNames(cloudDb(), [recordName]);
  const mine = profiles.find((item) => String(item.recordName || "") === recordName);
  return profileSecrets(mine, profile.key);
}

async function loadProfilePhoto() {
  if (!profile || !profile.key) {
    applyAvatar("");
    return;
  }
  if (!schoolToken()) return;
  try { await ensureCloud(); } catch (_) {}
  try {
    const secrets = await ownProfileSecrets();
    applyAvatar(secrets.photo);
    if (view === "more") renderMore();
  } catch (_) {}
}

function applySwipeTile(url) {
  const tileSub = document.getElementById("swipeTileSub");
  const mark = document.getElementById("swipeTileMark");
  if (tileSub) tileSub.textContent = swipeSubtitle(!!url);
  if (mark) {
    mark.src = url || "./SwipeCard.png";
    mark.className = url ? "tile-id" : "tile-swipe";
  }
}

function swipeUploadControls(hasPhoto) {
  const c = t();
  return `<input id="swipeFile" class="hidden" type="file" accept="image/*" capture="environment">
    <button class="primary" type="button" data-action="pickSwipe" style="max-width:480px;">${hasPhoto ? c.replaceSwipePhoto : c.addSwipePhoto}</button>`;
}
function swipePage(url) {
  const c = t();
  const name = (profile && (profile.firstName || profile.displayName)) || "Warrior";
  const grade = profile && profile.grade ? `${c.grade} ${profile.grade}` : "";
  const canUpload = isGuestStudent();
  if (!url) {
    return `${backBar()}<div class="card wide" style="max-width:480px;">
      <p class="muted" style="margin:0;">${canUpload ? c.swipeGuestEmpty : c.noSwipe}</p>
      ${canUpload ? swipeUploadControls(false) : ""}
    </div>`;
  }
  return `${backBar()}
    <div class="card wide" style="max-width:480px;">
      <img class="id-photo" alt="" src="${escapeHtml(url)}">
      <div class="id-meta">
        <div class="t">${escapeHtml(name)}</div>
        <div class="s">${escapeHtml(c.school)}${grade ? " · " + escapeHtml(grade) : ""}</div>
      </div>
      ${canUpload ? swipeUploadControls(true) : ""}
    </div>`;
}
function saveGuestSwipe(dataUrl) {
  if (!profile || !isGuestStudent() || !dataUrl) return;
  profile.swipeCard = dataUrl;
  localStorage.setItem("whsWebProfile", JSON.stringify(profile));
}
function compressSwipePhoto(file) {
  return new Promise((resolve, reject) => {
    if (!file) {
      reject(new Error("no file"));
      return;
    }
    const img = new Image();
    const blobURL = URL.createObjectURL(file);
    img.onload = () => {
      const max = 1400;
      const scale = Math.min(1, max / Math.max(img.width, img.height));
      const width = Math.max(1, Math.round(img.width * scale));
      const height = Math.max(1, Math.round(img.height * scale));
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      canvas.getContext("2d").drawImage(img, 0, 0, width, height);
      URL.revokeObjectURL(blobURL);
      resolve(canvas.toDataURL("image/jpeg", 0.72));
    };
    img.onerror = () => {
      URL.revokeObjectURL(blobURL);
      reject(new Error("image"));
    };
    img.src = blobURL;
  });
}
async function handleSwipeFile(file) {
  try {
    const dataUrl = await compressSwipePhoto(file);
    saveGuestSwipe(dataUrl);
    applySwipeTile(dataUrl);
    if (view === "swipe") loadSwipeCard();
    if (view === "home") applySwipeTile(dataUrl);
  } catch (_) {}
}

const SPANISH_FILES = [
  { id: "spanishSerEstar", file: "./study/SerVsEstar.png", kind: "image" },
  { id: "spanishBootVerbs", file: "./study/Spanish-Boot-Verbs.pdf", kind: "pdf" },
  { id: "spanishVocabPacket", file: "./study/Spanish-Vocab-Packet-1.pdf", kind: "pdf" },
  { id: "spanishPreteriteSheet", file: "./study/Spanish-Preterite-Study-Sheet.pdf", kind: "pdf" },
  { id: "spanishPreteriteImperfect", file: "./study/Spanish-Preterite-Imperfect-Uses.pdf", kind: "pdf" }
];
const SPANISH_READY_SETS = [
  { id: "present", nameKey: "presentTense", kind: "form", pairs: [
    ["hablar · yo", "hablo"], ["hablar · tú", "hablas"], ["hablar · ella", "habla"], ["hablar · nosotros", "hablamos"],
    ["comer · yo", "como"], ["comer · tú", "comes"], ["comer · ellos", "comen"],
    ["vivir · yo", "vivo"], ["vivir · tú", "vives"], ["vivir · nosotros", "vivimos"],
    ["tener · yo", "tengo"], ["ir · yo", "voy"], ["ser · yo", "soy"], ["estar · yo", "estoy"],
    ["hacer · yo", "hago"], ["decir · yo", "digo"]
  ]},
  { id: "boot", nameKey: "bootVerbsGame", kind: "form", pairs: [
    ["pensar · yo", "pienso"], ["pensar · tú", "piensas"], ["pensar · nosotros", "pensamos"],
    ["querer · yo", "quiero"], ["querer · tú", "quieres"], ["querer · nosotros", "queremos"],
    ["poder · yo", "puedo"], ["poder · ella", "puede"], ["poder · nosotros", "podemos"],
    ["dormir · yo", "duermo"], ["dormir · nosotros", "dormimos"],
    ["pedir · yo", "pido"], ["pedir · tú", "pides"],
    ["jugar · yo", "juego"], ["jugar · nosotros", "jugamos"], ["empezar · yo", "empiezo"]
  ]},
  { id: "serestar", nameKey: "serEstarGame", kind: "form", pairs: [
    ["Yo ___ de México.", "soy"], ["Ella ___ doctora.", "es"], ["Nosotros ___ estudiantes.", "somos"],
    ["Tú ___ inteligente.", "eres"], ["Ellos ___ altos.", "son"], ["El libro ___ de Ana.", "es"],
    ["Yo ___ cansado.", "estoy"], ["Ella ___ en casa.", "está"], ["Nosotros ___ enfermos.", "estamos"],
    ["Tú ___ feliz hoy.", "estás"], ["La fiesta ___ en el parque.", "está"], ["¿Dónde ___ el baño?", "está"],
    ["Las ventanas ___ abiertas.", "están"], ["Ustedes ___ listos.", "están"]
  ]},
  { id: "preterite", nameKey: "preteriteGame", kind: "form", pairs: [
    ["hablar · yo · pretérito", "hablé"], ["hablar · tú · pretérito", "hablaste"], ["hablar · él · pretérito", "habló"],
    ["comer · yo · pretérito", "comí"], ["comer · ella · pretérito", "comió"],
    ["vivir · yo · pretérito", "viví"], ["vivir · ellos · pretérito", "vivieron"],
    ["ir · yo · pretérito", "fui"], ["ser · ella · pretérito", "fue"],
    ["tener · yo · pretérito", "tuve"], ["estar · nosotros · pretérito", "estuvimos"], ["hacer · yo · pretérito", "hice"]
  ]},
  { id: "aspect", nameKey: "aspectGame", kind: "aspect", pairs: [
    ["Ayer yo _____ al cine con mis amigos.", "fui", "iba"],
    ["Cuando era niño, yo _____ al parque todos los días.", "iba", "fui"],
    ["Anoche nosotros _____ una película.", "vimos", "veíamos"],
    ["Los viernes nosotros siempre _____ películas.", "veíamos", "vimos"],
    ["De repente, ella _____ la puerta.", "abrió", "abría"],
    ["Mientras yo _____, mi hermano leía.", "estudiaba", "estudié"],
    ["El año pasado ellos _____ a México.", "fueron", "iban"],
    ["Cada verano ellos _____ a la playa.", "iban", "fueron"],
    ["Una vez yo _____ un perro negro.", "tuve", "tenía"],
    ["De niña, ella _____ un perro.", "tenía", "tuvo"],
    ["Anoche tú _____ la tarea.", "hiciste", "hacías"],
    ["Todos los días tú _____ la tarea después de clase.", "hacías", "hiciste"],
    ["Ayer yo _____ con María por una hora.", "hablé", "hablaba"],
    ["Mientras hablábamos, el teléfono _____.", "sonó", "sonaba"],
    ["Cuando yo era joven, _____ en León.", "vivía", "viví"],
    ["El lunes pasado nosotros _____ el examen.", "dimos", "dábamos"],
    ["Siempre nosotros _____ exámenes los lunes.", "dábamos", "dimos"],
    ["Ayer, de repente, _____ a llover.", "empezó", "empezaba"]
  ]},
  { id: "articles", nameKey: "articlesSet", kind: "form", pairs: [
    ["libro", "el"], ["casa", "la"], ["lápiz", "el"], ["mesa", "la"], ["chico", "el"], ["chica", "la"],
    ["libros", "los"], ["casas", "las"], ["problema", "el"], ["mano", "la"], ["día", "el"], ["agua", "el"]
  ]},
  { id: "numbers", nameKey: "numbersSet", kind: "form", pairs: [
    ["11", "once"], ["12", "doce"], ["13", "trece"], ["15", "quince"], ["16", "dieciséis"],
    ["20", "veinte"], ["21", "veintiuno"], ["22", "veintidós"], ["30", "treinta"], ["40", "cuarenta"],
    ["100", "cien"], ["500", "quinientos"]
  ]}
];
const FILE_TITLES = {
  en: {
    spanishSerEstar: "Ser vs Estar",
    spanishBootVerbs: "Boot verbs",
    spanishVocabPacket: "Español 1 Vocab Packet",
    spanishPreteriteSheet: "Preterite study sheet",
    spanishPreteriteImperfect: "Preterite and imperfect"
  },
  es: {
    spanishSerEstar: "Ser vs Estar",
    spanishBootVerbs: "Verbos de bota",
    spanishVocabPacket: "Paquete de vocabulario de Español 1",
    spanishPreteriteSheet: "Hoja de pretérito",
    spanishPreteriteImperfect: "Pretérito e imperfecto"
  }
};

const CLASS_CATEGORIES = ["Math", "English", "Science", "Spanish", "History", "CTE", "Publishing"];
const COURSE_LEVELS = ["College Prep", "Honors", "AP", "ECE", "Dual Enrollment", "Elective"];
const CATEGORY_KEYS = {
  Math: "catMath", English: "catEnglish", Science: "catScience", Spanish: "catSpanish",
  History: "catHistory", CTE: "catCTE", Publishing: "catPublishing"
};
const LEVEL_KEYS = {
  "College Prep": "levelCP", Honors: "levelHonors", AP: "levelAP", ECE: "levelECE",
  "Dual Enrollment": "levelDual", Elective: "levelElective"
};

function parseStudy(raw) {
  if (!raw) return { classes: [], spanish: {}, english: {} };
  try {
    const parsed = JSON.parse(raw);
    return {
      classes: Array.isArray(parsed.classes) ? parsed.classes : [],
      spanish: parsed.spanish && typeof parsed.spanish === "object" ? parsed.spanish : {},
      english: parsed.english && typeof parsed.english === "object" ? parsed.english : {}
    };
  } catch (_) {
    return { classes: [], spanish: {}, english: {} };
  }
}

function studyState() {
  return window._study || { classes: [], spanish: {}, english: {} };
}

function canEditClassesOnSite() {
  return isGuestStudent();
}

function guestClassList() {
  return Array.isArray(profile && profile.classes) ? profile.classes.slice() : [];
}

function persistGuestClasses(classes) {
  if (!profile) return;
  profile.classes = classes;
  localStorage.setItem("whsWebProfile", JSON.stringify(profile));
  window._study = { classes, spanish: {}, english: {} };
}

function applyGuestStudy() {
  window._study = { classes: guestClassList(), spanish: {}, english: {} };
}

function newClassId() {
  if (window.crypto && typeof window.crypto.randomUUID === "function") return window.crypto.randomUUID();
  return "class-" + Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

function categoryLabel(value) {
  return t()[CATEGORY_KEYS[value] || ""] || value;
}

function levelLabel(value) {
  return t()[LEVEL_KEYS[value] || ""] || value;
}

function classOptionList(values, selected, labels) {
  return values.map((value) => {
    const picked = value === selected ? " selected" : "";
    return `<option value="${escapeHtml(value)}"${picked}>${escapeHtml(labels(value))}</option>`;
  }).join("");
}

function showClassEditor(existing) {
  const c = t();
  const course = existing || {};
  openSheet(`
    <div class="card-title"><b>${existing ? c.editClass : c.addClass}</b><button type="button" data-action="closeSheet">${c.close}</button></div>
    <input type="hidden" id="classEditId" value="${escapeHtml(course.id || "")}">
    <label class="sheet-field"><span>${c.classSubject}</span><input id="classSubject" value="${escapeHtml(course.subject || "")}" autocomplete="off"></label>
    <label class="sheet-field"><span>${c.classTeacher}</span><input id="classTeacher" value="${escapeHtml(course.teacher || "")}" autocomplete="off"></label>
    <label class="sheet-field"><span>${c.classLevel}</span><select id="classLevel">${classOptionList(COURSE_LEVELS, course.courseLevel || "College Prep", levelLabel)}</select></label>
    <label class="sheet-field"><span>${c.classCategory}</span><select id="classCategory">${classOptionList(CLASS_CATEGORIES, course.category || "Spanish", categoryLabel)}</select></label>
    <label class="sheet-field"><span>${c.classRoom}</span><input id="classRoom" value="${escapeHtml(course.room || "")}" autocomplete="off"></label>
    <label class="sheet-field"><span>${c.classClassroom}</span><input id="classClassroom" value="${escapeHtml(course.classroomURL || "")}" placeholder="https://classroom.google.com/..." autocomplete="off"></label>
    <p class="error" id="classEditError"></p>
    <button class="primary" type="button" data-action="saveClass">${c.saveClass}</button>`);
}

function saveClassFromSheet() {
  const err = document.getElementById("classEditError");
  const subject = (document.getElementById("classSubject") || {}).value || "";
  const teacher = (document.getElementById("classTeacher") || {}).value || "";
  const trimmedSubject = subject.trim();
  const trimmedTeacher = teacher.trim();
  if (!trimmedSubject || !trimmedTeacher) {
    if (err) err.textContent = t().classNeedInfo;
    return;
  }
  const id = ((document.getElementById("classEditId") || {}).value || "").trim() || newClassId();
  const classes = guestClassList();
  const next = {
    id,
    subject: trimmedSubject,
    teacher: trimmedTeacher,
    courseLevel: (document.getElementById("classLevel") || {}).value || "College Prep",
    category: (document.getElementById("classCategory") || {}).value || "Spanish",
    classroomURL: ((document.getElementById("classClassroom") || {}).value || "").trim(),
    letterGrade: "",
    room: ((document.getElementById("classRoom") || {}).value || "").trim()
  };
  const index = classes.findIndex((item) => item.id === id);
  if (index >= 0) {
    next.letterGrade = classes[index].letterGrade || "";
    classes[index] = next;
  } else {
    classes.push(next);
  }
  persistGuestClasses(classes);
  closeSheet();
  applyClassTile();
  if (view === "classes") renderClasses();
  if (view === "class") renderClassDetail();
}

function confirmDeleteClass(id) {
  const c = t();
  openSheet(`
    <div class="card-title"><b>${c.deleteClassTitle}</b><button type="button" data-action="closeSheet">${c.close}</button></div>
    <p class="muted">${c.deleteClassBody}</p>
    <button class="primary" type="button" data-action="closeSheet">${c.signOutCancel}</button>
    <button class="ghost" type="button" data-action="deleteClass" data-class-id="${escapeHtml(id || "")}" style="width:100%;margin-top:8px;color:#B42318;">${c.deleteClass}</button>`);
}

function deleteGuestClass(id) {
  persistGuestClasses(guestClassList().filter((item) => item.id !== id));
  closeSheet();
  if (window._classID === id) window._classID = "";
  applyClassTile();
  if (view === "class") show("classes");
  else if (view === "classes") renderClasses();
}

function classById(id) {
  return studyState().classes.find((item) => item.id === id);
}

function notebooksFor(course) {
  if (!course) return [];
  const key = course.id;
  const cat = String(course.category || "").toLowerCase();
  const pack = cat === "spanish" ? studyState().spanish[key] : cat === "english" ? studyState().english[key] : null;
  return (pack && pack.folders) || [];
}

function resourcesFor(course) {
  const c = t();
  const cat = String(course.category || "").toLowerCase();
  if (cat === "spanish") {
    return [
      { id: "spanishStudyGames", title: c.readySets, kind: "readySets" },
      { id: "spanishStudyFolder", title: c.studyFolder, kind: "folder" }
    ];
  }
  if (cat === "english") {
    return [
      { id: "englishDefinitionQuiz", title: c.englishQuiz, kind: "englishQuiz" },
      { id: "englishStudyGames", title: c.studyGames, kind: "englishVocab" }
    ];
  }
  return [];
}

function applyClassTile() {
  const tileSub = document.getElementById("classTileSub");
  if (!tileSub) return;
  const courses = studyState().classes;
  if (!courses.length) {
    tileSub.textContent = t().classesSub;
    return;
  }
  tileSub.textContent = courses.length === 1
    ? (courses[0].subject || t().classesTile)
    : `${courses.length} ${t().classesTile}`;
}

function renderClasses() {
  const node = document.getElementById("view-classes");
  if (!(node && view === "classes")) return;
  const c = t();
  const courses = studyState().classes;
  const add = canEditClassesOnSite()
    ? `<button class="card action wide" type="button" data-action="addClass"><div class="t">${c.addClass}</div></button>`
    : "";
  if (!courses.length) {
    node.innerHTML = `${backBar()}<div class="dash">${add}<div class="card wide"><p class="muted" style="margin:0;">${canEditClassesOnSite() ? c.noClassesGuest : c.noClasses}</p></div></div>`;
    return;
  }
  node.innerHTML = backBar() + `<div class="dash">` + add + courses.map((course) => `
    <button class="card action" type="button" data-action="openClass" data-class-id="${escapeHtml(course.id)}">
      <div class="t">${escapeHtml(course.subject || t().classesTile)}</div>
      <div class="s">${escapeHtml([course.teacher, levelLabel(course.courseLevel), course.room].filter(Boolean).join(" · "))}</div>
    </button>`).join("") + `</div>`;
}

function renderClassDetail() {
  const node = document.getElementById("view-class");
  if (!(node && view === "class")) return;
  const course = classById(window._classID);
  const c = t();
  if (!course) {
    node.innerHTML = `${backBar()}<div class="card wide"><p class="muted" style="margin:0;">${c.noClasses}</p></div>`;
    return;
  }
  const resources = resourcesFor(course);
  const classroom = String(course.classroomURL || "").trim();
  const classroomHref = classroom && !/^https?:/i.test(classroom) ? `https://${classroom}` : classroom;
  const edit = canEditClassesOnSite() ? `
      <button class="ghost" type="button" data-action="editClass" data-class-id="${escapeHtml(course.id)}" style="margin-top:10px;">${c.editClass}</button>
      <button class="ghost" type="button" data-action="askDeleteClass" data-class-id="${escapeHtml(course.id)}" style="width:100%;margin-top:8px;color:#B42318;">${c.deleteClass}</button>` : "";
  node.innerHTML = `
    <div class="toolbar"><button class="ghost" type="button" data-go="classes">${c.back}</button></div>
    <div class="card wide">
      <div class="t">${escapeHtml(course.subject || "")}</div>
      <div class="s">${escapeHtml([course.teacher, levelLabel(course.courseLevel), categoryLabel(course.category), course.letterGrade].filter(Boolean).join(" · "))}</div>
      ${classroomHref ? `<p><a href="${escapeHtml(classroomHref)}" target="_blank" rel="noopener" style="color:var(--orange);font-weight:600;">${c.classroom}</a></p>` : ""}
      ${edit}
    </div>
    <p class="section">${c.resources}</p>
    <div class="dash">${resources.length ? resources.map((resource) => `
      <button class="card action" type="button" data-action="openResource" data-resource="${escapeHtml(resource.id)}" data-class-id="${escapeHtml(course.id)}">
        <div class="t">${escapeHtml(resource.title)}</div>
        <div class="s">${resource.kind === "phone" ? c.openOnPhone : resource.kind === "readySets" ? c.readyHint : c.classesBody}</div>
      </button>`).join("") : `<div class="card wide"><p class="muted" style="margin:0;">${c.noResources}</p></div>`}</div>`;
}

function listCards(folders, kind) {
  const c = t();
  const rows = [];
  (folders || []).forEach((folder) => {
    (folder.lists || []).forEach((list) => {
      const count = (list.entries || []).length;
      rows.push(`<button class="card action" type="button" data-action="openList" data-kind="${kind}" data-folder="${escapeHtml(folder.id)}" data-list="${escapeHtml(list.id)}">
        <div class="t">${escapeHtml(list.name || folder.name || c.flashcards)}</div>
        <div class="s">${escapeHtml(folder.name || "")} · ${count}</div>
      </button>`);
    });
  });
  return rows.join("") || `<div class="card wide"><p class="muted" style="margin:0;">${c.noWords}</p></div>`;
}

function pairsFromList(kind, folderID, listID) {
  const course = classById(window._classID);
  const folders = notebooksFor(course);
  const list = (folders.find((folder) => folder.id === folderID) || { lists: [] }).lists.find((item) => item.id === listID);
  const entries = (list && list.entries) || [];
  if (kind === "english" || kind === "englishQuiz") {
    return entries.filter((entry) => entry.word).map((entry) => ({ front: entry.word, back: entry.definition || "" }));
  }
  return entries.filter((entry) => entry.spanish).map((entry) => ({ front: entry.spanish, back: entry.english || "" }));
}

function renderStudy() {
  const node = document.getElementById("view-study");
  if (!(node && view === "study")) return;
  const c = t();
  const back = `<div class="toolbar"><button class="ghost" type="button" data-action="openClass" data-class-id="${escapeHtml(window._classID || "")}">${c.back}</button></div>`;
  const mode = window._studyMode || {};
  document.body.classList.toggle("ql-open", mode.type === "learn");
  if (mode.type === "phone") {
    node.innerHTML = `${back}<div class="card wide"><p class="muted" style="margin:0;">${c.openOnPhone}</p></div>`;
    return;
  }
  if (mode.type === "folder") {
    const titles = FILE_TITLES[lang] || FILE_TITLES.en;
    node.innerHTML = back + `<div class="dash">` + SPANISH_FILES.map((file) => `
      <button class="card action" type="button" data-action="openFile" data-file="${escapeHtml(file.file)}" data-kind="${file.kind}" data-title="${escapeHtml(titles[file.id] || file.id)}">
        <div class="t">${escapeHtml(titles[file.id] || file.id)}</div>
      </button>`).join("") + `</div>`;
    return;
  }
  if (mode.type === "file") {
    const body = mode.kind === "image"
      ? `<img class="id-photo" alt="" src="${escapeHtml(mode.file)}">`
      : `<iframe class="study-doc" title="${escapeHtml(mode.title || "")}" src="${escapeHtml(mode.file)}"></iframe>`;
    node.innerHTML = `${back}<div class="card wide"><div class="t">${escapeHtml(mode.title || "")}</div>${body}</div>`;
    return;
  }
  if (mode.type === "readySets") {
    node.innerHTML = `${back}<p class="muted">${c.readyHint}</p><div class="dash">` + SPANISH_READY_SETS.map((set) => `
      <button class="card action" type="button" data-action="openReadySet" data-set="${escapeHtml(set.id)}">
        <div class="t">${escapeHtml(c[set.nameKey] || set.id)}</div>
        <div class="s">${set.pairs.length}</div>
      </button>`).join("") + `</div>`;
    return;
  }
  if (mode.type === "learn") {
    node.innerHTML = renderLearnQuiz();
    return;
  }
  if (mode.type === "lists") {
    const course = classById(window._classID);
    node.innerHTML = back + `<div class="dash">` + listCards(notebooksFor(course), mode.kind) + `</div>`;
    return;
  }
  if (mode.type === "cards" || mode.type === "quiz") {
    const pairs = window._studyPairs || [];
    if (!pairs.length) {
      node.innerHTML = `${back}<div class="card wide"><p class="muted" style="margin:0;">${c.noWords}</p></div>`;
      return;
    }
    if (mode.type === "quiz") {
      renderQuiz(node, back, pairs);
      return;
    }
    const index = Math.max(0, Math.min(window._cardIndex || 0, pairs.length - 1));
    window._cardIndex = index;
    const pair = pairs[index];
    const shown = window._cardFlip ? pair.back || " " : pair.front;
    node.innerHTML = `${back}
      <div class="s" style="margin-bottom:8px;">${index + 1} / ${pairs.length}</div>
      <button class="flash action" type="button" data-action="flipCard"><b>${escapeHtml(shown)}</b><div class="s">${window._cardFlip ? "" : c.tapReveal}</div></button>
      <div class="toolbar">
        <button class="ghost" type="button" data-action="prevCard">${c.previous}</button>
        <button class="ghost" type="button" data-action="nextCard">${c.next}</button>
        <button class="ghost" type="button" data-action="startQuiz">${c.quiz}</button>
      </div>`;
    return;
  }
  node.innerHTML = `${back}<div class="card wide"><p class="muted" style="margin:0;">${c.noResources}</p></div>`;
}

function renderQuiz(node, back, pairs) {
  const c = t();
  const defined = pairs.filter((pair) => pair.back);
  if (defined.length < 2) {
    node.innerHTML = `${back}<div class="card wide"><p class="muted" style="margin:0;">${c.noWords}</p></div>`;
    return;
  }
  const quiz = window._quiz || startQuiz(defined);
  if (quiz.index >= quiz.order.length) {
    node.innerHTML = `${back}<div class="card wide"><div class="t">${c.quizDone}</div><div class="s">${c.correct}: ${quiz.correct} / ${quiz.order.length}</div></div>`;
    return;
  }
  const current = quiz.order[quiz.index];
  const choices = quiz.choices[quiz.index] || [];
  node.innerHTML = `${back}
    <div class="s">${quiz.index + 1} / ${quiz.order.length}</div>
    <div class="card wide"><div class="t">${escapeHtml(current.front)}</div></div>
    ${choices.map((choice, i) => `<button class="quiz-choice" type="button" data-action="quizPick" data-pick="${i}">${escapeHtml(choice)}</button>`).join("")}
    <p class="muted" id="quizNote"></p>`;
}

function startLearnQuiz(setId) {
  const set = SPANISH_READY_SETS.find((item) => item.id === setId);
  if (!set) return;
  const deck = set.pairs.map((pair) => ({
    prompt: pair[0],
    answer: pair[1],
    alt: pair[2] || ""
  })).sort(() => Math.random() - 0.5);
  window._ql = {
    setId,
    kind: set.kind,
    deck,
    index: 0,
    correct: 0,
    selected: "",
    revealed: false,
    finished: !deck.length,
    options: []
  };
  loadLearnOptions();
  window._studyMode = { type: "learn" };
  show("study");
  renderStudy();
}

function loadLearnOptions() {
  const ql = window._ql;
  if (!ql || !ql.deck[ql.index]) {
    if (ql) ql.options = [];
    return;
  }
  const item = ql.deck[ql.index];
  if (ql.kind === "aspect" && item.alt) {
    ql.options = [item.answer, item.alt].sort(() => Math.random() - 0.5);
    return;
  }
  const pool = ql.deck.map((pair) => pair.answer).filter((answer) => answer !== item.answer);
  const options = [item.answer];
  while (options.length < Math.min(4, pool.length + 1) && pool.length) {
    const next = pool.splice(Math.floor(Math.random() * pool.length), 1)[0];
    if (next && !options.includes(next)) options.push(next);
  }
  ql.options = options.sort(() => Math.random() - 0.5);
}

function renderLearnQuiz() {
  const c = t();
  const ql = window._ql;
  if (!ql) return `<div class="card wide"><p class="muted">${c.noResources}</p></div>`;
  const total = ql.deck.length;
  const progress = ql.finished ? 100 : ((ql.index + (ql.revealed ? 1 : 0)) / Math.max(total, 1)) * 100;
  if (ql.finished) {
    return `<div class="ql">
      <div class="ql-head"><button class="ql-x" type="button" data-action="qlClose">${"×"}</button><span></span></div>
      <div class="ql-track"><div class="ql-fill" style="width:100%"></div></div>
      <div class="ql-summary">
        <div class="t">${c.aspectDone}</div>
        <p class="muted">${c.correct}: ${ql.correct} / ${total}</p>
        <button class="ql-go" type="button" data-action="qlAgain">${c.practiceAgain}</button>
      </div>
    </div>`;
  }
  const item = ql.deck[ql.index];
  const ok = ql.revealed && ql.selected === item.answer;
  return `<div class="ql">
    <div class="ql-head">
      <button class="ql-x" type="button" data-action="qlClose">${"×"}</button>
      <div class="ql-count">${Math.min(ql.index + 1, total)} / ${total}</div>
      <span style="width:36px"></span>
    </div>
    <div class="ql-track"><div class="ql-fill" style="width:${progress}%"></div></div>
    <div class="ql-body">
      ${ql.revealed ? `<div class="ql-pop ${ok ? "ok" : "bad"}">${ok ? c.learnCorrect : c.learnIncorrect}</div>` : ""}
      <div class="ql-prompt">${escapeHtml(item.prompt)}</div>
      <div class="ql-choose">${c.chooseAnswer}</div>
      ${ql.options.map((choice) => {
        let cls = "ql-opt";
        if (ql.revealed && choice === item.answer) cls += " ok";
        else if (ql.revealed && choice === ql.selected) cls += " bad";
        else if (ql.revealed) cls += " dim";
        return `<button class="${cls}" type="button" data-action="qlPick" data-pick="${escapeHtml(choice)}">${escapeHtml(choice)}</button>`;
      }).join("")}
      ${ql.revealed ? `<button class="ql-go" type="button" data-action="qlContinue">${ql.index + 1 >= total ? c.close : c.continueBtn}</button>` : ""}
    </div>
  </div>`;
}

function startQuiz(pairs) {
  const shuffled = pairs.slice().sort(() => Math.random() - 0.5).slice(0, 20);
  const quiz = { order: shuffled, index: 0, correct: 0, choices: shuffled.map((item) => {
    const others = pairs.filter((pair) => pair.back !== item.back).map((pair) => pair.back);
    const options = [item.back];
    while (options.length < 4 && others.length) {
      const next = others.splice(Math.floor(Math.random() * others.length), 1)[0];
      if (next && !options.includes(next)) options.push(next);
    }
    return options.sort(() => Math.random() - 0.5);
  }) };
  window._quiz = quiz;
  return quiz;
}

function openResource(classID, resourceID) {
  window._classID = classID;
  const course = classById(classID);
  const resource = resourcesFor(course || { category: "" }).find((item) => item.id === resourceID);
  if (!resource || resource.kind === "phone") {
    window._studyMode = { type: "phone" };
  } else if (resource.kind === "folder") {
    window._studyMode = { type: "folder" };
  } else if (resource.kind === "readySets") {
    window._studyMode = { type: "readySets" };
  } else if (resource.kind === "englishQuiz") {
    window._studyMode = { type: "lists", kind: "englishQuiz" };
  } else if (resource.kind === "englishVocab") {
    window._studyMode = { type: "lists", kind: "english" };
  } else {
    window._studyMode = { type: "lists", kind: "spanish" };
  }
  show("study");
  renderStudy();
}

async function loadStudy() {
  applyClassTile();
  if (isGuestStudent()) {
    applyGuestStudy();
    applyClassTile();
    if (view === "classes") renderClasses();
    if (view === "class") renderClassDetail();
    if (view === "study") renderStudy();
    return;
  }
  if (currentRole() !== "student" || !profile || !profile.key) {
    if (view === "classes") renderClasses();
    if (view === "class") renderClassDetail();
    return;
  }
  try { await ensureCloud(); } catch (_) {}
  try {
    const secrets = await ownProfileSecrets();
    window._study = parseStudy(secrets.study);
    applyClassTile();
    if (view === "classes") renderClasses();
    if (view === "class") renderClassDetail();
    if (view === "study") renderStudy();
  } catch (error) {
    const node = document.getElementById("view-classes");
    if (node && view === "classes") node.innerHTML = `${backBar()}<p class="error">${escapeHtml(error.message)}</p>`;
  }
}

async function loadSwipeCard() {
  const list = document.getElementById("view-swipe");
  if (isGuestStudent()) {
    const url = (profile && profile.swipeCard) || "";
    applySwipeTile(url);
    if (list && view === "swipe") list.innerHTML = swipePage(url);
    return;
  }
  if (!isPairedStudent()) return;
  if (list && view === "swipe") list.innerHTML = `${backBar()}<p class="muted">${t().swipe}</p>`;
  applySwipeTile("");
  if (!schoolToken()) {
    if (list && view === "swipe") list.innerHTML = swipePage("");
    return;
  }
  try { await ensureCloud(); } catch (_) {}
  try {
    const secrets = await ownProfileSecrets();
    const url = secrets.swipe;
    applySwipeTile(url);
    if (list && view === "swipe") list.innerHTML = swipePage(url);
  } catch (error) {
    if (list && view === "swipe") {
      list.innerHTML = `${backBar()}<p class="error">${escapeHtml(error.message)}</p>`;
    }
  }
}

function openPassesInfo() {
  const c = t();
  openSheet(`
    <div class="card-title"><b>${c.passesTile}</b><button type="button" data-action="closeSheet">${c.close}</button></div>
    <p class="muted">${c.passesHint}</p>
    <button class="primary" type="button" data-go="contacts">${c.openContacts}</button>`);
}

function openAsk(preset) {
  const c = t();
  openSheet(`
    <div class="card-title"><b>${c.askTitle}</b><button type="button" data-action="closeSheet">${c.close}</button></div>
    <input id="askBox" aria-label="${escapeHtml(c.askTitle)}" placeholder="${c.askPlaceholder}" value="${escapeHtml(preset || "")}">
    <button class="primary" type="button" data-action="askGo">${c.askGo}</button>
    <div id="askOut" class="muted" style="margin-top:12px;">${c.askEmpty}</div>`);
  if (preset) answerAsk(preset);
}

function answerAsk(raw) {
  const q = String(raw || "").trim().toLowerCase();
  const out = document.getElementById("askOut");
  if (!out) return;
  const c = t();
  if (!q) { out.textContent = c.askEmpty; return; }
  if (/lunch|almuerzo|menu|menú/.test(q)) {
    out.innerHTML = `<button class="primary" type="button" data-go="lunch">${c.openLunch}</button>`;
    return;
  }
  if (/news|noticia|agenda|calendar|calendario/.test(q)) {
    out.innerHTML = `<button class="primary" type="button" data-go="news">${c.openNews}</button>`;
    return;
  }
  if (/pass|pase|hallway|flex/.test(q)) {
    out.textContent = c.passesHint;
    return;
  }
  if (/attendance|asistencia/.test(q)) {
    out.innerHTML = `<a class="primary" style="display:block;text-align:center;text-decoration:none;" href="mailto:whsattendance@watertownps.org">${c.attendance}</a>`;
    return;
  }
  const hits = staff.filter((person) => `${person.name} ${person.group} ${person.email}`.toLowerCase().includes(q)).slice(0, 6);
  if (hits.length) {
    out.innerHTML = hits.map(personButton).join("");
    return;
  }
  out.textContent = c.askEmpty;
}

function openAide() {
  const c = t();
  openSheet(`
    <div class="card-title"><b>${c.aideTitle}</b><button type="button" data-action="closeSheet">${c.close}</button></div>
    <p class="muted">${c.aideBody}</p>
    <button class="primary" type="button" data-go="contacts">${c.openContacts}</button>
    <button class="ghost" type="button" data-go="lunch" style="width:100%;margin-top:8px;">${c.openLunch}</button>
    <button class="ghost" type="button" data-go="news" style="width:100%;margin-top:8px;">${c.openNews}</button>
    <a class="ghost" style="display:block;text-align:center;margin-top:8px;text-decoration:none;" href="mailto:whsattendance@watertownps.org">${c.attendance}</a>`);
}

function renderIssuePass() {
  if (!canIssuePass()) return;
  const c = t();
  const today = new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  const teacher = (profile && (profile.displayName || profile.firstName)) || "";
  document.getElementById("view-issuepass").innerHTML = `<div class="dash">
    <div class="toolbar"><button class="ghost" type="button" data-go="passes">${c.openPasses}</button></div>
    <div class="card wide">
      <div class="t">${c.issuePass}</div>
      <p class="muted">${c.issuePassBody}</p>
      <div class="sheet-field"><span>${c.issuePassType}</span>
        <div class="pass-type">
          <button type="button" data-action="passKind" data-kind="hallway">${c.hallway}</button>
          <button type="button" class="on" data-action="passKind" data-kind="flex">${c.flex}</button>
        </div>
      </div>
      <label class="sheet-field"><span>${c.issuePassStudent}</span>
        <input id="issueStudent" type="text" maxlength="80" autocomplete="off">
      </label>
      <label class="sheet-field"><span>${c.issuePassDestination}</span>
        <input id="issueDestination" type="text" maxlength="120" autocomplete="off">
      </label>
      <label class="sheet-field"><span>${c.issuePassDates}</span>
        <input id="issueDates" type="text" maxlength="80" value="${escapeHtml(today)}" autocomplete="off">
      </label>
      <div class="sheet-field"><span>${c.issuePassSignature}</span>
        <canvas class="sig-pad" id="passSigPad"></canvas>
        <button class="ghost" type="button" data-action="clearPassSig" style="width:100%;margin-top:8px;">${c.issuePassClearSig}</button>
      </div>
      <label class="sheet-field"><span>${c.issuePassCode}</span>
        <input id="issueWebCode" type="text" maxlength="12" autocomplete="off" spellcheck="false" placeholder="XXXXX-XXXXX">
      </label>
      <p class="muted">${escapeHtml(teacher)}</p>
      <p class="error" id="issuePassError"></p>
      <p class="ok hidden" id="issuePassOk"></p>
      <button class="primary" type="button" data-action="issuePass" id="issuePassBtn">${c.issuePass}</button>
    </div>
  </div>`;
  window._issuePassKind = "flex";
  bindPassSignaturePad();
}
function bindPassSignaturePad() {
  const canvas = document.getElementById("passSigPad");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const ratio = Math.max(1, window.devicePixelRatio || 1);
  const width = Math.max(280, canvas.clientWidth || 520);
  const height = 140;
  canvas.width = Math.round(width * ratio);
  canvas.height = Math.round(height * ratio);
  canvas.style.width = width + "px";
  canvas.style.height = height + "px";
  ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
  ctx.fillStyle = "#fff";
  ctx.fillRect(0, 0, width, height);
  ctx.strokeStyle = "#111";
  ctx.lineWidth = 2.2;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  let drawing = false;
  const point = (event) => {
    const rect = canvas.getBoundingClientRect();
    const touch = event.touches && event.touches[0];
    const src = touch || event;
    return { x: src.clientX - rect.left, y: src.clientY - rect.top };
  };
  const start = (event) => {
    event.preventDefault();
    drawing = true;
    window._passSigEmpty = false;
    const p = point(event);
    ctx.beginPath();
    ctx.moveTo(p.x, p.y);
  };
  const move = (event) => {
    if (!drawing) return;
    event.preventDefault();
    const p = point(event);
    ctx.lineTo(p.x, p.y);
    ctx.stroke();
  };
  const end = () => { drawing = false; };
  canvas.onmousedown = start;
  canvas.onmousemove = move;
  canvas.onmouseup = end;
  canvas.onmouseleave = end;
  canvas.ontouchstart = start;
  canvas.ontouchmove = move;
  canvas.ontouchend = end;
  window._passSigEmpty = true;
  window._passSigPad = canvas;
}
function passSignatureFile() {
  const canvas = window._passSigPad || document.getElementById("passSigPad");
  if (!canvas || window._passSigEmpty) return null;
  const out = document.createElement("canvas");
  out.width = canvas.width;
  out.height = canvas.height;
  const ctx = out.getContext("2d");
  ctx.fillStyle = "#fff";
  ctx.fillRect(0, 0, out.width, out.height);
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";
  ctx.drawImage(canvas, 0, 0);
  try { return dataUrlToFile(out.toDataURL("image/png"), "signature.png"); } catch (_) { return null; }
}
function compressPassSignature(file) {
  return new Promise((resolve, reject) => {
    if (!file) {
      reject(new Error("image"));
      return;
    }
    const img = new Image();
    const blobURL = URL.createObjectURL(file);
    const budget = 200 * 240;
    img.onload = () => {
      URL.revokeObjectURL(blobURL);
      let maxW = 1280;
      let maxH = 320;
      let quality = 0.92;
      let dataUrl = "";
      for (let step = 0; step < 12; step += 1) {
        const scale = Math.min(1, maxW / Math.max(1, img.width), maxH / Math.max(1, img.height));
        const width = Math.max(1, Math.round(img.width * scale));
        const height = Math.max(1, Math.round(img.height * scale));
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        ctx.fillStyle = "#fff";
        ctx.fillRect(0, 0, width, height);
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = "high";
        ctx.drawImage(img, 0, 0, width, height);
        dataUrl = canvas.toDataURL("image/jpeg", quality);
        if ((dataUrl.split(",")[1] || "").length <= budget) {
          resolve(dataUrl);
          return;
        }
        if (quality > 0.72) quality = Math.max(0.72, quality - 0.04);
        else {
          maxW = Math.max(720, Math.round(maxW * 0.9));
          maxH = Math.max(180, Math.round(maxH * 0.9));
        }
      }
      resolve(dataUrl);
    };
    img.onerror = () => {
      URL.revokeObjectURL(blobURL);
      reject(new Error("image"));
    };
    img.src = blobURL;
  });
}
function setIssuePassError(message) {
  const node = document.getElementById("issuePassError");
  if (node) node.textContent = message || "";
  const ok = document.getElementById("issuePassOk");
  if (ok && message) ok.classList.add("hidden");
}
async function lookupAsSignedIn(names) {
  const unique = [...new Set((names || []).map((name) => String(name || "").trim()).filter(Boolean))];
  if (!ckWebAuthToken() || !unique.length) return [];
  const found = [];
  for (let start = 0; start < unique.length; start += 150) {
    const slice = unique.slice(start, start + 150);
    try {
      const response = await fetch(restPublicUrl("records/lookup", false), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ records: slice.map((recordName) => ({ recordName })) })
      });
      const payload = await response.json();
      recordsFrom(payload).filter(usableRecord).forEach((record) => found.push(record));
    } catch (_) {}
  }
  return found;
}
async function saveStaffPassBody(id, body) {
  if (!ckWebAuthToken() || !id) return false;
  let text = "";
  try { text = JSON.stringify(body || {}); } catch (_) { return false; }
  const sealed = await sealStaffBody(text);
  if (sealed.indexOf(STAFF_BODY_PREFIX) !== 0 || sealed.length > 900000) return false;
  const record = {
    recordType: CAMPUS_TYPE,
    recordName: "body." + id,
    fields: {
      kind: { value: "body" },
      passIDs: { value: sealed }
    }
  };
  try {
    await restModify(record, "create");
    return true;
  } catch (_) {
    try { await restModify(record, "forceUpdate"); return true; } catch (_) { return false; }
  }
}
async function applyStaffBodies(records) {
  const hiddenField = (value) => {
    const raw = String(value || "");
    return raw.indexOf("whs1.") === 0 || raw === "whs0.";
  };
  const need = (records || []).filter((record) => ["studentName", "destination", "dates", "teacherName"].some((key) => hiddenField(fieldValue(record, key))));
  if (!need.length) return;
  const bodies = await lookupAsSignedIn(need.map((record) => "body." + passRecordName(record)));
  const byName = new Map(bodies.map((record) => [String(record.recordName || "").toLowerCase(), record]));
  for (const record of need) {
    const body = byName.get(("body." + passRecordName(record)).toLowerCase());
    if (!body) continue;
    let parsed = null;
    try { parsed = JSON.parse(await openStaffBody(fieldValue(body, "passIDs") || "")); } catch (_) { parsed = null; }
    if (!parsed) continue;
    if (String(fieldValue(body, "passIDs") || "").indexOf(STAFF_BODY_PREFIX) !== 0 && verifiedStaffRole()) {
      await saveStaffPassBody(passRecordName(record), parsed);
    }
    record.fields = record.fields || {};
    ["studentName", "destination", "dates", "teacherName", "kind"].forEach((key) => {
      if (parsed[key]) record.fields[key] = { value: parsed[key] };
    });
    const sig = String(parsed.signature || "");
    if (sig.indexOf("data:") === 0) record._passIcon = sig;
    else if (sig) record._passIcon = "data:image/jpeg;base64," + sig;
  }
}
