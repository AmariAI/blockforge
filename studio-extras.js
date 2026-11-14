(() => {
  const stage = document.getElementById("stage");
  const blockList = document.querySelector(".block-list");
  const scriptList = document.getElementById("script");
  if (!stage || !blockList || !scriptList) return;

  const palettes = [
    { name: "Motion", key: "motion", blocks: [["move", "⇢ Move 10 steps"], ["turn", "↻ Turn 15°"]] },
    { name: "Looks", key: "looks", blocks: [["say", "“ Say hello!"], ["costume", "▧ Next costume"], ["show", "◉ Show"], ["hide", "◌ Hide"], ["size", "＋ Grow a little"]] },
    { name: "Sound", key: "sound", blocks: [["sound", "♪ Play a sound"]] },
    { name: "Events", key: "event", blocks: [["start", "⚑ When run clicked"], ["key", "⌨ Move with arrow keys"]] },
    { name: "Control", key: "control", blocks: [["wait", "◷ Wait a moment"], ["repeat", "⟳ Repeat 3 times"]] },
    { name: "Sensing", key: "sensing", blocks: [["edge", "◇ Bounce at edge"]] },
    { name: "Variables", key: "variable", blocks: [["changeVar", "▤ Change score by 1"]] }
  ];
  const colors = ["#7b9cff", "#ff9b72", "#63d6a0"];
  let soundEnabled = true;
  let runTimer = null;

  function editable() { return typeof canEdit === "function" ? canEdit() : true; }
  function save() { if (typeof saveData === "function") saveData(); }
  function updateView() { if (typeof render === "function") render(); }
  function addToScript(key) {
    if (!editable()) return;
    if (typeof blockLabels !== "undefined") blockLabels[key] = blockDefinitions[key];
    if (typeof addBlock === "function") addBlock(key);
  }
  const blockDefinitions = {
    show: ["looks", "◉ Show"], hide: ["looks", "◌ Hide"], size: ["looks", "＋ Grow a little"],
    wait: ["control", "◷ Wait a moment"], repeat: ["control", "⟳ Repeat 3 times"],
    key: ["event", "⌨ Move with arrow keys"], edge: ["sensing", "◇ Bounce at edge"],
    changeVar: ["variable", "▤ Change score by 1"]
  };

  const paletteBar = document.createElement("div");
  paletteBar.className = "feature-toolbar";
  paletteBar.innerHTML = `<div class="feature-tabs" role="tablist" aria-label="Block categories">${palettes.map((p, i) => `<button type="button" class="feature-tab ${i === 0 ? "selected" : ""}" data-palette="${p.key}" role="tab" aria-selected="${i === 0}">${p.name}</button>`).join("")}</div><div class="stage-tools"><label for="backdropPicker">Backdrop</label><select id="backdropPicker" aria-label="Choose stage backdrop"><option value="meadow">Meadow</option><option value="ocean">Ocean</option><option value="space">Space</option></select><button type="button" id="exportProject" class="feature-action">Export</button><label class="feature-action import-label" for="importProject">Import</label><input id="importProject" type="file" accept="application/json,.json" hidden></div>`;
  const editor = document.querySelector(".editor");
  editor?.parentNode.insertBefore(paletteBar, editor);

  const paletteSection = document.createElement("div");
  paletteSection.className = "palette-section-label";
  paletteSection.textContent = "Motion blocks";
  blockList.before(paletteSection);
  palettes.forEach((palette, index) => {
    if (index === 0) return;
    const group = document.createElement("div");
    group.className = "palette-group";
    group.dataset.category = palette.key;
    group.innerHTML = `<h4>${palette.name}</h4>${palette.blocks.map(([key, text]) => `<button type="button" class="block ${palette.key} edit-control" data-block="${key}">${text}</button>`).join("")}`;
    blockList.appendChild(group);
  });
  palettes[0].blocks.forEach(([key, text]) => {
    const button = blockList.querySelector(`[data-block="${key}"]`);
    if (button) button.dataset.palette = "motion";
  });
  blockList.querySelectorAll(".block").forEach((button) => {
    if (!button.dataset.palette) {
      const palette = palettes.find((group) => group.blocks.some(([key]) => key === button.dataset.block));
      button.dataset.palette = palette?.key || "motion";
    }
    button.addEventListener("click", () => addToScript(button.dataset.block));
  });

  paletteBar.querySelectorAll("[data-palette]").forEach((tab) => tab.addEventListener("click", () => {
    paletteBar.querySelectorAll("[data-palette]").forEach((item) => { item.classList.toggle("selected", item === tab); item.setAttribute("aria-selected", String(item === tab)); });
    const selected = tab.dataset.palette;
    paletteSection.textContent = `${palettes.find((p) => p.key === selected)?.name || "Motion"} blocks`;
    blockList.querySelectorAll(".block").forEach((button) => { button.hidden = button.dataset.palette !== selected; });
  }));
  blockList.querySelectorAll(".block").forEach((button) => { button.hidden = button.dataset.palette !== "motion"; });

  const backdropPicker = document.getElementById("backdropPicker");
  function setBackdrop(name, persist = true) {
    if (!editable() && persist) return;
    stage.dataset.backdrop = name;
    if (typeof data !== "undefined" && data.project) data.project.backdrop = name;
    if (persist) save();
  }
  backdropPicker.addEventListener("change", () => setBackdrop(backdropPicker.value));
  const savedBackdrop = typeof data !== "undefined" && data.project?.backdrop ? data.project.backdrop : "meadow";
  backdropPicker.value = savedBackdrop;
  setBackdrop(savedBackdrop, false);

  document.getElementById("exportProject").addEventListener("click", () => {
    const exportData = typeof data !== "undefined" ? data : { project: { title: "Moon Hopper" } };
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: "application/json" });
    const link = document.createElement("a"); link.href = URL.createObjectURL(blob); link.download = "blockforge-project.json"; link.click(); URL.revokeObjectURL(link.href);
  });
  document.getElementById("importProject").addEventListener("change", async (event) => {
    if (!editable()) return;
    const file = event.target.files?.[0]; if (!file) return;
    try {
      const imported = JSON.parse(await file.text());
      if (!imported.project || !Array.isArray(imported.project.script)) throw new Error("This file does not look like a BlockForge project.");
      if (typeof data !== "undefined") { data.project = { ...data.project, ...imported.project }; save(); updateView(); backdropPicker.value = data.project.backdrop || "meadow"; setBackdrop(backdropPicker.value, false); }
    } catch (error) { alert(error.message || "Could not import that project file."); }
    event.target.value = "";
  });

  function updatePositionFromPointer(event) {
    const bounds = stage.getBoundingClientRect();
    const x = Math.max(5, Math.min(95, ((event.clientX - bounds.left) / bounds.width) * 100));
    const y = Math.max(8, Math.min(88, ((event.clientY - bounds.top) / bounds.height) * 100));
    if (typeof data !== "undefined" && data.project) { data.project.x = x; data.project.y = y; save(); updateView(); }
  }
  const actor = document.getElementById("actor");
  if (actor) {
    actor.setAttribute("role", "button"); actor.setAttribute("tabindex", "0"); actor.setAttribute("aria-label", "Nova sprite; drag to move or use arrow keys");
    actor.addEventListener("pointerdown", (event) => { if (!editable()) return; actor.setPointerCapture(event.pointerId); updatePositionFromPointer(event); });
    actor.addEventListener("pointermove", (event) => { if (event.buttons && editable()) updatePositionFromPointer(event); });
  }
  document.addEventListener("keydown", (event) => {
    if (!editable() || /INPUT|TEXTAREA|SELECT/.test(document.activeElement?.tagName || "")) return;
    const directions = { ArrowLeft: [-3, 0], ArrowRight: [3, 0], ArrowUp: [0, -3], ArrowDown: [0, 3] };
    if (directions[event.key] && typeof data !== "undefined") {
      event.preventDefault(); const [dx, dy] = directions[event.key];
      data.project.x = Math.max(5, Math.min(95, data.project.x + dx)); data.project.y = Math.max(8, Math.min(88, data.project.y + dy)); save(); updateView();
    }
    if (event.code === "Space" && !event.repeat) { event.preventDefault(); document.getElementById("runButton")?.click(); }
  });

  function playTone() {
    if (!soundEnabled) return;
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const context = new AudioContext(); const oscillator = context.createOscillator(); const gain = context.createGain();
    oscillator.type = "sine"; oscillator.frequency.value = 620; gain.gain.setValueAtTime(0.12, context.currentTime); gain.gain.exponentialRampToValueAtTime(0.001, context.currentTime + 0.22);
    oscillator.connect(gain); gain.connect(context.destination); oscillator.start(); oscillator.stop(context.currentTime + 0.23); oscillator.onended = () => context.close();
  }
  function runEnhanced() {
    if (runTimer) clearInterval(runTimer);
    const sequence = typeof data !== "undefined" ? [...data.project.script] : [];
    let index = 0;
    const next = () => {
      if (index >= sequence.length) return;
      const key = sequence[index++];
      if (typeof data !== "undefined") {
        const project = data.project;
        if (key === "move") project.x = project.x > 82 ? 18 : project.x + 10;
        else if (key === "turn") { project.x = project.x > 84 ? 18 : project.x + 7; project.y = project.y > 78 ? 20 : project.y + 5; }
        else if (key === "costume") project.costume = (project.costume + 1) % colors.length;
        else if (key === "hide") document.getElementById("actor").classList.add("sprite-hidden");
        else if (key === "show") document.getElementById("actor").classList.remove("sprite-hidden");
        else if (key === "size") { const sprite = document.getElementById("actor"); sprite.classList.toggle("sprite-large"); }
        else if (key === "sound") playTone();
        else if (key === "changeVar") { project.score = (project.score || 0) + 1; const score = document.getElementById("scoreValue"); if (score) score.textContent = project.score; }
        else if (key === "edge") { project.x = project.x > 55 ? 15 : 85; }
        else if (key === "say") document.getElementById("actor").title = "Hello, creator!";
        save(); updateView();
      }
      if (key === "wait") runTimer = setTimeout(next, 900);
      else if (key === "repeat") { let repeats = 0; const repeat = () => { if (repeats++ >= 2) { runTimer = setTimeout(next, 200); return; } if (typeof data !== "undefined") data.project.x = data.project.x > 80 ? 20 : data.project.x + 8; save(); updateView(); runTimer = setTimeout(repeat, 220); }; repeat(); }
      else runTimer = setTimeout(next, 400);
    };
    next();
  }
  const runButton = document.getElementById("runButton");
  if (runButton) runButton.addEventListener("click", runEnhanced);
  const reset = document.getElementById("resetButton");
  if (reset) reset.addEventListener("click", () => { if (typeof data !== "undefined") { data.project.score = 0; save(); const score = document.getElementById("scoreValue"); if (score) score.textContent = "0"; } });

  const spriteInfo = document.getElementById("spriteInfo");
  if (spriteInfo?.parentElement) {
    const scoreCard = document.createElement("p"); scoreCard.className = "score-line"; scoreCard.innerHTML = `Score <strong id="scoreValue">0</strong>`; spriteInfo.parentElement.appendChild(scoreCard);
    const soundToggle = document.createElement("button"); soundToggle.className = "feature-action sound-toggle"; soundToggle.type = "button"; soundToggle.textContent = "♫ Sound on"; soundToggle.addEventListener("click", () => { soundEnabled = !soundEnabled; soundToggle.textContent = soundEnabled ? "♫ Sound on" : "♫ Sound off"; }); spriteInfo.parentElement.appendChild(soundToggle);
  }

  const observer = new MutationObserver(() => {
    if (!editable()) return;
    scriptList.querySelectorAll(".script-item").forEach((item, index) => {
      if (item.querySelector("[data-remove-block]")) return;
      item.classList.add("editable-script-item");
      const remove = document.createElement("button"); remove.type = "button"; remove.className = "remove-script-block edit-control"; remove.dataset.removeBlock = String(index); remove.setAttribute("aria-label", `Remove block ${index + 1}`); remove.textContent = "×";
      remove.addEventListener("click", () => { if (typeof data !== "undefined" && editable()) { data.project.script.splice(index, 1); save(); updateView(); } }); item.appendChild(remove);
    });
  });
  observer.observe(scriptList, { childList: true });
  const tabs = paletteBar.querySelectorAll(".feature-tab");
  const initialMotion = blockList.querySelector('[data-palette="motion"]'); if (initialMotion) initialMotion.hidden = false;
})();
