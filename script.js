* {
  box-sizing: border-box;
}

:root {
  --bg: #0f1021;
  --bg-2: #171b2d;
  --panel: rgba(21, 24, 39, 0.9);
  --panel-2: rgba(31, 36, 56, 0.95);
  --panel-3: rgba(40, 44, 66, 0.92);
  --line: rgba(255, 255, 255, 0.08);
  --text: #edf2ff;
  --muted: #a8afd3;
  --primary: #73e0ff;
  --primary-2: #7f6bff;
  --accent: #f6d365;
  --good: #76f7b2;
  --danger: #ff7e7e;
  --shadow: 0 20px 60px rgba(15, 16, 33, 0.55);
}

html {
  scroll-behavior: smooth;
}

body {
  margin: 0;
  font-family: "Inter", sans-serif;
  color: var(--text);
  background:
    radial-gradient(circle at top left, rgba(127, 107, 255, 0.22), transparent 28%),
    radial-gradient(circle at bottom right, rgba(115, 224, 255, 0.15), transparent 30%),
    var(--bg);
}

button {
  font: inherit;
}

.page-shell {
  max-width: 1500px;
  margin: 0 auto;
  padding: 24px;
}

.topbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 24px;
  padding: 18px 24px;
  border: 1px solid var(--line);
  border-radius: 22px;
  background: rgba(14, 18, 31, 0.72);
  backdrop-filter: blur(18px);
  box-shadow: var(--shadow);
  position: sticky;
  top: 18px;
  z-index: 20;
}

.brand-wrap {
  display: flex;
  align-items: center;
  gap: 14px;
}

.brand-mark {
  width: 42px;
  height: 42px;
  border-radius: 14px;
  background: linear-gradient(135deg, var(--primary), var(--primary-2));
  color: #0a0f19;
  display: grid;
  place-items: center;
  font-weight: 800;
  font-size: 1.4rem;
}

