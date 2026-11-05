// WHS WebView: Issuing passes and student passes.
// Files load in order (see index.html) and share one global scope.
// Teachers' browsers used to keep student codes to finish locking older passes. That's no longer
// needed, so clear anything an earlier version saved.
try { localStorage.removeItem("whsPassWebKeys"); } catch (_) {}
function dropPassFieldCache() {
  try {
    const drop = [];
    for (let i = 0; i < localStorage.length; i += 1) {
      const name = localStorage.key(i);
      if (name && name.indexOf("whsPassCache:") === 0) drop.push(name);
    }
    drop.forEach((name) => localStorage.removeItem(name));
  } catch (_) {}
}
function writePassCache() { dropPassFieldCache(); }
function applyPassCache() {}
dropPassFieldCache();
async function redactPassImages(id, sealedSignature) {
  let heads = [];
  try { heads = await restLookupExact(["passimg." + id + ".0"]); } catch (_) { return; }
  const head = heads[0];
  if (!head) return;
  const count = Math.min(200, Math.max(1, parseInt(fieldValue(head, "dates"), 10) || 1));
  for (let i = 0; i < count; i += 1) {
    const sealed = i === 0 && String(sealedSignature || "").indexOf("whs1.") === 0;
    const record = {
      recordType: PASS_TYPE,
      recordName: "passimg." + id + "." + i,
      fields: {
        kind: { value: "passimg" },
        studentName: { value: id },
        destination: { value: sealed ? sealedSignature : "whs0." },
        dates: { value: sealed ? "1" : "0" }
      }
    };
    try { await restModify(record, "forceUpdate"); } catch (_) {}
  }
}
async function revealStudentPasses(records, code) {
  const key = normalizeCode(code);
  if (key.length !== 10) return;
  for (const record of records || []) {
    for (const field of ["studentName", "destination", "dates", "teacherName"]) {
      const raw = String(fieldValue(record, field) || "");
      if (raw.indexOf("whs1.") !== 0) continue;
      const open = await openSeal(key, raw);
      if (!open) continue;
      record.fields = record.fields || {};
      record.fields[field] = { value: open };
    }
  }
}
async function readAsSignedIn(name) {
  if (!ckWebAuthToken() || !name) return null;
  try {
    const response = await fetch(restPublicUrl("records/lookup", false), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ records: [{ recordName: name }] })
    });
    const payload = await response.json();
    const wanted = String(name).toLowerCase();
    return recordsFrom(payload).filter(usableRecord).find((item) => String(item.recordName || "").toLowerCase() === wanted) || null;
  } catch (_) {
    return null;
  }
}
async function readExact(name) {
  try {
    if (ckWebAuthToken()) {
      const signed = await readAsSignedIn(name);
      if (signed) return signed;
    }
    return (await restLookupExact([name]))[0] || null;
  } catch (_) { return null; }
}
function indexIDs(record) {
  return parsePassIDs(record && fieldValue(record, "passIDs"));
}
async function campusHiddenFromWorld(name) {
  const token = schoolToken();
  if (!token) return false;
  try {
    const response = await fetch(restPublicUrl("records/lookup", true), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ records: [{ recordName: name }] })
    });
    const payload = await response.json();
    const row = (payload.records || []).find((item) => String(item.recordName || "").toLowerCase() === String(name || "").toLowerCase());
    if (!row) return false;
    const err = String(row.serverErrorCode || row.reason || "").toUpperCase();
    if (/NOT_FOUND|ACCESS_DENIED|PERMISSION|AUTHENTICATION|UNAUTHORIZED/.test(err)) return true;
    if (fieldValue(row, "kind") || fieldValue(row, "passIDs")) return false;
    return !!err;
  } catch (_) {
    return false;
  }
}
async function writeIndexRecord(type, name, kind, ids, merge) {
  const staffOnly = type === CAMPUS_TYPE;
  for (let attempt = 0; attempt < 6; attempt += 1) {
    const existing = await readExact(name);
    const record = {
      recordType: type,
      recordName: name,
      fields: {
        kind: { value: kind },
        passIDs: { value: (merge ? [...new Set((ids || []).concat(indexIDs(existing)))].slice(0, 500) : (ids || [])).join(",") }
      }
    };
    if (existing && existing.recordChangeTag) record.recordChangeTag = existing.recordChangeTag;
    try {
      if (existing && existing.recordChangeTag) {
        try {
          await restModify(record, "update");
          return true;
        } catch (error) {
          if (isConflictError(error)) continue;
        }
      }
      if (!staffOnly) {
        try {
          await restModifySchool(record, existing ? "forceUpdate" : "create");
          return true;
        } catch (error) {
          if (isConflictError(error)) continue;
        }
      }
      try {
        await restModify(record, existing ? "forceUpdate" : "create");
        return true;
      } catch (error) {
        if (isConflictError(error)) continue;
      }
      if (await ckCreateRecords([record])) return true;
    } catch (error) {
      if (isConflictError(error) && attempt < 5) continue;
      return false;
    }
  }
  return false;
}
async function storePassIndex(privateName, publicName, kind, ids, merge) {
  const capped = (ids || []).slice(0, 500);
  const privateOK = await writeIndexRecord(CAMPUS_TYPE, privateName, kind, capped, !!merge);
  const hide = privateOK && await campusHiddenFromWorld(privateName);
  const publicIDs = hide ? [] : capped;
  if (!publicIDs.length) {
    const existing = await readExact(publicName);
    if (!existing || !indexIDs(existing).length) return privateOK;
  }
  await writeIndexRecord(PASS_TYPE, publicName, kind, publicIDs, hide ? false : !!merge);
  return privateOK;
}
// Each student has 160 inbox slots, named from their derived tag (see deriveCodeKeys).
function privateInboxNames(tag) {
  const code = String(tag || "").trim().toLowerCase();
  if (code.length !== 32) return [];
  const names = [];
  for (let i = 0; i < 160; i += 1) names.push("inbox.v2." + code + "." + i);
  return names;
}
async function studentInboxNames(key) {
  return privateInboxNames(await privateCodeTag(key));
}
async function deliverPassToInbox(passId, webCode, studentName) {
  const key = normalizeCode(webCode);
  const id = String(passId || "").trim();
  if (key.length !== 10 || !id) return false;
  const tag = await privateCodeTag(key);
  const names = privateInboxNames(tag);
  const known = names;
  let existing = [];
  try { existing = await restLookupExact(known); } catch (_) { existing = []; }
  const taken = new Set(existing.map((record) => String(record.recordName || "").toLowerCase()));
  const already = existing.some((record) => parsePassIDs(fieldValue(record, "passIDs")).some((item) => item.toLowerCase() === id.toLowerCase()));
  if (already) return true;
  const sealedName = await sealText(key, studentName || "");
  const fields = {
    kind: { value: "inbox" },
    passIDs: { value: id },
    destination: { value: tag },
    studentName: { value: sealedName }
  };
  for (const name of names) {
    if (taken.has(name.toLowerCase())) continue;
    try {
      await createPassRecord({ recordType: PASS_TYPE, recordName: name, fields }, "create");
      return true;
    } catch (error) {
      taken.add(name.toLowerCase());
      if (isAuthError(error)) throw error;
    }
  }
  const reuse = names.find((name) => taken.has(name.toLowerCase())) || names[0];
  if (!reuse) return false;
  try {
    await createPassRecord({ recordType: PASS_TYPE, recordName: reuse, fields }, "forceUpdate");
    return true;
  } catch (error) {
    if (isAuthError(error)) throw error;
  }
  return false;
}
async function attachPassToStudent(passId, webCode, studentName) {
  const key = normalizeCode(webCode);
  if (key.length !== 10) throw Object.assign(new Error("CODE"), { code: "CODE" });
  await deliverPassToInbox(passId, key, studentName);
  let profileRec = null;
  const profileName = await profileRecordName(key);
  try { profileRec = (await restLookupExact([profileName]))[0] || null; } catch (_) {}
  const role = normalizeRole(fieldValue(profileRec, "role"));
  if (profileRec && role && role !== "student" && role !== "guest") {
    throw Object.assign(new Error("CODE"), { code: "CODE" });
  }
  const name = studentName || fieldValue(profileRec, "displayName") || fieldValue(profileRec, "firstName") || "";
  if (profileRec) {
    const ids = capNewestIDs(parsePassIDs(fieldValue(profileRec, "passIDs")), passId, 400);
    const rec = {
      recordType: "WHSWebProfile",
      recordName: profileName,
      fields: { passIDs: { value: ids.join(",") } }
    };
    if (profileRec.recordChangeTag) rec.recordChangeTag = profileRec.recordChangeTag;
    try { await restModifySchool(rec, "forceUpdate"); } catch (_) {
      try { await ckCreateRecords([rec]); } catch (_) {
        try { await restModify(rec, "update"); } catch (_) {}
      }
    }
  }
  const linkName = await webPassLinkName(key);
  let link = null;
  try { link = (await fetchByNames(cloudDb(), [linkName]))[0] || null; } catch (_) {}
  const ids = capNewestIDs(parsePassIDs(fieldValue(link, "passIDs")), passId, 400);
  const record = {
    recordType: PASS_TYPE,
    recordName: linkName,
    fields: {
      kind: { value: "webpass" },
      passIDs: { value: ids.join(",") },
      studentName: { value: await sealText(key, name) }
    }
  };
  if (link && link.recordChangeTag) record.recordChangeTag = link.recordChangeTag;
  try {
    await restModifySchool(record, link ? "forceUpdate" : "create");
  } catch (_) {
    try {
      if (record.recordChangeTag) await ckCreateRecords([record]);
      else await ckCreateNews(record);
    } catch (_) {
      await restModify(record, link ? "forceUpdate" : "create");
    }
  }
}
async function attachPassIcon(recordName, file, onProgress, sealCode) {
  if (!recordName || !file) return;
  const note = (value) => { if (typeof onProgress === "function") onProgress(value); };
  try {
    const dataUrl = await compressPassSignature(file);
    note(0.12);
    const parts = chunkNewsImage(dataUrl, 200);
    const code = normalizeCode(sealCode || "");
    const records = [];
    for (let i = 0; i < parts.length; i += 1) {
      const chunk = code.length === 10 ? await sealText(code, parts[i]) : parts[i];
      records.push({
        recordType: PASS_TYPE,
        recordName: "passimg." + recordName + "." + i,
        fields: {
          kind: { value: "passimg" },
          studentName: { value: recordName },
          destination: { value: chunk },
          dates: { value: String(parts.length) }
        }
      });
    }
    const db = cloudDb();
    if (db && typeof db.newRecordsBatch === "function") {
      const batch = db.newRecordsBatch();
      records.forEach((record) => { batch.create(record); });
      note(0.35);
      const result = await batch.commit();
      if (!(result && result.hasErrors)) {
        note(1);
        return;
      }
    }
    for (let i = 0; i < records.length; i += 1) {
      try { await ckCreateNews(records[i]); } catch (_) {
        try { await restModify(records[i], "forceUpdate"); } catch (_) {
          try { await restModifySchool(records[i], "create"); } catch (_) {}
        }
      }
      note(0.35 + ((i + 1) / Math.max(records.length, 1)) * 0.65);
    }
    note(1);
  } catch (_) {}
}
function newPassRecordName() {
  if (crypto.randomUUID) return crypto.randomUUID().toUpperCase();
  const bytes = new Uint8Array(16);
  if (crypto.getRandomValues) crypto.getRandomValues(bytes);
  bytes[6] = (bytes[6] & 0x0f) | 0x40;
  bytes[8] = (bytes[8] & 0x3f) | 0x80;
  const hex = Array.from(bytes, (byte) => byte.toString(16).padStart(2, "0")).join("");
  return [hex.slice(0, 8), hex.slice(8, 12), hex.slice(12, 16), hex.slice(16, 20), hex.slice(20)].join("-").toUpperCase();
}
async function issuePassFromWeb() {
  if (!canIssuePass() || window._issuePassSending) return;
  const c = t();
  const studentName = String((document.getElementById("issueStudent") || {}).value || "").trim();
  const destination = String((document.getElementById("issueDestination") || {}).value || "").trim();
  const dates = String((document.getElementById("issueDates") || {}).value || "").trim();
  const webCode = String((document.getElementById("issueWebCode") || {}).value || "").trim();
  const signature = passSignatureFile();
  const kind = window._issuePassKind === "hallway" ? "hallway" : "flex";
  if (!studentName || !destination || !dates || !signature || normalizeCode(webCode).length !== 10) {
    setIssuePassError(c.issuePassNeedFields);
    return;
  }
  const renewWindow = window._appleReady && !window._appleNeedsRenew ? null : window.open("", "whsAppleRenew", "width=640,height=720");
  const sendTicket = {};
  window._issuePassSending = sendTicket;
  window._pendingIssuePass = false;
  const button = document.getElementById("issuePassBtn");
  if (button) button.disabled = true;
  setIssuePassError("");
  window._issuePassBusy = true;
  try {
    showWorkProgress(8, c.issuePassWorking, c.issuePassStepSave, "", false, "finishIssuePass");
    await ensureCloud();
    try { await restoreStaffCloudSession(); } catch (_) {}
    if (window._appleNeedsRenew || !ckWebAuthToken()) {
      showWorkProgress(12, c.issuePassWorking, c.issuePassNeedApple, "", false, "finishIssuePass");
      const renewed = await renewAppleForSend(renewWindow);
      if (!renewed) throw Object.assign(new Error("APPLE"), { apple: true });
    } else if (renewWindow && !renewWindow.closed) {
      renewWindow.close();
    }
    if (!ckWebAuthToken()) throw Object.assign(new Error("APPLE"), { apple: true });
    window._issuePassAwaitingApple = false;
    window._pendingIssuePass = false;
    keepAppleSessionFresh();
    await requireEnrolledStaff();
    const recordName = newPassRecordName();
    const teacherName = (profile && (profile.displayName || profile.firstName)) || "WHS";
    const code = normalizeCode(webCode);
    showWorkProgress(22, c.issuePassWorking, c.issuePassStepSave, "", false, "finishIssuePass");
    const dataUrl = await compressPassSignature(signature);
    const bodyOK = await saveStaffPassBody(recordName, { studentName, destination, dates, teacherName, kind, signature: dataUrl });
    if (!bodyOK) throw Object.assign(new Error("FAIL"), { reason: "body" });
    const fields = {
      kind: { value: kind },
      studentName: { value: await sealText(code, studentName) },
      destination: { value: await sealText(code, destination) },
      dates: { value: await sealText(code, dates) },
      teacherName: { value: await sealText(code, teacherName) }
    };
    if (["studentName", "destination", "dates", "teacherName"].some((key) => String(fields[key].value).indexOf("whs1.") !== 0)) {
      throw Object.assign(new Error("FAIL"), { reason: "seal" });
    }
    let saved = await createPassRecord({ recordType: PASS_TYPE, recordName, fields }, "create");
    if (!saved) {
      try { saved = (await fetchByNames(cloudDb(), [recordName]))[0] || null; } catch (_) {}
    }
    if (!saved) throw Object.assign(new Error("FAIL"), { reason: "create" });
    auditLog("issue_pass", [recordName]);
    showWorkProgress(40, c.issuePassWorking, c.issuePassStepSave, "", false, "finishIssuePass");
    showWorkProgress(55, c.issuePassWorking, c.issuePassStepStudent, "", false, "finishIssuePass");
    await attachPassToStudent(recordName, webCode, studentName);
    const sealIcon = true;
    showWorkProgress(68, c.issuePassWorking, c.issuePassStepSignature, "", false, "finishIssuePass");
    try {
      await attachPassIcon(recordName, signature, (part) => {
        showWorkProgress(68 + Math.round(part * 28), c.issuePassWorking, c.issuePassStepSignature, "", false, "finishIssuePass");
      }, sealIcon ? webCode : "");
    } catch (_) {}
    window._pendingIssuePass = false;
    window._appleReady = true;
    window._appleNeedsRenew = false;
    const ok = document.getElementById("issuePassOk");
    if (ok) {
      ok.textContent = c.issuePassDone;
      ok.classList.remove("hidden");
    }
    const student = document.getElementById("issueStudent");
    const dest = document.getElementById("issueDestination");
    const codeInput = document.getElementById("issueWebCode");
    if (student) student.value = "";
    if (dest) dest.value = "";
    if (codeInput) codeInput.value = "";
    bindPassSignaturePad();
    window._issuePassBusy = false;
    showWorkProgress(100, c.issuePassDone, "", "", true, "finishIssuePass");
  } catch (error) {
    window._issuePassBusy = false;
    const apple = (error && error.apple) || error.message === "APPLE" || isAuthError(error);
    window._pendingIssuePass = !!apple;
    if (apple && window._applePopupBlocked) showAppleStep();
    const staff = error && (error.staff || error.message === "STAFF");
    const badCode = error && (error.code === "CODE" || error.message === "CODE");
    const message = apple ? c.issuePassNeedApple : (staff ? c.issuePassNeedStaff : (badCode ? c.issuePassBadCode : c.issuePassFail));
    setIssuePassError(message);
    showWorkProgress(100, message, "", "", true, "finishIssuePass");
  } finally {
    if (window._issuePassSending === sendTicket) window._issuePassSending = null;
    const again = document.getElementById("issuePassBtn");
    if (again) again.disabled = false;
  }
}

