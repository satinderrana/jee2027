/* engine.js — shared flashcard engine for the JEE datacenter.
 * Loaded by deck.html (and readable by index.html for progress).
 * Exposes window.Flashcards. Pure of any single deck: init(slug, cards, meta) wires it up.
 */
(function () {
  "use strict";

  const STORE_KEY = "jee_flashcards_v1";
  const BOX_INTERVAL_DAYS = [0, 1, 3, 7, 14];
  const BOX_NAMES = ["New", "Day 1", "Day 3", "Day 7", "Locked"];
  const DAY_MS = 86400000;

  let slug = null;
  let cards = [];
  let meta = { title: "Flashcards" };
  let progress = {};   // cardIndex -> {box,due,seen}
  let queue = [];
  let current = null;
  let topicFilter = "all";

  /* ---------- storage (shared, namespaced by slug) ---------- */
  function readAll() {
    try {
      const raw = localStorage.getItem(STORE_KEY);
      if (!raw) return {};
      const d = JSON.parse(raw);
      return (d && typeof d === "object") ? d : {};
    } catch (e) { return {}; }
  }
  function writeAll(obj) { localStorage.setItem(STORE_KEY, JSON.stringify(obj)); }

  function defaultProgress() {
    const p = {};
    cards.forEach((_, i) => { p[i] = { box: 0, due: 0, seen: 0 }; });
    return p;
  }
  function loadProgress() {
    const all = readAll();
    const d = all[slug];
    if (!d) return defaultProgress();
    cards.forEach((_, i) => { if (!d[i]) d[i] = { box: 0, due: 0, seen: 0 }; });
    return d;
  }
  function saveProgress() {
    const all = readAll();
    all[slug] = progress;
    writeAll(all);
  }

  /* ---------- Leitner logic ---------- */
  function isDue(i) {
    const c = progress[i];
    return c.box === 0 || c.due <= Date.now();
  }
  function buildQueue() {
    const idx = cards.map((_, i) => i).filter(i =>
      (topicFilter === "all" || cards[i].t === topicFilter) && isDue(i)
    );
    for (let i = idx.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [idx[i], idx[j]] = [idx[j], idx[i]];
    }
    queue = idx;
  }
  function deckStats() {
    const s = { total: cards.length, due: 0, fresh: 0, learning: 0, locked: 0 };
    cards.forEach((_, i) => {
      const c = progress[i];
      if (c.box === 0) s.fresh++;
      else if (c.box >= BOX_INTERVAL_DAYS.length - 1) s.locked++;
      else s.learning++;
      if (isDue(i)) s.due++;
    });
    return s;
  }

  /* ---------- rendering ---------- */
  function $(id) { return document.getElementById(id); }
  function renderStats() {
    const s = deckStats();
    const el = $("stats");
    if (!el) return;
    el.innerHTML =
      `<div class="stat"><b>${s.total}</b> cards</div>` +
      `<div class="stat"><b>${s.due}</b> due now</div>` +
      `<div class="stat"><b>${s.fresh}</b> new</div>` +
      `<div class="stat"><b>${s.learning}</b> learning</div>` +
      `<div class="stat"><b>${s.locked}</b> locked</div>`;
  }
  function renderCard() {
    const cardEl = $("card");
    if (!cardEl) return;
    if (queue.length === 0) {
      cardEl.style.display = "none";
      const rev = document.querySelector(".review"); if (rev) rev.style.display = "none";
      const kbd = document.querySelector(".kbd"); if (kbd) kbd.style.display = "none";
      const em = $("emptyMsg");
      if (em) {
        em.style.display = "block";
        em.innerHTML = `<h2>✅ All caught up</h2>
          <p>No cards due${topicFilter !== "all" ? " in this topic" : ""}.<br>
          Come back tomorrow, pick another topic, or Reset progress to re-drill.</p>`;
      }
      return;
    }
    const em = $("emptyMsg"); if (em) em.style.display = "none";
    cardEl.style.display = "flex";
    const rev = document.querySelector(".review"); if (rev) rev.style.display = "flex";
    const kbd = document.querySelector(".kbd"); if (kbd) kbd.style.display = "block";

    current = queue[0];
    const card = cards[current];
    cardEl.classList.remove("flipped");
    const t = $("cardTopic"); if (t) t.textContent = card.t;
    const n = $("cardNum"); if (n) n.textContent = queue.length + " due · box " + BOX_NAMES[progress[current].box];
    const q = $("cardQ"); if (q) q.innerHTML = card.f;
    const a = $("cardA"); if (a) a.innerHTML = card.b;
  }
  function review(good) {
    if (current === null) return;
    const c = progress[current];
    c.seen = (c.seen || 0) + 1;
    if (good) {
      const next = Math.min(c.box + 1, BOX_INTERVAL_DAYS.length - 1);
      c.box = next;
      c.due = Date.now() + BOX_INTERVAL_DAYS[next] * DAY_MS;
    } else {
      c.box = 0;
      c.due = 0;
    }
    saveProgress();
    queue.shift();
    renderStats();
    renderCard();
  }

  /* ---------- topics ---------- */
  function populateTopics() {
    const sel = $("topicFilter");
    if (!sel) return;
    [...new Set(cards.map(c => c.t))].forEach(t => {
      const o = document.createElement("option");
      o.value = t; o.textContent = t;
      sel.appendChild(o);
    });
  }

  /* ---------- print cut-out sheet ---------- */
  function buildPrintSheet() {
    const ps = $("printSheet");
    if (!ps) return;
    const topics = [...new Set(cards.map(c => c.t))];
    let html = `<h1 style="font-size:18px">${meta.title} — flashcard print sheet</h1>`;
    topics.forEach(t => {
      html += `<h2>${t}</h2>`;
      cards.forEach(c => {
        if (c.t !== t) return;
        html += `<div class="card"><div class="t">${c.t}</div><div class="f">Q: ${c.f}</div><div class="b">A: ${c.b}</div></div>`;
      });
    });
    ps.innerHTML = html;
  }

  /* ---------- export / import (single deck) ---------- */
  function exportDeck() {
    const blob = new Blob([JSON.stringify({ slug, cards, progress, exported: new Date().toISOString() }, null, 2)], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "flashcards-" + slug + "-backup.json";
    a.click();
    URL.revokeObjectURL(a.href);
  }
  function importDeck(file) {
    const r = new FileReader();
    r.onload = () => {
      try {
        const d = JSON.parse(r.result);
        if (d.progress) {
          cards.forEach((_, i) => { if (!d.progress[i]) d.progress[i] = { box: 0, due: 0, seen: 0 }; });
          progress = d.progress;
          saveProgress();
          buildQueue(); renderStats(); renderCard();
          alert("Backup restored.");
        } else { alert("Not a valid backup file."); }
      } catch (e) { alert("Could not read that file."); }
    };
    r.readAsText(file);
  }

  /* ---------- whole-datacenter backup (used by hub too) ---------- */
  function backupAll() {
    const blob = new Blob([JSON.stringify({ store: readAll(), exported: new Date().toISOString() }, null, 2)], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "jee-flashcards-all-backup.json";
    a.click();
    URL.revokeObjectURL(a.href);
  }
  function restoreAll(file) {
    const r = new FileReader();
    r.onload = () => {
      try {
        const d = JSON.parse(r.result);
        if (d.store && typeof d.store === "object") {
          writeAll(d.store);
          alert("All progress restored. Reload to refresh.");
        } else { alert("Not a valid all-deck backup file."); }
      } catch (e) { alert("Could not read that file."); }
    };
    r.readAsText(file);
  }

  /* ---------- bootstrap ---------- */
  function init(opts) {
    slug = opts.slug;
    cards = opts.cards;
    meta = opts.meta || meta;
    progress = loadProgress();
    current = null;
    topicFilter = "all";

    const titleEl = $("deckTitle"); if (titleEl) titleEl.textContent = meta.title;

    // wire events (guard each so a missing element never throws)
    const cardEl = $("card");
    if (cardEl) cardEl.addEventListener("click", function () {
      if (current === null) return;
      this.classList.toggle("flipped");
    });
    const again = $("againBtn"); if (again) again.addEventListener("click", () => review(false));
    const good = $("goodBtn"); if (good) good.addEventListener("click", () => review(true));
    const shuffle = $("shuffleBtn"); if (shuffle) shuffle.addEventListener("click", () => { buildQueue(); renderCard(); });
    const filter = $("topicFilter");
    if (filter) filter.addEventListener("change", function () { topicFilter = this.value; buildQueue(); renderStats(); renderCard(); });
    const exp = $("exportBtn"); if (exp) exp.addEventListener("click", exportDeck);
    const imp = $("importBtn"); if (imp) imp.addEventListener("click", () => $("importFile").click());
    const impf = $("importFile");
    if (impf) impf.addEventListener("change", function () { if (this.files && this.files[0]) importDeck(this.files[0]); this.value = ""; });
    const reset = $("resetBtn");
    if (reset) reset.addEventListener("click", function () {
      if (confirm("Reset this deck's progress?")) { progress = defaultProgress(); saveProgress(); buildQueue(); renderStats(); renderCard(); }
    });
    const printBtn = $("printBtn");
    if (printBtn) printBtn.addEventListener("click", function () { buildPrintSheet(); window.print(); });
    document.addEventListener("keydown", function (e) {
      if (e.target && (e.target.tagName === "SELECT" || e.target.tagName === "INPUT")) return;
      if (e.code === "Space") { e.preventDefault(); const c = $("card"); if (current !== null && c) c.classList.toggle("flipped"); }
      else if (e.key === "1") review(false);
      else if (e.key === "2") review(true);
    });

    populateTopics();
    buildQueue();
    renderStats();
    renderCard();
  }

  window.Flashcards = {
    STORE_KEY,
    init,
    review,
    readAll,
    writeAll,
    deckStats,
    deckProgress: loadProgress,
    saveDeckProgress: saveProgress,
    backupAll,
    restoreAll,
    isDue,
  };
})();
