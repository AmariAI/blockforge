const STORAGE_KEY = "blockforge:moon-hopper:v1";
const OWNER = "AmariAI";
const initialProject = {
  project: { title: "Moon Hopper", owner: OWNER, x: 50, y: 50, costume: 0, script: ["start", "move", "say", "costume"] },
  invitations: []
};
const blockLabels = {
  move: ["motion", "⇢ Move 10 steps"], turn: ["motion", "↻ Turn 15°"],
  say: ["looks", "“ Say hello!"], costume: ["looks", "▧ Next costume"],
  start: ["event", "⚑ When run clicked"], sound: ["sound", "♪ Play a sound"]
};
const $ = (id) => document.getElementById(id);
let data = loadData();
let currentUser = sessionStorage.getItem("blockforge:demo-user") || OWNER;
let runTimer;
function loadData() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (saved && saved.project && Array.isArray(saved.invitations)) return saved;
  } catch (error) { console.warn("Could not load saved demo project", error); }
  return structuredClone(initialProject);
}
function saveData() { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); }
function isOwner() { return currentUser.toLowerCase() === data.project.owner.toLowerCase(); }
function acceptedInvite() { return data.invitations.some((invite) => invite.username.toLowerCase() === currentUser.toLowerCase() && invite.status === "accepted"); }
function canEdit() { return isOwner() || acceptedInvite(); }
function render() {
  const project = data.project;
  $("accountButton").textContent = `Account: ${currentUser}`;
  $("accessLabel").textContent = isOwner() ? "Owner" : acceptedInvite() ? "Collaborator" : "View only";
  $("accessNotice").hidden = canEdit();
  if (!canEdit()) $("accessNotice").textContent = `You are viewing as ${currentUser}. You can run the project, but editing is locked until the owner approves your collaboration invite.`;
  document.querySelectorAll(".edit-control").forEach((el) => { el.disabled = !canEdit(); el.title = canEdit() ? "" : "Accept the collaboration invite to edit"; });
  $("sprites").innerHTML = `<button class="sprite-item active" type="button"><span class="swatch"></span>Nova</button>`;
  const names = ["Original", "Sunset", "Mint"];
  $("costumes").innerHTML = names.map((name, i) => `<button class="costume-item ${i === project.costume ? "active" : ""}" data-costume="${i}" type="button" ${canEdit() ? "" : "disabled"}><span class="swatch"></span>${name}</button>`).join("");
  $("script").innerHTML = project.script.map((key) => {
    const [type, label] = blockLabels[key];
    return `<div class="script-item ${type}">${label}</div>`;
  }).join("");
  $("emptyHint").hidden = project.script.length > 0;
  $("spriteInfo").textContent = `Nova · x ${Math.round(project.x)} · y ${Math.round(project.y)} · costume ${project.costume + 1}`;
  $("actor").style.left = `${project.x}%`;
  $("actor").style.top = `${project.y}%`;
  $("actor").style.background = ["linear-gradient(145deg,#8c68f5,#50c9e8)", "linear-gradient(145deg,#ff9c6c,#ffcf67)", "linear-gradient(145deg,#68d69a,#4ac9d3)"][project.costume];
  renderCollaboration();
}
function renderCollaboration() {
  const rows = data.invitations;
  const owned = rows.filter((invite) => invite.owner.toLowerCase() === currentUser.toLowerCase());
  const incoming = rows.filter((invite) => invite.username.toLowerCase() === currentUser.toLowerCase());
  const visible = [...owned, ...incoming.filter((invite) => !owned.includes(invite))];
  $("collabList").innerHTML = visible.length ? visible.map((invite) => {
    const sent = invite.owner.toLowerCase() === currentUser.toLowerCase();
    const label = sent ? `${escapeHtml(invite.username)} · invited by you` : `${escapeHtml(invite.owner)} invited you`;
    return `<div class="collab-row"><span>${label}</span><span class="status ${invite.status}">${invite.status === "accepted" ? "Accepted · can edit" : invite.status}</span>${!sent && invite.status === "pending" ? `<span class="row-actions"><button class="accept" data-action="accept" data-id="${invite.id}" type="button">Accept</button><button data-action="decline" data-id="${invite.id}" type="button">Decline</button></span>` : ""}</div>`;
  }).join("") : `<p class="empty-state">No collaboration invites yet.</p>`;
}
function escapeHtml(text) { const element = document.createElement("span"); element.textContent = text; return element.innerHTML; }
function sendInvite(username) {
  const clean = username.trim().replace(/^@/, "");
  if (!/^[A-Za-z0-9_-]{2,24}$/.test(clean)) return "Enter a valid username (2–24 letters, numbers, _ or -).";
  if (clean.toLowerCase() === currentUser.toLowerCase()) return "You cannot invite your own account.";
  const existing = data.invitations.find((invite) => invite.owner.toLowerCase() === currentUser.toLowerCase() && invite.username.toLowerCase() === clean.toLowerCase() && invite.status !== "declined");
  if (existing) return `There is already a ${existing.status} invitation for ${clean}.`;
  data.invitations.push({ id: crypto.randomUUID(), owner: currentUser, username: clean, status: "pending", createdAt: new Date().toISOString() });
  saveData(); render(); return `Invite sent to ${clean}. It stays pending until they accept.`;
}
function switchAccount(username) {
  currentUser = username.trim();
  sessionStorage.setItem("blockforge:demo-user", currentUser);
  $("accountDialog").close();
  render();
  const hasPending = data.invitations.some((invite) => invite.username.toLowerCase() === currentUser.toLowerCase() && invite.status === "pending");
  if (hasPending) openInbox();
}
function openInbox() {
  const invites = data.invitations.filter((invite) => invite.username.toLowerCase() === currentUser.toLowerCase() && invite.status === "pending");
  $("inboxList").innerHTML = invites.length ? invites.map((invite) => `<div class="invite-row"><span><strong>${escapeHtml(invite.owner)}</strong> invited you to collaborate on <strong>${escapeHtml(data.project.title)}</strong>.</span><span class="row-actions"><button class="accept" data-action="accept" data-id="${invite.id}" type="button">Accept</button><button data-action="decline" data-id="${invite.id}" type="button">Decline</button></span></div>`).join("") : `<p class="inbox-empty">No pending invitations for ${escapeHtml(currentUser)}.</p>`;
  $("inboxDialog").showModal();
}
function respondToInvite(id, response) {
  const invite = data.invitations.find((item) => item.id === id && item.username.toLowerCase() === currentUser.toLowerCase() && item.status === "pending");
  if (!invite) return;
  invite.status = response === "accept" ? "accepted" : "declined";
  invite.respondedAt = new Date().toISOString();
  saveData(); render();
  if ($("inboxDialog").open) openInbox();
}
function addBlock(key) { if (!canEdit()) return; data.project.script.push(key); saveData(); render(); }
function runProject() {
  clearInterval(runTimer);
  let index = 0;
  runTimer = setInterval(() => {
    if (index >= data.project.script.length) { clearInterval(runTimer); return; }
    const block = data.project.script[index++];
    if (block === "move") data.project.x = data.project.x > 82 ? 18 : data.project.x + 12;
    if (block === "turn") data.project.y = data.project.y > 78 ? 22 : data.project.y + 8;
    if (block === "costume") data.project.costume = (data.project.costume + 1) % 3;
    if (block === "say") $("actor").title = "Hello, creator!";
    if (block === "sound") $("actor").title = "Bloop!";
    saveData(); render();
  }, 450);
}
document.querySelectorAll(".block").forEach((button) => button.addEventListener("click", () => addBlock(button.dataset.block)));
$("costumes").addEventListener("click", (event) => { const button = event.target.closest("[data-costume]"); if (button && canEdit()) { data.project.costume = Number(button.dataset.costume); saveData(); render(); } });
$("addSprite").addEventListener("click", () => { if (!canEdit()) return; $("sprites").insertAdjacentHTML("beforeend", `<button class="sprite-item" type="button"><span class="swatch"></span>Sprite ${Date.now().toString().slice(-3)}</button>`); });
$("addCostume").addEventListener("click", () => { if (!canEdit()) return; data.project.costume = (data.project.costume + 1) % 3; saveData(); render(); });
$("clearButton").addEventListener("click", () => { if (!canEdit()) return; data.project.script = []; saveData(); render(); });
$("runButton").addEventListener("click", runProject);
$("resetButton").addEventListener("click", () => { clearInterval(runTimer); data.project.x = 50; data.project.y = 50; data.project.costume = 0; saveData(); render(); });
$("shareButton").addEventListener("click", () => { const menu = $("shareMenu"); menu.classList.toggle("open"); $("shareButton").setAttribute("aria-expanded", menu.classList.contains("open")); });
$("collaborateButton").addEventListener("click", () => { $("shareMenu").classList.remove("open"); $("shareButton").setAttribute("aria-expanded", "false"); if (!isOwner()) { alert("Only the project owner can invite collaborators in this demo."); return; } $("inviteFeedback").textContent = ""; $("inviteUsername").value = ""; $("inviteDialog").showModal(); $("inviteUsername").focus(); });
$("inviteForm").addEventListener("submit", (event) => { event.preventDefault(); const result = sendInvite($("inviteUsername").value); const success = result.startsWith("Invite sent"); $("inviteFeedback").textContent = result; $("inviteFeedback").className = `form-feedback ${success ? "success" : "error"}`; if (success) $("inviteUsername").value = ""; });
$("accountButton").addEventListener("click", () => { $("accountUsername").value = currentUser; $("accountDialog").showModal(); $("accountUsername").focus(); });
$("accountForm").addEventListener("submit", (event) => { event.preventDefault(); const username = $("accountUsername").value.trim(); if (!/^[A-Za-z0-9_-]{2,24}$/.test(username)) return; switchAccount(username); });
$("collabList").addEventListener("click", (event) => { const button = event.target.closest("[data-action]"); if (button) respondToInvite(button.dataset.id, button.dataset.action); });
$("inboxList").addEventListener("click", (event) => { const button = event.target.closest("[data-action]"); if (button) respondToInvite(button.dataset.id, button.dataset.action); });
document.querySelectorAll("[data-close]").forEach((button) => button.addEventListener("click", () => $(button.dataset.close).close()));
document.addEventListener("click", (event) => { if (!$("shareMenu").contains(event.target)) { $("shareMenu").classList.remove("open"); $("shareButton").setAttribute("aria-expanded", "false"); } });
render();