function passSignatureSrc(record) {
  const icon = String((record && record._passIcon) || "");
  if (icon.indexOf("data:") === 0) return icon;
  const direct = String(fieldValue(record, "signature") || "");
  if (direct.indexOf("data:") === 0) return direct;
  return icon;
}
function passPaper(record, enlarged) {
  const c = t();
  const kind = fieldValue(record, "kind") === "flex" ? c.flex : c.hallway;
  const signature = passSignatureSrc(record);
  return `<article class="paper${enlarged ? " big" : ""}">
    <div class="paper-head"><img class="paper-w-img" src="./WHSBlockW.png" alt=""><div class="paper-title">${kind}</div></div>
    <div class="paper-field"><div class="lab">${c.studentNameLabel}</div><div class="val">${escapeHtml(fieldValue(record, "studentName"))}</div></div>
    <div class="paper-field"><div class="lab">${c.destinationLabel}</div><div class="val">${escapeHtml(fieldValue(record, "destination"))}</div></div>
    <div class="paper-field"><div class="lab">${c.datesLabel}</div><div class="val">${escapeHtml(fieldValue(record, "dates"))}</div></div>
    <div class="paper-sign">
      <div class="lab">${c.signature}</div>
      ${signature ? `<img alt="" src="${escapeHtml(signature)}">` : ""}
      <div class="s">${escapeHtml(fieldValue(record, "teacherName"))}</div>
    </div>
  </article>`;
}

