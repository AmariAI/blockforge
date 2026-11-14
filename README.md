const state = {
  projectName: "Moon Hopper",
  activeSpriteIndex: 0,
  sprites: [
    {
      id: 1,
      name: "Cat",
      x: 50,
      y: 48,
      color: "linear-gradient(135deg, #7f6bff, #59d0ff)",
      costumes: [
        { name: "Default", tint: "linear-gradient(135deg, #7f6bff, #59d0ff)" },
        { name: "Jump", tint: "linear-gradient(135deg, #7df0b9, #59d0ff)" },
        { name: "Spark", tint: "linear-gradient(135deg, #ffd76a, #ff8f7a)" }
      ],
      activeCostume: 0,
      message: "Let's build!",
      script: ["whenGreenFlag", "move", "say", "switchCostume"]
    },
    {
      id: 2,
      name: "Bot",
      x: 26,
      y: 62,
      color: "linear-gradient(135deg, #ffad7a, #ff6b8d)",
      costumes: [
        { name: "Idle", tint: "linear-gradient(135deg, #ffad7a, #ff6b8d)" },
        { name: "Wave", tint: "linear-gradient(135deg, #ffde59, #ffbb6d)" },
        { name: "Bolt", tint: "linear-gradient(135deg, #8af7b5, #19d3d1)" }
      ],
      activeCostume: 0,
      message: "Ready!",
      script: ["whenGreenFlag", "turn", "say"]
    }
  ]
};

const stage = document.getElementById("stage");
const spriteLayer = document.getElementById("spriteLayer");
const spriteList = document.getElementById("spriteList");
const costumeList = document.getElementById("costumeList");
const scriptList = document.getElementById("scriptList");
const inspector = document.getElementById("inspector");
const stageTitle = document.getElementById("stageTitle");

const blockMap = {
  whenGreenFlag: { label: "When green flag clicked", type: "event" },
  move: { label: "Move 10", type: "motion" },
  turn: { label: "Turn 15°", type: "motion" },
  say: { label: "Say hello", type: "looks" },
  switchCostume: { label: "Switch costume", type: "looks" },
  playSound: { label: "Play sound", type: "sound" }
};

function getActiveSprite() {
  return state.sprites[state.activeSpriteIndex];
}

function renderSpriteList() {
  spriteList.innerHTML = "";
  state.sprites.forEach((sprite, index) => {
    const item = document.createElement("button");
    item.type = "button";
    item.className = `sprite-item ${index === state.activeSpriteIndex ? "active" : ""}`;
    item.innerHTML = `
      <div class="sprite-meta">
        <span class="sprite-thumb" style="background: ${sprite.color};"></span>
        <span>${sprite.name}</span>
      </div>
      <span>${sprite.script.length}</span>
    `;
    item.addEventListener("click", () => {
      state.activeSpriteIndex = index;
      renderAll();
    });
    spriteList.appendChild(item);
  });
}

function renderCostumes() {
  const sprite = getActiveSprite();
  costumeList.innerHTML = "";

  sprite.costumes.forEach((costume, index) => {
    const item = document.createElement("button");
    item.type = "button";
    item.className = `costume-item ${index === sprite.activeCostume ? "active" : ""}`;
    item.innerHTML = `
      <div class="sprite-meta">
        <span class="costume-swatch" style="background: ${costume.tint};"></span>
        <span>${costume.name}</span>
      </div>
    `;
    item.addEventListener("click", () => {
      sprite.activeCostume = index;
      renderAll();
    });
    costumeList.appendChild(item);
  });
}

function renderScriptList() {
  const sprite = getActiveSprite();
  scriptList.innerHTML = "";

  sprite.script.forEach((blockName) => {
    const block = blockMap[blockName];
    const item = document.createElement("div");
    item.className = "script-item";
    item.innerHTML = `
      <span class="script-tag ${block.type}">${block.type}</span>
      <span>${block.label}</span>
    `;
    scriptList.appendChild(item);
  });
}

function renderInspector() {
  const sprite = getActiveSprite();
  inspector.innerHTML = `
    <div>
      <p><strong>${sprite.name}</strong></p>
      <p>Position: ${Math.round(sprite.x)}%, ${Math.round(sprite.y)}%</p>
      <p>Costume: ${sprite.costumes[sprite.activeCostume].name}</p>
      <p>Message: "${sprite.message}"</p>
    </div>
  `;
}

