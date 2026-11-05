// WHS WebView: News feed and staff posts.
// Files load in order (see index.html) and share one global scope.
function bundledNewsItems() {
  const c = t();
  return [
    { id: "alumni-spotlight", image: "./news/AlumniSpotlight.jpg", title: c.alumniTitle, subtitle: c.alumniSubtitle, published: 3, stamp: 3 },
    { id: "nths-applications", image: "./news/NTHSPoster.jpg", title: c.nthsTitle, subtitle: c.nthsSubtitle, published: 2, stamp: 2 },
    { id: "publishing-fundraiser", image: "./news/PublishingFundraiser.jpg", title: c.publishingTitle, subtitle: c.publishingSubtitle, published: 1, stamp: 1 }
  ];
}
function wireCard() {
  const c = t();
  return `<a class="card action wide" href="https://whswarriorswire.com" target="_blank" rel="noopener">
    <div class="row-item">
      <img class="tile-wire" src="./WarriorsWire.png" alt="">
      <div><div class="t">${c.wire}</div><div class="s">${c.wireSub}</div></div>
      <span class="chev">›</span>
    </div>
  </a>`;
}
function newsPage(feedInner) {
  return `<div class="dash">${backBar()}${wireCard()}<div class="card wide">${feedInner}</div></div>`;
}
function newsRowsHTML(items) {
  const c = t();
  if (!items.length) return `<p class="muted" style="margin:8px 0 0;">${c.newsEmpty}</p>`;
  return items.map((item) => {
    const art = item.image
      ? `<img class="news-art" alt="" src="${escapeHtml(item.image)}">`
      : `<span class="news-art empty">${icons.mega}</span>`;
    return `<button class="news-row" type="button" data-action="openNewsItem" data-news-id="${escapeHtml(item.id)}">
      ${art}
      <span><div class="t">${escapeHtml(item.title)}</div><div class="s">${escapeHtml(item.subtitle)}</div></span>
    </button>`;
  }).join("");
}
function paintNews(items) {
  window._newsItems = {};
  items.forEach((item) => { window._newsItems[item.id] = item; });
  const c = t();
  const rows = newsRowsHTML(items);
  const home = document.getElementById("homeNews");
  if (home) home.innerHTML = `<div class="t" style="margin-bottom:8px;">${c.newsFeed}</div>${rows}`;
  if (view === "news") {
    document.getElementById("view-news").innerHTML = newsPage(`<div class="t" style="margin-bottom:8px;">${c.newsFeed}</div>${rows}`);
  }
  if (view === "posts") paintAdminNews(items);
}
function isManagedNewsPost(id) {
  const key = String(id || "");
  if (!key || key === NEWS_MANIFEST) return false;
  return !bundledNewsItems().some((item) => item.id === key);
}
function adminNewsRowsHTML(items) {
  const c = t();
  const posts = (items || []).filter((item) => isManagedNewsPost(item.id));
  if (!posts.length) return `<p class="muted" style="margin:8px 0 0;">${c.postsEmpty}</p>`;
  return posts.map((item) => {
    const art = item.image
      ? `<img class="news-art" alt="" src="${escapeHtml(item.image)}">`
      : `<span class="news-art empty">${icons.mega}</span>`;
    return `<div class="news-row admin-post">
      ${art}
      <span style="flex:1;min-width:0"><div class="t">${escapeHtml(item.title)}</div><div class="s">${escapeHtml(item.subtitle)}</div></span>
      <button class="ghost news-delete" type="button" data-action="askDeleteNews" data-news-id="${escapeHtml(item.id)}">${c.deletePost}</button>
    </div>`;
  }).join("");
}
function paintAdminNews(items) {
  const list = document.getElementById("adminNewsList");
  if (!list) return;
  list.innerHTML = adminNewsRowsHTML(items);
}
function renderPosts() {
  if (!canPostNews()) return;
  const c = t();
  document.getElementById("view-posts").innerHTML = `<div class="dash">
    <div class="card wide">
      <div class="t">${c.composeNews}</div>
      <p class="muted">${c.composeNewsBody}</p>
      <div class="sheet-field"><span>${c.newsImageLabel}</span>
        <input id="newsImage" class="hidden" type="file" accept="image/*">
        <button class="ghost" type="button" data-action="pickNewsImage" style="width:100%;">${c.newsPickImage}</button>
        <img id="newsImagePreview" class="news-compose-preview hidden" alt="">
      </div>
      <label class="sheet-field"><span>${c.newsTitleLabel}</span>
        <input id="newsTitle" type="text" maxlength="120" autocomplete="off">
      </label>
      <label class="sheet-field"><span>${c.newsStoryLabel}</span>
        <textarea id="newsStory" rows="4" maxlength="800"></textarea>
      </label>
      <p class="error" id="newsComposeError"></p>
      <p class="ok hidden" id="newsComposeOk"></p>
      <button class="primary" type="button" data-action="publishNews" id="newsPublishBtn">${c.newsPublish}</button>
    </div>
    <div class="card wide">
      <div class="t" style="margin-bottom:8px;">${c.postsList}</div>
      <div id="adminNewsList">${adminNewsRowsHTML(Object.values(window._newsItems || {}))}</div>
    </div>
  </div>`;
}
function confirmDeleteNews(id) {
  if (!canPostNews() || !isManagedNewsPost(id)) return;
  const c = t();
  openSheet(`
    <div class="card-title"><b>${c.deletePostTitle}</b><button type="button" data-action="closeSheet">${c.close}</button></div>
    <p class="muted">${c.deletePostBody}</p>
    <button class="primary" type="button" data-action="closeSheet">${c.close}</button>
    <button class="ghost" type="button" data-action="deleteNews" data-news-id="${escapeHtml(id || "")}" style="width:100%;margin-top:8px;color:#B42318;">${c.deletePost}</button>`);
}
async function deleteNewsPost(id) {
  if (!canPostNews() || !isManagedNewsPost(id)) return;
  const c = t();
  window._pendingDeleteNewsId = id;
  try {
    await ensureCloud();
    watchAppleSignIn();
    if (!(await ensureSavedStaffSession())) throw Object.assign(new Error("APPLE"), { apple: true });
    const role = await requireEnrolledStaff();
    if (role !== "administrator") throw Object.assign(new Error("FAIL"), { reason: "staff" });
    let gone = false;
    const names = [id].concat(newsIconChunkNames(id));
    try { gone = await ckDeleteNames(names); } catch (error) {
      if (error && error.apple) throw error;
    }
    if (!gone) {
      try { gone = await restDeleteNames(names); } catch (error) {
        if (error && error.apple) throw error;
      }
    }
    await removeNewsFromManifest(id);
    window._pendingDeleteNewsId = "";
    closeSheet();
    await loadNewsFeed();
  } catch (error) {
    const apple = (error && error.apple) || error.message === "APPLE" || isAuthError(error);
    openSheet(`
      <div class="card-title"><b>${apple ? c.deletePostNeedApple : c.deletePostFail}</b><button type="button" data-action="closeSheet">${c.close}</button></div>`);
  }
}
function newsFieldRaw(record, key) {
  if (!record) return null;
  if (typeof record.get === "function") {
    try {
      const got = record.get(key);
      if (got != null) return got;
    } catch (_) {}
  }
  if (record[key] != null) return record[key];
  return record.fields && record.fields[key];
}
function newsImageParts(record) {
  let raw = newsFieldRaw(record, "imageParts");
  if (raw && typeof raw === "object" && Object.prototype.hasOwnProperty.call(raw, "value")) raw = raw.value;
  if (Array.isArray(raw)) return raw.map(String).filter(Boolean);
  if (typeof raw === "string" && raw.trim()) return [raw.trim()];
  return [];
}
function newsImageFromRecord(record) {
  if (record && record._newsIcon) return record._newsIcon;
  const direct = fieldValue(record, "signature") || fieldValue(record, "newsImage") || fieldValue(record, "image");
  if (direct && (/^(https?:|data:|\.\/)/.test(direct) || direct.indexOf("${apiToken}") !== -1)) return direct;
  const parts = newsImageParts(record);
  return parts.length ? "data:image/jpeg;base64," + parts.join("") : "";
}
function newsIconChunkNames(id) {
  const names = [];
  for (let i = 0; i < 40; i += 1) names.push("newsimg." + id + "." + i);
  return names;
}
function applyNewsIcons(posts, chunks) {
  const grouped = {};
  (chunks || []).forEach((record) => {
    if (String(fieldValue(record, "kind") || "").toLowerCase() !== "newsimg") return;
    const parent = fieldValue(record, "studentName");
    const idx = Number(String(record.recordName || "").split(".").pop());
    if (!parent || !Number.isFinite(idx) || idx < 0) return;
    if (!grouped[parent]) grouped[parent] = [];
    grouped[parent][idx] = fieldValue(record, "destination");
  });
  (posts || []).forEach((record) => {
    const parts = (grouped[record.recordName] || []).filter(Boolean);
    if (parts.length) record._newsIcon = "data:image/jpeg;base64," + parts.join("");
  });
}
function rememberPassIconChunk(grouped, record) {
  if (String(fieldValue(record, "kind") || "").toLowerCase() !== "passimg") return;
  const parent = fieldValue(record, "studentName");
  const idx = Number(String(record.recordName || "").split(".").pop());
  if (!parent || !Number.isFinite(idx) || idx < 0) return;
  if (!grouped[parent]) grouped[parent] = [];
  grouped[parent][idx] = fieldValue(record, "destination");
}
async function probePassIconCount(recordName) {
  let count = 1;
  for (let start = 1; start < 200; start += 20) {
    const names = [];
    for (let i = start; i < Math.min(start + 20, 200); i += 1) names.push("passimg." + recordName + "." + i);
    let found = [];
    try { found = await restLookupExact(names); } catch (_) { return count; }
    const have = new Set(found.map((record) => Number(String(record.recordName || "").split(".").pop())));
    let advanced = false;
    for (let i = start; i < start + names.length; i += 1) {
      if (!have.has(i)) return count;
      count = i + 1;
      advanced = true;
    }
    if (!advanced) return count;
  }
  return count;
}
async function applyPassIcons(records) {
  const missing = (records || []).filter((record) => record && record.recordName && !record._passIcon && String(passSignatureSrc(record) || "").indexOf("data:") !== 0);
  if (!missing.length) return;
  const grouped = {};
  let heads = [];
  try { heads = await restLookupExact(missing.map((record) => "passimg." + record.recordName + ".0")); } catch (_) { return; }
  const counts = {};
  heads.forEach((record) => {
    rememberPassIconChunk(grouped, record);
    const parent = fieldValue(record, "studentName");
    const parsed = parseInt(fieldValue(record, "dates"), 10);
    if (parent) counts[parent] = Number.isFinite(parsed) && parsed > 0 ? Math.min(200, parsed) : 0;
  });
  const unknown = missing.filter((record) => counts[record.recordName] === 0);
  for (const record of unknown) {
    counts[record.recordName] = await probePassIconCount(record.recordName);
  }
  const rest = [];
  missing.forEach((record) => {
    const count = counts[record.recordName];
    if (!count || count < 2) return;
    for (let i = 1; i < count; i += 1) rest.push("passimg." + record.recordName + "." + i);
  });
  if (rest.length) {
    try { (await restLookupExact(rest)).forEach((record) => rememberPassIconChunk(grouped, record)); } catch (_) {}
  }
  const code = normalizeCode(profile && profile.key);
  for (const record of missing) {
    const rawParts = (grouped[record.recordName] || []).filter(Boolean);
    const parts = [];
    let broken = false;
    for (const part of rawParts) {
      if (part === "whs0.") { broken = true; break; }
      if (String(part).indexOf("whs1.") === 0) {
        if (code.length !== 10) { broken = true; break; }
        const open = await openSeal(code, part);
        if (!open) { broken = true; break; }
        parts.push(open);
      } else parts.push(part);
    }
    if (!broken && parts.length) {
      record._passIcon = parts.length === 1 && parts[0].indexOf("data:") === 0
        ? parts[0]
        : "data:image/jpeg;base64," + parts.join("");
    }
  }
}
function chunkNewsImage(dataUrl, maxParts) {
  const raw = String(dataUrl || "").split(",")[1] || "";
  const size = 240;
  const parts = [];
  for (let i = 0; i < raw.length; i += size) parts.push(raw.slice(i, i + size));
  return parts.slice(0, maxParts || 40);
}
function compressNewsIcon(file) {
  return new Promise((resolve, reject) => {
    if (!file) {
      reject(new Error("image"));
      return;
    }
    const img = new Image();
    const blobURL = URL.createObjectURL(file);
    const budget = 40 * 240;
    img.onload = () => {
      URL.revokeObjectURL(blobURL);
      let max = 240;
      let quality = 0.62;
      let dataUrl = "";
      for (let step = 0; step < 10; step += 1) {
        const scale = Math.min(1, max / Math.max(img.width, img.height));
        const canvas = document.createElement("canvas");
        canvas.width = Math.max(1, Math.round(img.width * scale));
        canvas.height = Math.max(1, Math.round(img.height * scale));
        canvas.getContext("2d").drawImage(img, 0, 0, canvas.width, canvas.height);
        dataUrl = canvas.toDataURL("image/jpeg", quality);
        if ((dataUrl.split(",")[1] || "").length <= budget) {
          resolve(dataUrl);
          return;
        }
        quality = Math.max(0.28, quality - 0.08);
        max = Math.max(80, Math.round(max * 0.78));
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
async function attachNewsIcon(recordName, imageParts) {
  const parts = (imageParts || []).filter(Boolean);
  if (!recordName || !parts.length) return;
  const records = parts.map((chunk, i) => ({
    recordType: PASS_TYPE,
    recordName: "newsimg." + recordName + "." + i,
    fields: {
      kind: { value: "newsimg" },
      studentName: { value: recordName },
      destination: { value: chunk },
      dates: { value: String(parts.length) }
    }
  }));
  const db = cloudDb();
  try {
    if (db && typeof db.newRecordsBatch === "function") {
      const batch = db.newRecordsBatch();
      records.forEach((record) => { batch.create(record); });
      const result = await batch.commit();
      if (!(result && result.hasErrors)) return;
    }
  } catch (_) {}
  try {
    if (db && typeof db.saveRecords === "function") {
      const result = await db.saveRecords(records);
      if (!(result && result.hasErrors)) return;
    }
  } catch (_) {}
  for (const record of records) {
    try { await createPassRecord(record, "create"); } catch (_) {
      try { await restModifySchool(record, "create"); } catch (_) {}
    }
  }
}
function newsItemFromPass(record) {
  const created = record && record.created && typeof record.created.timestamp === "number" ? record.created.timestamp : newsStamp(record);
  return {
    id: record.recordName || "",
    image: newsImageFromRecord(record),
    title: fieldValue(record, "studentName") || newsHeading(record),
    subtitle: fieldValue(record, "destination") || newsBody(record),
    published: Number(fieldValue(record, "published") || created || 1),
    stamp: created || newsStamp(record)
  };
}
async function loadPostedNewsRecords() {
  const found = [];
  const remember = (record) => {
    if (!record) return;
    const kind = String(fieldValue(record, "kind") || "").toLowerCase();
    const name = String(record.recordName || "").toLowerCase();
    if (kind !== "news" && name.indexOf("news.") !== 0) return;
    if (!(fieldValue(record, "studentName") || fieldValue(record, "titleEN"))) return;
    found.push(record);
  };
  try {
    const manifest = (await fetchByNames(cloudDb(), [NEWS_MANIFEST]))[0];
    let extra = [];
    try { extra = JSON.parse(localStorage.getItem("whsNewsIds") || "[]"); } catch (_) {}
    const ids = parsePassIDs(fieldValue(manifest, "passIDs")).concat(Array.isArray(extra) ? extra : []);
    (await fetchByNames(cloudDb(), ids)).forEach(remember);
    const iconNames = found.flatMap((record) => newsIconChunkNames(record.recordName));
    applyNewsIcons(found, await fetchByNames(cloudDb(), iconNames));
  } catch (_) {}
  return found;
}
async function loadNewsFeed() {
  const bundled = bundledNewsItems();
  const alreadyShown = window._newsItems && Object.keys(window._newsItems).length;
  if (!alreadyShown) paintNews(bundled);
  let remote = [];
  try { await ensureCloud(); } catch (_) {}
  try {
    remote = await loadPostedNewsRecords();
  } catch (_) {}
  try {
    const queried = (await restQuery(NEWS_TYPE, 100)).filter((record) => Number(fieldValue(record, "published") || 1) !== 0);
    remote = remote.concat(queried);
  } catch (_) {}
  const remoteItems = remote.map((record) => {
    if (String(fieldValue(record, "kind") || "").toLowerCase() === "news" || String(record.recordName || "").toLowerCase().indexOf("news.") === 0) {
      return newsItemFromPass(record);
    }
    return {
      id: record.recordName || "",
      image: newsImageFromRecord(record) || fieldValue(record, "image"),
      title: newsHeading(record),
      subtitle: newsBody(record),
      published: Number(fieldValue(record, "published") || 1),
      stamp: newsStamp(record)
    };
  }).filter((item) => item.id && (item.title || item.subtitle));
  const seen = new Set();
  const unique = [];
  remoteItems.concat(bundled).forEach((item) => {
    if (seen.has(item.id)) return;
    seen.add(item.id);
    unique.push(item);
  });
  unique.sort((a, b) => (b.published - a.published) || (b.stamp - a.stamp));
  paintNews(unique);
}
async function loadNews() {
  const c = t();
  document.getElementById("view-news").innerHTML = newsPage(`<div class="t">${c.newsFeed}</div>`);
  await loadNewsFeed();
}
function dataUrlToFile(dataUrl, name) {
  const parts = String(dataUrl || "").split(",");
  const raw = parts.length > 1 ? parts[1] : "";
  const binary = atob(raw);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i += 1) bytes[i] = binary.charCodeAt(i);
  return new File([bytes], name || "news.jpg", { type: "image/jpeg" });
}
function setNewsComposeError(message) {
  const node = document.getElementById("newsComposeError");
  if (node) node.textContent = message || "";
}
function handleNewsImage(file) {
  if (!file) return;
  window._newsDraftFile = file;
  const preview = document.getElementById("newsImagePreview");
  if (!preview) return;
  preview.src = URL.createObjectURL(file);
  preview.classList.remove("hidden");
}
async function ckCreateNews(record) {
  requireCloudWrite();
  const db = cloudDb();
  if (!db) return null;
  const fail = (result) => {
    if (result && result.hasErrors) {
      throw cloudRecordError(result, result.errors && result.errors[0] || result.records && result.records[0]);
    }
    const row = result && result.records && result.records[0];
    if (row && (row.serverErrorCode || row.error)) throw cloudRecordError(result, row);
    return row || result;
  };
  if (typeof db.newRecordsBatch === "function") {
    return fail(await db.newRecordsBatch().create(record).commit());
  }
  if (typeof db.saveRecords === "function") {
    return fail(await db.saveRecords([record]));
  }
  return null;
}
function newsPassFields(title, story, imageValue, imageParts) {
  const fields = {
    kind: { value: "news" },
    studentName: { value: title },
    destination: { value: story },
    teacherName: { value: (profile && (profile.displayName || profile.firstName)) || "WHS" },
    dates: { value: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) }
  };
  if (imageValue) fields.signature = { value: imageValue };
  if (imageParts && imageParts.length) fields.imageParts = { value: imageParts };
  return fields;
}
async function saveNewsManifest(ids, existing) {
  const record = {
    recordType: PASS_TYPE,
    recordName: NEWS_MANIFEST,
    fields: {
      kind: { value: "news" },
      passIDs: { value: (ids || []).join(",") }
    }
  };
  if (existing && existing.recordChangeTag) record.recordChangeTag = existing.recordChangeTag;
  const ops = existing ? ["forceUpdate", "update", "create"] : ["create", "forceUpdate"];
  for (const op of ops) {
    try {
      if (await createPassRecord(record, op)) return;
    } catch (_) {}
    try {
      if (await restModifySchool(record, op)) return;
    } catch (_) {}
  }
}
function rememberNewsId(id) {
  const unique = String(id || "").trim();
  if (!unique) return;
  try {
    const saved = JSON.parse(localStorage.getItem("whsNewsIds") || "[]");
    const next = [unique].concat((Array.isArray(saved) ? saved : []).filter((item) => item !== unique)).slice(0, 100);
    localStorage.setItem("whsNewsIds", JSON.stringify(next));
  } catch (_) {}
}
async function addNewsToManifest(id) {
  const unique = String(id || "").trim();
  if (!unique) return;
  let existing = null;
  try { existing = (await fetchByNames(cloudDb(), [NEWS_MANIFEST]))[0] || null; } catch (_) {}
  const ids = parsePassIDs(existing && fieldValue(existing, "passIDs"));
  if (ids.indexOf(unique) === -1) ids.unshift(unique);
  await saveNewsManifest(ids, existing);
}
async function removeNewsFromManifest(id) {
  const unique = String(id || "").trim();
  if (!unique) return;
  let existing = null;
  try { existing = (await fetchByNames(cloudDb(), [NEWS_MANIFEST]))[0] || null; } catch (_) {}
  const ids = parsePassIDs(existing && fieldValue(existing, "passIDs")).filter((item) => item !== unique);
  await saveNewsManifest(ids, existing);
}
async function publishNewsPost() {
  if (!canPostNews()) return;
  const c = t();
  const title = String((document.getElementById("newsTitle") || {}).value || "").trim();
  const story = String((document.getElementById("newsStory") || {}).value || "").trim();
  const rawFile = window._newsDraftFile;
  if (!title || !story || !rawFile) {
    setNewsComposeError(c.newsNeedFields);
    return;
  }
  const button = document.getElementById("newsPublishBtn");
  if (button) button.disabled = true;
  setNewsComposeError("");
  const renewWindow = (window._appleReady && ckWebAuthToken() && !window._appleNeedsRenew) ? null : window.open("", "whsAppleRenew", "width=640,height=720");
  window._pendingNewsPost = false;
  try {
    await ensureCloud();
    watchAppleSignIn();
    if (!(await ensureSavedStaffSession(renewWindow))) {
      window._pendingNewsPost = true;
      throw Object.assign(new Error("APPLE"), { apple: true });
    }
    const role = await requireEnrolledStaff();
    if (role !== "administrator") throw Object.assign(new Error("FAIL"), { reason: "staff" });
    const recordName = "news." + ((crypto.randomUUID && crypto.randomUUID()) || String(Date.now()));
    const draft = { recordType: PASS_TYPE, recordName, fields: newsPassFields(title, story) };
    let saved = null;
    try {
      saved = await createPassRecord(draft, "create");
    } catch (error) {
      const auth = error && (error.apple || isAuthError(error));
      if (auth) {
        window._appleReady = false;
        window._appleNeedsRenew = true;
        const again = renewWindow && !renewWindow.closed ? renewWindow : window.open("", "whsAppleRenew", "width=640,height=720");
        if (!(await renewAppleForSend(again))) throw error;
        saved = await createPassRecord(draft, "create");
      } else {
        try { saved = await restModifySchool(draft, "create"); } catch (_) { throw error; }
      }
    }
    if (!saved) {
      try {
        saved = (await fetchByNames(cloudDb(), [recordName]))[0] || null;
      } catch (_) {}
    }
    if (!saved) throw Object.assign(new Error("FAIL"), { reason: "create" });
    rememberNewsId(recordName);
    await addNewsToManifest(recordName);
    try {
      await attachNewsIcon(recordName, chunkNewsImage(await compressNewsIcon(rawFile)));
    } catch (_) {}
    window._pendingNewsPost = false;
    window._newsDraftFile = null;
    if (view === "posts") {
      const titleEl = document.getElementById("newsTitle");
      const storyEl = document.getElementById("newsStory");
      const preview = document.getElementById("newsImagePreview");
      const ok = document.getElementById("newsComposeOk");
      if (titleEl) titleEl.value = "";
      if (storyEl) storyEl.value = "";
      if (preview) {
        preview.removeAttribute("src");
        preview.classList.add("hidden");
      }
      if (ok) {
        ok.textContent = c.newsPublished;
        ok.classList.remove("hidden");
      }
      setNewsComposeError("");
      await loadNewsFeed();
    } else {
      closeSheet();
      await loadNewsFeed();
    }
  } catch (error) {
    const apple = (error && error.apple) || error.message === "APPLE" || isAuthError(error);
    setNewsComposeError(apple ? c.newsPublishNeedApple : c.newsPublishFail);
    if (!document.getElementById("newsComposeError")) {
      openSheet(`
        <div class="card-title"><b>${apple ? c.newsPublishNeedApple : c.newsPublishFail}</b><button type="button" data-action="closeSheet">${c.close}</button></div>`);
    }
  } finally {
    const again = document.getElementById("newsPublishBtn");
    if (again) again.disabled = false;
  }
}
