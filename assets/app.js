(() => {
  "use strict";
  const exam = window.EMILY_TEST;
  const root = document.getElementById("test-root");
  if (!exam || !root) return;
  const endpoint = window.EMILY_SUBMISSION_ENDPOINT || "";
  const draftKey = `emily:diagnostic:draft:${exam.id}`;
  const resultKey = `emily:diagnostic:result:${exam.id}`;
  const attemptKey = `emily:diagnostic:attempt:${exam.id}`;
  const playKey = `emily:diagnostic:plays:${exam.id}`;
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let waitingNonce = "";
  let receiptTimer = 0;

  const uuid = () => crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
  const attemptId = localStorage.getItem(attemptKey) || `attempt-${uuid().toLowerCase()}`;
  localStorage.setItem(attemptKey, attemptId);

  function allItems() {
    return exam.sections.flatMap((section) => section.items || (section.tasks || []).flatMap((task) => task.items));
  }
  const items = allItems();

  function itemMarkup(item) {
    const input = item.type === "mc"
      ? `<div class="choices">${item.options.map((option, index) => `<label><input type="radio" name="${item.id}" value="${escapeAttribute(option)}"><span class="choice-letter">${letters[index]}</span><span>${escapeHtml(option)}</span></label>`).join("")}</div>`
      : `<label class="short-answer"><span>Your answer</span><input type="text" name="${item.id}" maxlength="120" autocomplete="off" spellcheck="false"></label>`;
    return `<fieldset class="question" data-question="${item.id}"><legend><span>${item.id}</span>${escapeHtml(item.prompt)}</legend>${input}<div class="feedback" id="feedback-${item.id}" hidden></div></fieldset>`;
  }
  function taskMarkup(task, sectionName, taskIndex) {
    const passage = task.passage ? `<div class="passage">${task.passage}</div>` : "";
    const audio = task.audio ? `<div class="audio-card"><strong>Recording ${taskIndex + 1}</strong><audio controls preload="metadata" src="${task.audio}" data-audio-id="${sectionName}-${taskIndex}">Your browser does not support audio.</audio><p class="audio-state" data-audio-state="${sectionName}-${taskIndex}">0 / 2 plays started</p><details class="credit"><summary>Recording credit</summary><p><a href="${task.credit.url}" target="_blank" rel="license noopener">${escapeHtml(task.credit.title)}</a> · ${escapeHtml(task.credit.creator)}</p></details></div>` : "";
    return `<article class="task"><header><h3>${escapeHtml(task.title)}</h3><p>${escapeHtml(task.instructions)}</p></header>${passage}${audio}${task.items.map(itemMarkup).join("")}</article>`;
  }
  function sectionMarkup(section) {
    const content = section.items ? section.items.map(itemMarkup).join("") : section.tasks.map((task, index) => taskMarkup(task, section.name, index)).join("");
    const instructions = section.instructions ? `<p>${escapeHtml(section.instructions)}</p>` : "";
    return `<section class="section-card" data-section="${section.name}"><header class="section-head"><h2>${escapeHtml(section.title)} <span class="small">12 marks</span></h2>${instructions}</header>${content}</section>`;
  }
  root.innerHTML = `<div class="exam-nav"><a href="../../">← Back to both tests</a><span class="small">Emily English Diagnostic</span></div><header class="exam-hero"><p class="eyebrow">${exam.level} DIAGNOSTIC</p><h1>${escapeHtml(exam.title)}</h1><p>${escapeHtml(exam.subtitle)}</p><div class="exam-meta"><span>48 questions</span><span>about 55 minutes</span><span>two plays per recording</span><span>one final submission</span></div></header><div class="instructions"><strong>完成方式</strong>按顺序完成四部分。Listening 每段最多播放两遍。页面会在本机自动保存草稿；只有点击最后的“正式提交”才会记录并批改。提交后不能修改本次答案。</div><div class="progress-bar"><strong id="progress-count">0 / ${exam.total} answered</strong><span id="draft-state" class="small">Draft is saved on this device</span><div class="progress-track"><div class="progress-fill" id="progress-fill"></div></div></div><form id="exam-form">${exam.sections.map(sectionMarkup).join("")}</form><section class="result-panel" id="result-panel" hidden></section><div class="submit-zone"><div><strong>Ready to finish?</strong><p id="submit-status" aria-live="polite">Check your answers, then submit once.</p></div><button class="button button-primary" type="button" id="submit-open">正式提交并查看订正</button></div><dialog id="submit-dialog"><div class="dialog-body"><h2>正式提交？</h2><p id="dialog-summary"></p><p>提交成功后，本次答案会锁定，并立即显示分数和逐题订正。</p><div class="dialog-actions"><button class="button button-secondary" type="button" id="submit-cancel">再检查一下</button><button class="button button-primary" type="button" id="submit-confirm">确认提交</button></div></div></dialog><iframe class="receipt-frame" name="receipt-frame" id="receipt-frame" title="Submission receipt"></iframe><form id="receipt-form" method="post" target="receipt-frame" hidden><input type="hidden" name="payload" id="receipt-payload"></form>`;

  const form = document.getElementById("exam-form");
  const fields = [...form.querySelectorAll("input[name]")];
  const status = document.getElementById("submit-status");
  const submitButton = document.getElementById("submit-open");
  const dialog = document.getElementById("submit-dialog");

  function escapeHtml(value) { return String(value).replace(/[&<>"']/g, (c) => ({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;"}[c])); }
  function escapeAttribute(value) { return escapeHtml(value).replace(/`/g, "&#96;"); }
  function answers() {
    return Object.fromEntries(items.map((item) => {
      const group = form.elements[item.id];
      const value = group instanceof RadioNodeList ? group.value : group.value.trim();
      return [item.id, value || ""];
    }));
  }
  function answeredCount(values = answers()) { return Object.values(values).filter((value) => String(value).trim()).length; }
  const itemById = new Map(items.map((item) => [item.id, item]));
  function percent(value, total) {
    if (!total) return "—";
    return `${(Number(value) / Number(total) * 100).toFixed(1)}%`;
  }
  function displayAnswer(itemId, value) {
    const text = String(value || "").trim();
    if (!text) return "未作答";
    const item = itemById.get(itemId);
    if (item && item.type === "mc" && Array.isArray(item.options)) {
      const index = item.options.indexOf(text);
      if (index >= 0) return `${letters[index]}. ${text}`;
    }
    return text;
  }
  function updateProgress(values = answers()) {
    const count = answeredCount(values);
    document.getElementById("progress-count").textContent = `${count} / ${exam.total} answered`;
    document.getElementById("progress-fill").style.width = `${count / exam.total * 100}%`;
  }
  function saveDraft() {
    const values = answers();
    localStorage.setItem(draftKey, JSON.stringify({ answers: values, savedAt: new Date().toISOString() }));
    document.getElementById("draft-state").textContent = `Draft saved · ${new Date().toLocaleTimeString([], {hour:"2-digit",minute:"2-digit"})}`;
    updateProgress(values);
  }
  function restoreDraft() {
    try {
      const saved = JSON.parse(localStorage.getItem(draftKey) || "null");
      if (!saved || !saved.answers) return;
      Object.entries(saved.answers).forEach(([id, value]) => {
        const group = form.elements[id];
        if (!group) return;
        if (group instanceof RadioNodeList) [...group].forEach((radio) => { radio.checked = radio.value === value; });
        else group.value = value;
      });
      document.getElementById("draft-state").textContent = "Draft restored from this device";
    } catch (_) {}
  }
  let saveTimer = 0;
  form.addEventListener("input", () => { clearTimeout(saveTimer); updateProgress(); saveTimer = setTimeout(saveDraft, 250); });
  form.addEventListener("change", saveDraft);

  function setupAudioLimits() {
    let plays = {};
    try { plays = JSON.parse(localStorage.getItem(playKey) || "{}"); } catch (_) {}
    document.querySelectorAll("audio[data-audio-id]").forEach((audio) => {
      const id = audio.dataset.audioId;
      const label = document.querySelector(`[data-audio-state="${id}"]`);
      const refresh = () => { label.textContent = `${plays[id] || 0} / 2 plays started`; };
      refresh();
      audio.addEventListener("play", () => {
        if (audio.currentTime > .8) return;
        if ((plays[id] || 0) >= 2) {
          audio.pause(); audio.currentTime = 0; label.textContent = "Two plays completed"; return;
        }
        plays[id] = (plays[id] || 0) + 1;
        localStorage.setItem(playKey, JSON.stringify(plays)); refresh();
      });
    });
  }

  submitButton.addEventListener("click", () => {
    const remaining = exam.total - answeredCount();
    document.getElementById("dialog-summary").textContent = remaining ? `还有 ${remaining} 题未作答；未作答题计 0 分。` : "48 题均已作答。";
    dialog.showModal();
  });
  document.getElementById("submit-cancel").addEventListener("click", () => dialog.close());
  document.getElementById("submit-confirm").addEventListener("click", () => { dialog.close(); submitFinal(); });

  function submitFinal() {
    if (!endpoint || endpoint.includes("__SUBMISSION_ENDPOINT__")) {
      status.textContent = "提交服务尚未连接；草稿仍安全保存在本机。"; return;
    }
    submitButton.disabled = true;
    status.textContent = "正在提交并批改…";
    waitingNonce = `nonce-${uuid().toLowerCase()}`;
    const payload = {
      assignmentId: exam.id,
      attemptId,
      nonce: waitingNonce,
      student: "Emily",
      environment: /^(localhost|127\.0\.0\.1)$/.test(window.location.hostname) ? "qa" : "production",
      answers: answers()
    };
    const receiptForm = document.getElementById("receipt-form");
    receiptForm.action = endpoint;
    document.getElementById("receipt-payload").value = JSON.stringify(payload);
    receiptForm.submit();
    clearTimeout(receiptTimer);
    receiptTimer = setTimeout(() => {
      if (!waitingNonce) return;
      waitingNonce = ""; submitButton.disabled = false;
      status.textContent = "暂时没有收到提交回执。草稿仍在本机，请检查网络后重试。";
    }, 35000);
  }

  window.addEventListener("message", (event) => {
    const allowed = event.origin === "https://script.google.com" || event.origin === "https://script.googleusercontent.com" || /^https:\/\/[a-z0-9-]+\.googleusercontent\.com$/i.test(event.origin);
    const result = event.data;
    if (!allowed || !result || result.type !== "emily-diagnostic-result" || result.assignmentId !== exam.id || result.nonce !== waitingNonce) return;
    clearTimeout(receiptTimer); waitingNonce = "";
    if (!result.ok) { submitButton.disabled = false; status.textContent = result.message || "提交失败；草稿仍在本机。"; return; }
    localStorage.setItem(resultKey, JSON.stringify(result));
    renderResult(result);
  });

  function renderResult(result) {
    const details = Array.isArray(result.details) ? result.details : [];
    const answered = details.filter((detail) => String(detail.submitted || "").trim()).length;
    const unanswered = Math.max(0, Number(result.total) - answered);
    const reviewItems = details.filter((detail) => !detail.correct);
    const reviewMarkup = reviewItems.length
      ? `<section class="mistake-review" aria-labelledby="mistake-review-title"><h3 id="mistake-review-title">错题批改</h3><p class="small">共 ${reviewItems.length} 题未得分，其中 ${unanswered} 题未作答。选择题显示所选项和正确项。</p><div class="mistake-list">${reviewItems.map((detail) => {
          const item = itemById.get(detail.id);
          const isChoice = item && item.type === "mc";
          return `<article class="mistake-card"><div class="mistake-heading"><strong>${escapeHtml(detail.id)}</strong><span>${escapeHtml(detail.section)}</span></div><p class="mistake-prompt">${escapeHtml(item ? item.prompt : detail.id)}</p><div class="answer-comparison"><div><span>${isChoice ? "你的选择" : "你的作答"}</span><strong>${escapeHtml(displayAnswer(detail.id, detail.submitted))}</strong></div><div><span>${isChoice ? "正确选项" : "参考答案"}</span><strong>${escapeHtml(displayAnswer(detail.id, detail.answer))}</strong></div></div><p class="mistake-explanation"><strong>解析：</strong>${escapeHtml(detail.explanation)}</p></article>`;
        }).join("")}</div></section>`
      : `<section class="mistake-review"><h3>错题批改</h3><p>本次没有错题或未作答题。</p></section>`;
    document.body.classList.add("submitted");
    fields.forEach((field) => { field.disabled = true; });
    document.querySelectorAll("audio").forEach((audio) => { audio.pause(); });
    submitButton.disabled = true;
    status.textContent = result.duplicate ? "已恢复原提交回执。" : "提交成功，已完成自动批改。";
    const panel = document.getElementById("result-panel");
    panel.hidden = false;
    panel.innerHTML = `<p class="eyebrow">SUBMISSION RECEIPT</p><h2>${result.score} / ${result.total}</h2><div class="result-overview"><div><strong>${percent(result.score, result.total)}</strong><span>总得分率</span></div><div><strong>${percent(result.score, answered)}</strong><span>已作答正确率</span></div><div><strong>${answered} / ${result.total}</strong><span>已作答</span></div><div><strong>${unanswered}</strong><span>未作答</span></div></div><p class="interpretation">${escapeHtml(result.interpretation)}</p><h3 class="result-subheading">分项得分</h3><div class="result-grid">${["Grammar","Vocabulary","Reading","Listening"].map((name) => `<div><strong>${result.sectionScores[name]}/12</strong><span>${name} · ${percent(result.sectionScores[name], 12)}</span></div>`).join("")}</div><p class="small">Receipt: ${new Date(result.receiptTime).toLocaleString()} · Attempt ${escapeHtml(result.attemptId.slice(-8))}</p><p>总得分率按全部题目计算；已作答正确率只计算已经填写的题目。一次摸底不等于等级证书，Lucy 会结合四部分表现决定下一步。</p>${reviewMarkup}<button class="button button-secondary" type="button" id="print-result">Print / Save PDF</button>`;
    document.getElementById("print-result").addEventListener("click", () => window.print());
    result.details.forEach((detail) => {
      const box = document.querySelector(`[data-question="${detail.id}"]`);
      const feedback = document.getElementById(`feedback-${detail.id}`);
      if (!box || !feedback) return;
      box.classList.add(detail.correct ? "correct" : "incorrect");
      feedback.hidden = false;
      const item = itemById.get(detail.id);
      const isChoice = item && item.type === "mc";
      const resultLabel = detail.correct ? "✓ 正确" : (String(detail.submitted || "").trim() ? "✗ 错误" : "— 未作答");
      feedback.innerHTML = `<p><strong>${resultLabel}</strong></p><p>${isChoice ? "你的选择" : "你的作答"}：${escapeHtml(displayAnswer(detail.id, detail.submitted))}</p>${detail.correct ? "" : `<p>${isChoice ? "正确选项" : "参考答案"}：${escapeHtml(displayAnswer(detail.id, detail.answer))}</p><p><strong>解析：</strong>${escapeHtml(detail.explanation)}</p>`}`;
    });
    panel.scrollIntoView({behavior:"smooth",block:"start"});
  }

  restoreDraft(); updateProgress(); setupAudioLimits();
  try {
    const stored = JSON.parse(localStorage.getItem(resultKey) || "null");
    if (stored && stored.assignmentId === exam.id) renderResult(stored);
  } catch (_) {}
})();