.eyebrow {
  margin: 0;
  color: var(--primary);
  font-size: 0.7rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

h1, h2, h3, h4, p {
  margin: 0;
}

h1 {
  font-size: 1.3rem;
}

.topnav {
  display: flex;
  gap: 20px;
}

.topnav a {
  color: var(--muted);
  text-decoration: none;
  font-weight: 600;
}

.primary-btn, .ghost-btn, .small-btn, .tiny-btn, .block-btn {
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: transform 0.18s ease, box-shadow 0.18s ease, opacity 0.2s ease;
}

.primary-btn:hover, .ghost-btn:hover, .small-btn:hover, .tiny-btn:hover, .block-btn:hover {
  transform: translateY(-1px);
}

.primary-btn {
  background: linear-gradient(135deg, var(--primary), var(--primary-2));
  color: #0c1322;
  padding: 12px 18px;
  font-weight: 800;
  box-shadow: 0 10px 26px rgba(127, 107, 255, 0.42);
}

.ghost-btn, .small-btn, .tiny-btn {
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid var(--line);
  color: var(--text);
}

.gghost-btn, .small-btn.ghost {
  background: transparent;
}

.hero {
  display: grid;
  grid-template-columns: 1.15fr 0.85fr;
  align-items: center;
  gap: 32px;
  padding: 56px 0 36px;
}

.badge {
  display: inline-flex;
  align-items: center;
  padding: 8px 12px;
  border-radius: 999px;
  background: rgba(115, 224, 255, 0.1);
  border: 1px solid rgba(115, 224, 255, 0.25);
  color: var(--primary);
  font-size: 0.78rem;
  font-weight: 700;
}

.hero-copy h2 {
  margin-top: 18px;
  font-size: clamp(2.8rem, 5vw, 5rem);
  line-height: 0.95;
  letter-spacing: -0.06em;
  max-width: 620px;
}

.hero-copy p {
  margin-top: 18px;
  color: var(--muted);
  font-size: 1.05rem;
  line-height: 1.7;
  max-width: 620px;
}

.hero-actions {
  display: flex;
  gap: 16px;
  margin-top: 28px;
}

.hero-metrics {
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: 22px;
  padding: 0;
  margin: 30px 0 0;
}

.hero-metrics li {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.hero-metrics strong {
  font-size: 1.8rem;
}

.hero-metrics span {
  color: var(--muted);
  font-size: 0.82rem;
}

.hero-card {
  background: linear-gradient(180deg, rgba(23, 27, 45, 0.8), rgba(16, 18, 30, 0.9));
  border: 1px solid var(--line);
  border-radius: 32px;
  padding: 28px;
  min-height: 460px;
  box-shadow: var(--shadow);
}

.mini-stage {
  position: relative;
  height: 330px;
  border-radius: 24px;
  overflow: hidden;
  background: linear-gradient(180deg, #8ad0ff 0%, #d7ecff 42%, #c1f5d9 100%);
  border: 1px solid rgba(255, 255, 255, 0.12);
}

.sun {
  position: absolute;
  width: 82px;
  height: 82px;
  border-radius: 50%;
  background: radial-gradient(circle, #ffe9a9, #ffc758 60%, #f39a1d 100%);
  top: 28px;
  right: 44px;
  box-shadow: 0 0 40px rgba(255, 202, 97, 0.7);
}

.cloud {
  position: absolute;
  border-radius: 40px;
  background: rgba(255, 255, 255, 0.78);
}

.cloud-one {
  width: 130px;
  height: 42px;
  top: 56px;
  left: 52px;
}

.cloud-two {
  width: 160px;
  height: 48px;
  top: 120px;
  left: 130px;
}

.sprite-glow {
  position: absolute;
  left: 50%;
  top: 60%;
  transform: translate(-50%, -50%);
  width: 78px;
  height: 78px;
  border-radius: 20px;
  background: linear-gradient(135deg, #7f6bff, #59d0ff);
  box-shadow: 0 16px 38px rgba(127, 107, 255, 0.5);
}

.sprite-glow::before,
.sprite-glow::after {
  content: "";
  position: absolute;
  background: rgba(255, 255, 255, 0.7);
  border-radius: 50%;
}

.sprite-glow::before {
  width: 12px;
  height: 12px;
  left: 18px;
  top: 22px;
}

.sprite-glow::after {
  width: 12px;
  height: 12px;
  right: 18px;
  top: 22px;
}

.mini-toolbar {
  display: flex;
  gap: 12px;
  margin-top: 18px;
}

.toolbar-pill {
  padding: 8px 12px;
  border-radius: 999px;
  font-size: 0.8rem;
  font-weight: 700;
}

.toolbar-pill.motion {
  background: rgba(115, 224, 255, 0.12);
  color: var(--primary);
}

.toolbar-pill.looks {
  background: rgba(127, 107, 255, 0.12);
  color: #b4a9ff;
}

.toolbar-pill.sound {
  background: rgba(246, 211, 101, 0.14);
  color: #f6d365;
}

.feature-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 20px;
  margin-top: 14px;
}

.feature-card {
  background: rgba(22, 25, 40, 0.86);
  border: 1px solid var(--line);
  border-radius: 22px;
  padding: 22px 22px 20px;
}

.icon {
  width: 52px;
  height: 52px;
  border-radius: 16px;
  display: grid;
  place-items: center;
  margin-bottom: 18px;
  font-size: 1.5rem;
  font-weight: 800;
}

.icon.purple { background: rgba(127, 107, 255, 0.14); color: #b7a8ff; }
.icon.blue { background: rgba(115, 224, 255, 0.14); color: #a9ebff; }
.icon.orange { background: rgba(246, 211, 101, 0.12); color: #ffd96d; }

.feature-card h3 {
  font-size: 1.25rem;
  margin-bottom: 10px;
}

.feature-card p {
  color: var(--muted);
  line-height: 1.7;
}

.studio {
  margin-top: 68px;
}

.studio-header {
  display: flex;
  justify-content: space-between;
  align-items: end;
  gap: 16px;
  margin-bottom: 18px;
}

.studio-header h3 {
  font-size: clamp(2rem, 3vw, 3rem);
  letter-spacing: -0.05em;
}

.project-controls {
  display: flex;
  gap: 12px;
}

.small-btn {
  padding: 10px 16px;
  font-weight: 700;
}

.studio-layout {
  display: grid;
  grid-template-columns: 260px minmax(0, 1fr) 300px;
  gap: 18px;
}

.panel {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.panel-block {
  background: rgba(17, 20, 32, 0.84);
  border: 1px solid var(--line);
  border-radius: 20px;
  padding: 18px;
}

.panel-block h4 {
  margin-bottom: 12px;
  font-size: 1rem;
}

.sprite-list, .costume-list, .script-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.sprite-item, .costume-item, .script-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid var(--line);
  border-radius: 12px;
  padding: 10px 12px;
}

.sprite-item.active, .costume-item.active {
  border-color: rgba(115, 224, 255, 0.62);
  box-shadow: inset 0 0 0 1px rgba(115, 224, 255, 0.35);
}

.sprite-meta {
  display: flex;
  align-items: center;
  gap: 10px;
}

.sprite-thumb {
  width: 26px;
  height: 26px;
  border-radius: 8px;
  background: linear-gradient(135deg, #7f6bff, #59d0ff);
}

.costume-swatch {
  width: 22px;
  height: 22px;
  border-radius: 6px;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.tiny-btn {
  margin-top: 12px;
  width: 100%;
  padding: 10px 12px;
  font-weight: 700;
}

.center-panel {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.stage-wrap {
  background: rgba(17, 20, 32, 0.84);
  border: 1px solid var(--line);
  border-radius: 22px;
  padding: 16px;
}

.stage-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: var(--muted);
  margin-bottom: 12px;
}

.stage {
  position: relative;
  width: 100%;
  height: 440px;
  background: linear-gradient(180deg, #8ad0ff 0%, #d7ecff 36%, #baf3d3 100%);
  border-radius: 18px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.stage-sky {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0));
}

.sprite-layer {
  position: absolute;
  inset: 0;
}

.stage-sprite {
  position: absolute;
  width: 72px;
  height: 72px;
  transform: translate(-50%, -50%);
  border-radius: 18px;
  background: linear-gradient(135deg, #7f6bff, #59d0ff);
  box-shadow: 0 16px 30px rgba(27, 30, 52, 0.3);
  transition: left 0.35s ease, top 0.35s ease, transform 0.3s ease;
}

.stage-sprite::before,
.stage-sprite::after {
  content: "";
  position: absolute;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: rgba(255,255,255,0.8);
  top: 20px;
}

.stage-sprite::before { left: 14px; }
.stage-sprite::after { right: 14px; }

.stage-sprite[data-name="Cat"] {
  border-radius: 16px;
}

.stage-sprite[data-name="Bot"] {
  border-radius: 14px;
}

.script-panel {
  background: rgba(17, 20, 32, 0.84);
  border: 1px solid var(--line);
  border-radius: 20px;
  padding: 16px;
}

.script-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.script-item {
  min-height: 54px;
}

.block-palette {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.block-btn {
  text-align: left;
  padding: 12px 14px;
  font-weight: 700;
  border: 1px solid rgba(255,255,255,0.08);
  color: #111827;
}

.block-btn.motion { background: #9fe7ff; }
.block-btn.looks { background: #c1b6ff; }
.block-btn.event { background: #ffd97d; }
.block-btn.sound { background: #a4f5c8; }

.inspector {
  min-height: 140px;
  color: var(--muted);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  border: 1px dashed rgba(255,255,255,0.12);
  text-align: center;
  padding: 20px;
}

.script-tag {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 8px 12px;
  border-radius: 999px;
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0.03em;
  text-transform: uppercase;
}

.script-tag.motion { background: rgba(115,224,255,0.14); color: var(--primary); }
.script-tag.looks { background: rgba(127,107,255,0.15); color: #c0b0ff; }
.script-tag.event { background: rgba(246,211,101,0.14); color: #f7d97a; }
.script-tag.sound { background: rgba(118,247,178,0.14); color: #88f0ba; }

@media (max-width: 1100px) {
  .studio-layout {
    grid-template-columns: 1fr;
  }

  .topbar {
    flex-wrap: wrap;
  }

  .hero {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 720px) {
  .feature-grid {
    grid-template-columns: 1fr;
  }

  .topnav {
    display: none;
  }

  .page-shell {
    padding: 16px;
  }

  .hero-copy h2 {
    font-size: 2.7rem;
  }
}