function paintStudentPasses(usable) {
  const c = t();
  const list = document.getElementById("view-mypasses");
  const tileSub = document.getElementById("passTileSub");
  window._studentPassUsable = usable || [];
  if (tileSub) {
    if (!usable.length) tileSub.textContent = c.noneYet;
    else {
      const first = usable[0];
      const teacher = fieldValue(first, "teacherName");
      const dest = fieldValue(first, "destination");
      tileSub.textContent = dest ? `${teacher} · ${dest}` : (teacher || c.yourPasses);
    }
  }
  if (!(list && view === "mypasses")) return;
  if (!usable.length) {
    list.innerHTML = `${backBar()}<p class="muted">${c.noStudentPasses}</p>`;
    return;
  }
  window._passRecords = window._passRecords || {};
  list.innerHTML = backBar() + usable.map((record) => {
    const id = record.recordName || fieldValue(record, "recordName") || String(Math.random());
    window._passRecords[id] = record;
    return `<button type="button" class="action" style="margin-bottom:12px;max-width:560px;" data-action="openPass" data-pass-id="${escapeHtml(id)}">${passPaper(record, false)}</button>`;
  }).join("");
}
async function loadStudentPasses() {
  const c = t();
  const list = document.getElementById("view-mypasses");
  if (!canSeeOwnPasses()) return;
  if (window._studentPassUsable && window._studentPassUsable.length) paintStudentPasses(window._studentPassUsable);
  else if (list && view === "mypasses") list.innerHTML = `${backBar()}<p class="muted">${c.yourPasses}</p>`;
  if (!schoolToken()) {
    paintStudentPasses([]);
    return;
  }
  try { await ensureCloud(); } catch (_) {}
  try {
    const key = normalizeCode(profile.key);
    const profiles = await restLookupExact([await profileRecordName(key), await webPassLinkName(key)].concat(await studentInboxNames(key)));
    const ids = [...new Set(profiles.flatMap((record) => parsePassIDs(fieldValue(record, "passIDs"))))];
    const packed = await fetchByNames(cloudDb(), ids.concat(ids.flatMap((id) => [revokedName(id), tombstoneName(id)]), [CLEARED]));
    const byName = new Map(packed.map((record) => [String(record.recordName || "").toLowerCase(), record]));
    window._revokedPassIDs = collectRevokedIDs(packed);
    const usable = ids.map((id) => byName.get(id.toLowerCase())).filter((record) => {
      if (!(record && (fieldValue(record, "studentName") || fieldValue(record, "teacherName")))) return false;
      if (isPassMarker(record) || passIsRevoked(record)) return false;
      return true;
    });
    await revealStudentPasses(usable, key);
    applyPassCache(usable, key);
    paintStudentPasses(usable);
    await applyPassIcons(usable);
    writePassCache(key, usable);
    paintStudentPasses(usable);
  } catch (error) {
    if (list && view === "mypasses" && !(window._studentPassUsable && window._studentPassUsable.length)) {
      list.innerHTML = `${backBar()}<p class="error">${escapeHtml(error.message)}</p>`;
    }
  }
}