function renderStage() {
  stageTitle.textContent = state.projectName;
  spriteLayer.innerHTML = "";

  state.sprites.forEach((sprite, index) => {
    const el = document.createElement("div");
    el.className = "stage-sprite";
    el.style.left = `${sprite.x}%`;
    el.style.top = `${sprite.y}%`;
    el.style.background = sprite.costumes[sprite.activeCostume].tint;
    el.style.transform = `translate(-50%, -50%) scale(${index === state.activeSpriteIndex ? 1.08 : 1})`;
    el.title = sprite.name;
    el.addEventListener("click", () => {
      state.activeSpriteIndex = index;
      renderAll();
    });
    spriteLayer.appendChild(el);
  });
}

function renderAll() {
  renderSpriteList();
  renderCostumes();
  renderScriptList();
  renderInspector();
  renderStage();
}

function addSprite() {
  const count = state.sprites.length + 1;
  const name = `Sprite ${count}`;
  const newSprite = {
    id: Date.now(),
    name,
    x: 50 + (Math.random() * 18 - 9),
    y: 50 + (Math.random() * 18 - 9),
    color: `linear-gradient(135deg, hsl(${Math.random() * 360}deg 82% 66%), hsl(${Math.random() * 180 + 180}deg 80% 66%))`,
    costumes: [
      { name: "Base", tint: `linear-gradient(135deg, hsl(${Math.random() * 360}deg 80% 66%), hsl(${Math.random() * 200}deg 82% 68%))` }
    ],
    activeCostume: 0,
    message: "Fresh start!",
    script: ["whenGreenFlag", "move", "say"]
  };

  state.sprites.push(newSprite);
  state.activeSpriteIndex = state.sprites.length - 1;
  renderAll();
}

function addCostume() {
  const sprite = getActiveSprite();
  const h = Math.random() * 360;
  sprite.costumes.push({
    name: `Style ${sprite.costumes.length + 1}`,
    tint: `linear-gradient(135deg, hsl(${h}deg 82% 68%), hsl(${(h + 60) % 360}deg 84% 67%))`
  });
  sprite.activeCostume = sprite.costumes.length - 1;
  renderAll();
}

function addBlock(blockName) {
  const sprite = getActiveSprite();
  sprite.script.push(blockName);
  renderScriptList();
}

function clearScript() {
  getActiveSprite().script = [];
  renderScriptList();
}

function runScript() {
  const sprite = getActiveSprite();
  let step = 0;

  const interval = setInterval(() => {
    if (step >= sprite.script.length) {
      clearInterval(interval);
      return;
    }

    const blockName = sprite.script[step];

    switch (blockName) {
      case "move":
        sprite.x = Math.min(85, Math.max(10, sprite.x + 10));
        break;
      case "turn":
        sprite.x = Math.min(90, Math.max(8, sprite.x + 8));
        sprite.y = Math.min(82, Math.max(18, sprite.y + 6));
        break;
      case "say":
        sprite.message = "Hello, creator!";
        break;
      case "switchCostume":
        sprite.activeCostume = (sprite.activeCostume + 1) % sprite.costumes.length;
        break;
      case "playSound":
        sprite.message = "Bloop!";
        break;
      default:
        sprite.message = "Ready to build!";
    }

    renderAll();
    step += 1;
  }, 420);
}

function bindEvents() {
  document.getElementById("launchBuilder").addEventListener("click", () => {
    document.getElementById("studio").scrollIntoView({ behavior: "smooth" });
  });

  document.getElementById("startProjectBtn").addEventListener("click", () => {
    document.getElementById("studio").scrollIntoView({ behavior: "smooth" });
  });

  document.getElementById("viewDemoBtn").addEventListener("click", runScript);
  document.getElementById("greenFlagBtn").addEventListener("click", runScript);
  document.getElementById("stopBtn").addEventListener("click", () => window.location.reload());
  document.getElementById("addSpriteBtn").addEventListener("click", addSprite);
  document.getElementById("addCostumeBtn").addEventListener("click", addCostume);
  document.getElementById("clearScriptBtn").addEventListener("click", clearScript);

  document.querySelectorAll(".block-btn").forEach((button) => {
    button.addEventListener("click", () => addBlock(button.dataset.block));
  });
}

bindEvents();
renderAll();
