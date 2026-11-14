* {
  box-sizing: border-box;
}

:root {
  --bg: #e7edf4;
  --bg-strong: #dfe8f4;
  --panel: #f7f7f7;
  --panel-alt: #f2f4fa;
  --panel-deep: #edf3ff;
  --ink: #1f2a37;
  --muted: #58657a;
  --line: rgba(29, 42, 56, 0.12);
  --shadow: 0 16px 36px rgba(43, 52, 70, 0.12);
  --motion: #4c97ff;
  --looks: #9966ff;
  --sound: #cf63cf;
  --event: #ffd54f;
  --control: #ffab19;
  --operator: #59c059;
  --sensing: #5cb1d6;
  --primary: #67d0ff;
  --primary-2: #7a6aff;
  --good: #7ad6a0;
  --danger: #ff7e7e;
}

html {
  scroll-behavior: smooth;
}

body {
  margin: 0;
  font-family: "Inter", sans-serif;
  background:
    radial-gradient(circle at top left, rgba(108, 141, 255, 0.12), transparent 24%),
    linear-gradient(180deg, #edf3f8, #e9eef6 24%, #eff3f8 100%);
  color: var(--ink);
}

button {
  font: inherit;
}

.page-shell {
  max-width: 1500px;
  margin: 0 auto;
  padding: 20px 18px 40px;
}

.topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  padding: 16px 18px;
  border: 1px solid rgba(27, 36, 51, 0.08);
  border-radius: 20px;
  background: rgba(255,255,255,0.85);
  box-shadow: var(--shadow);
  backdrop-filter: blur(16px);
  position: sticky;
  top: 10px;
  z-index: 30;
}

.brand-wrap {
  display: flex;
  align-items: center;
  gap: 12px;
  min-width: 170px;
}