function openPass(id) {
  const record = window._passRecords && window._passRecords[id];
  if (!record) return;
  const c = t();
  const revoked = passIsRevoked(record);
  let extra = "";
  if (view === "passes" && canRevokePass()) {
    extra = revoked
      ? `<p class="muted" style="margin-top:12px;">${c.revokePassDone}</p>`
      : `<button class="ghost" type="button" data-action="askRevokePass" data-pass-id="${escapeHtml(id)}" style="width:100%;margin-top:12px;color:#B42318;">${c.revokePass}</button>`;
  }
  if (view === "passes" && canClearPassLog()) {
    extra += `<button class="ghost" type="button" data-action="askDeletePass" data-pass-id="${escapeHtml(id)}" style="width:100%;margin-top:8px;color:#B42318;">${c.deletePass}</button>`;
  }
  openSheet(`
    <div class="card-title"><button type="button" data-action="closeSheet">${c.close}</button></div>
    ${passPaper(record, true)}
    ${extra}`);
}

function newsHeading(record) {
  return lang === "es"
    ? (fieldValue(record, "titleES") || fieldValue(record, "titleEN"))
    : (fieldValue(record, "titleEN") || fieldValue(record, "titleES"));
}
function newsBody(record) {
  return lang === "es"
    ? (fieldValue(record, "subtitleES") || fieldValue(record, "subtitleEN"))
    : (fieldValue(record, "subtitleEN") || fieldValue(record, "subtitleES"));
}
function newsStamp(record) {
  const raw = record && record.fields && record.fields.postedAt && record.fields.postedAt.value;
  const value = typeof raw === "number" ? raw : Date.parse(fieldValue(record, "postedAt"));
  if (!value) return 0;
  return value;
}