.brand-mark {
  width: 44px;
  height: 44px;
  border-radius: 14px;
  display: grid;
  place-items: center;
  background: linear-gradient(135deg, #4cc9ff, #7d6bff);
  color: white;
  font-weight: 800;
  font-size: 1.3rem;
  box-shadow: inset 0 0 0 2px rgba(255,255,255,0.3);
}

.brand-copy h1 {
  font-size: 1.35rem;
  letter-spacing: -0.04em;
  margin: 0;
}

.eyebrow {
  font-size: 0.68rem;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  margin: 0 0 5px;
  color: #5a6f89;
}

.topnav {
  display: flex;
  gap: 8px;
  padding: 6px;
  border-radius: 14px;
  background: rgba(17, 23, 38, 0.04);
}

.nav-chip {
  border: 0;
  background: transparent;
  color: var(--muted);
  padding: 10px 12px;
  border-radius: 10px;
  font-weight: 700;
  cursor: pointer;
}

.nav-chip.active {
  background: white;
  color: var(--ink);
  box-shadow: 0 4px 14px rgba(38, 50, 68, 0.08);
}

.top-actions {
  display: flex;
  align-items: center;
  gap: 10px;
}

.primary-btn, .ghost-btn, .small-btn, .tiny-btn, .block-btn {
  border: 0;
  border-radius: 12px;
  cursor: pointer;
  transition: transform 0.16s ease, box-shadow 0.16s ease;
}

.primary-btn:hover, .ghost-btn:hover, .small-btn:hover, .tiny-btn:hover, .block-btn:hover {
  transform: translateY(-1px);
}

.primary-btn {
  padding: 11px 18px;
  font-weight: 800;
  color: #0d1b26;
  background: linear-gradient(135deg, #6be1ff, #7a6cff);
  box-shadow: 0 10px 24px rgba(122, 106, 255, 0.2);
}

.ghost-btn, .small-btn, .tiny-btn {
  background: rgba(17, 24, 39, 0.04);
  color: var(--ink);
  border: 1px solid rgba(17, 24, 39, 0.08);
}

.ghost-btn {
  padding: 10px 16px;
  font-weight: 700;
}

.hero {
  display: grid;
  grid-template-columns: 1.12fr 0.88fr;
  gap: 24px;
  padding: 36px 0 22px;
  align-items: center;
}

.hero-copy {
  padding: 20px 0;
}

.badge {
  display: inline-flex;
  align-items: center;
  padding: 8px 12px;
  background: rgba(76, 151, 255, 0.1);
  border: 1px solid rgba(76, 151, 255, 0.18);
  color: #2d67c7;
  border-radius: 999px;
  font-size: 0.76rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.hero-copy h2 {
  margin-top: 18px;
  font-size: clamp(2.8rem, 5vw, 5rem);
  line-height: 0.96;
  letter-spacing: -0.07em;
  max-width: 620px;
}

.hero-copy p {
  margin-top: 18px;
  color: var(--muted);
  line-height: 1.7;
  max-width: 620px;
  font-size: 1.02rem;
}

.hero-actions {
  display: flex;
  gap: 14px;
  margin-top: 26px;
}

.hero-metrics {
  display: flex;
  gap: 22px;
  flex-wrap: wrap;
  list-style: none;
  padding: 0;
  margin: 30px 0 0;
}

.hero-metrics li {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.hero-metrics strong {
  font-size: 1.8rem;
  letter-spacing: -0.05em;
}

.hero-metrics span {
  color: var(--muted);
  font-size: 0.8rem;
}

.hero-card {
  background: rgba(255,255,255,0.72);
  border: 1px solid rgba(82, 100, 123, 0.1);
  border-radius: 30px;
  padding: 22px;
  box-shadow: var(--shadow);
}

.mini-stage {
  position: relative;
  overflow: hidden;
  min-height: 320px;
  border-radius: 24px;
  background: linear-gradient(180deg, #8ad0ff, #dfeffa 42%, #d8f4db 100%);
  border: 1px solid rgba(27, 36, 51, 0.09);
}

.sun {
  position: absolute;
  right: 38px;
  top: 26px;
  width: 92px;
  height: 92px;
  border-radius: 50%;
  background: radial-gradient(circle, #fff0ad, #ffc857 55%, #f39d2e 100%);
  box-shadow: 0 0 46px rgba(255, 200, 87, 0.75);
}

.cloud {
  position: absolute;
  height: 42px;
  border-radius: 999px;
  background: rgba(255,255,255,0.7);
}

.cloud-one { width: 130px; left: 38px; top: 60px; }
.cloud-two { width: 160px; left: 150px; top: 112px; }

.sprite-glow {
  position: absolute;
  left: 50%;
  top: 62%;
  width: 84px;
  height: 84px;
  transform: translate(-50%, -50%);
  border-radius: 18px;
  background: linear-gradient(135deg, #6e8ef6, #7de0ff);
  box-shadow: 0 16px 34px rgba(90, 115, 255, 0.28);
}

.sprite-glow::before,
.sprite-glow::after {
  content: "";
  position: absolute;
  top: 20px;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: rgba(255,255,255,0.8);
}

.sprite-glow::before { left: 18px; }
.sprite-glow::after { right: 18px; }

.mini-toolbar {
  display: flex;
  gap: 10px;
  margin-top: 18px;
}

.toolbar-pill {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 8px 12px;
  border-radius: 999px;
  font-weight: 800;
  font-size: 0.8rem;
  letter-spacing: 0.02em;
}

.toolbar-pill.motion { background: rgba(76,151,255,0.12); color: #2567d5; }
.toolbar-pill.looks { background: rgba(153,102,255,0.12); color: #5b4bd8; }
.toolbar-pill.sound { background: rgba(207,99,207,0.12); color: #8d4895; }

.feature-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 18px;
  margin-top: 22px;
}

.feature-card {
  padding: 22px 20px 18px;
  background: rgba(255,255,255,0.7);
  border: 1px solid rgba(30, 42, 56, 0.08);
  border-radius: 22px;
  box-shadow: 0 10px 22px rgba(24, 33, 44, 0.05);
}

.icon {
  width: 54px;
  height: 54px;
  border-radius: 16px;
  display: grid;
  place-items: center;
  font-size: 1.6rem;
  font-weight: 800;
  margin-bottom: 16px;
}

.icon.purple { background: rgba(153,102,255,0.14); color: #6d4fe0; }
.icon.blue { background: rgba(76,151,255,0.14); color: #2969d1; }
.icon.orange { background: rgba(255,171,25,0.14); color: #c57b06; }

.feature-card h3 {
  margin-bottom: 8px;
  font-size: 1.25rem;
}

.feature-card p {
  color: var(--muted);
  line-height: 1.7;
}

.studio {
  margin-top: 60px;
}

.studio-header {
  display: flex;
  align-items: end;
  justify-content: space-between;
  gap: 18px;
  margin-bottom: 18px;
}

.studio-header h3 {
  font-size: clamp(2.1rem, 3vw, 3rem);
  letter-spacing: -0.06em;
}

.project-controls {
  display: flex;
  gap: 10px;
}

.small-btn {
  padding: 10px 14px;
  font-weight: 800;
}

.studio-layout {
  display: grid;
  grid-template-columns: 265px minmax(0,1fr) 290px;
  gap: 18px;
}

.panel {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.panel-block {
  background: rgba(255,255,255,0.7);
  border: 1px solid rgba(17, 24, 39, 0.08);
  border-radius: 20px;
  padding: 16px;
  box-shadow: 0 8px 18px rgba(33, 44, 59, 0.04);
}

.panel-title-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  margin-bottom: 10px;
}

.panel-block h4 {
  margin: 0;
  font-size: 1rem;
}

.tiny-counter {
  min-width: 26px;
  height: 26px;
  border-radius: 999px;
  display: grid;
  place-items: center;
  background: rgba(76, 151, 255, 0.08);
  color: #2a67ca;
  font-size: 0.72rem;
  font-weight: 800;
}

.sprite-list, .costume-list, .script-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.sprite-item, .costume-item, .script-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  border-radius: 12px;
  border: 1px solid rgba(17, 24, 39, 0.08);
  background: rgba(17, 24, 39, 0.02);
  color: var(--ink);
}

.sprite-item.active, .costume-item.active {
  border-color: rgba(76, 151, 255, 0.42);
  background: rgba(76, 151, 255, 0.07);
}

.sprite-meta {
  display: flex;
  align-items: center;
  gap: 10px;
}

.sprite-thumb {
  width: 28px;
  height: 28px;
  border-radius: 8px;
  display: inline-block;
  background: linear-gradient(135deg, #4c97ff, #7a6cff);
}

.costume-swatch {
  width: 22px;
  height: 22px;
  border-radius: 6px;
  display: inline-block;
  border: 1px solid rgba(17, 24, 39, 0.15);
}

.tiny-btn {
  width: 100%;
  margin-top: 12px;
  padding: 10px 12px;
  font-weight: 800;
}

.center-panel {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.stage-wrap {
  background: rgba(255,255,255,0.7);
  border: 1px solid rgba(17, 24, 39, 0.08);
  border-radius: 22px;
  padding: 16px;
  box-shadow: 0 8px 18px rgba(33, 44, 59, 0.04);
}

.stage-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 12px;
  color: var(--muted);
  font-weight: 700;
}

.stage {
  position: relative;
  width: 100%;
  height: 440px;
  background: linear-gradient(180deg, #8cd9ff 0%, #dff5ff 39%, #c9f2d2 100%);
  border: 1px solid rgba(27, 36, 51, 0.08);
  border-radius: 18px;
  overflow: hidden;
}

.stage-sky {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(255,255,255,0.08), rgba(255,255,255,0));
}

.sprite-layer {
  position: absolute;
  inset: 0;
}

.stage-sprite {
  position: absolute;
  width: 72px;
  height: 72px;
  border-radius: 18px;
  box-shadow: 0 14px 28px rgba(47,57,79,0.18);
  transform: translate(-50%, -50%);
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

.stage-sprite::before { left: 15px; }
.stage-sprite::after { right: 15px; }

.script-panel {
  background: rgba(255,255,255,0.7);
  border: 1px solid rgba(17, 24, 39, 0.08);
  border-radius: 20px;
  padding: 16px;
  box-shadow: 0 8px 18px rgba(33, 44, 59, 0.04);
}

.script-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  margin-bottom: 12px;
}

.script-header h4 {
  margin: 0;
  font-size: 1rem;
}

.script-item {
  min-height: 56px;
  background: rgba(17, 24, 39, 0.02);
}

.script-tag {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 0.7rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  padding: 8px 10px;
  border-radius: 999px;
}

.script-tag.motion { background: rgba(76,151,255,0.12); color: #2d68d1; }
.script-tag.looks { background: rgba(153,102,255,0.12); color: #5e45d5; }
.script-tag.event { background: rgba(255,213,79,0.18); color: #b7830a; }
.script-tag.sound { background: rgba(207,99,207,0.12); color: #8c4e9e; }

.palette-block .block-palette {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.block-btn {
  text-align: left;
  padding: 12px 14px;
  font-weight: 800;
  color: #17212f;
  border: 1px solid rgba(23, 33, 47, 0.08);
  border-radius: 12px;
}

.block-btn.motion { background: #a7d5ff; }
.block-btn.looks { background: #c2b4ff; }
.block-btn.event { background: #f9da70; }
.block-btn.sound { background: #f0b8f0; }

.inspector {
  min-height: 170px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  border-radius: 12px;
  border: 1px dashed rgba(17,24,39,0.12);
  background: rgba(17,24,39,0.02);
  color: var(--muted);
  padding: 18px;
}

@media (max-width: 1150px) {
  .studio-layout {
    grid-template-columns: 1fr;
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
