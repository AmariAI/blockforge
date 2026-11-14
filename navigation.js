(() => {
  const $ = (id) => document.getElementById(id);
  const searchDialog = $("searchDialog");
  const searchInput = $("siteSearch");
  const results = $("searchResults");

  function escapeHtml(value) {
    const node = document.createElement("span");
    node.textContent = value;
    return node.innerHTML;
  }

  function openSearch() {
    searchDialog.showModal();
    searchInput.value = "";
    renderSearchResults("");
    searchInput.focus();
  }

  function renderSearchResults(query) {
    const normalized = query.trim().toLowerCase();
    const project = window.blockforgeDemoProject || { title: "Moon Hopper", owner: "AmariAI", description: "A playful starter project built in BlockForge." };
    const items = [
      { type: "Project", name: project.title || "Moon Hopper", creator: project.owner || "AmariAI", description: "A playful project made in the BlockForge studio.", href: "#studio" },
      { type: "Studio", name: `${project.owner || "AmariAI"}'s studio`, creator: project.owner || "AmariAI", description: "Explore this creator's BlockForge projects.", href: "#discover" }
    ];
    const matches = items.filter((item) => `${item.type} ${item.name} ${item.creator} ${item.description}`.toLowerCase().includes(normalized));
    results.innerHTML = matches.length ? matches.map((item) => `<a class="search-result" href="${item.href}"><span class="search-result-icon">${item.type === "Project" ? "▶" : "✦"}</span><span><strong>${escapeHtml(item.name)}</strong><small>${escapeHtml(item.type)} · by ${escapeHtml(item.creator)}</small><small>${escapeHtml(item.description)}</small></span><span class="search-arrow">↗</span></a>`).join("") : `<p class="search-empty">No matching projects or studios. Try another search.</p>`;
    results.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => searchDialog.close()));
  }

  $("searchButton").addEventListener("click", openSearch);
  searchInput.addEventListener("input", () => renderSearchResults(searchInput.value));
  $("messagesButton").addEventListener("click", () => {
    if (typeof openInbox === "function") openInbox();
    else $("inboxDialog").showModal();
  });
  $("accountButton").setAttribute("aria-label", "Open profile");
  $("createButton")?.addEventListener("click", () => $("studio").scrollIntoView({ behavior: "smooth" }));

  function updateMessageCount() {
    let count = 0;
    try {
      const saved = JSON.parse(localStorage.getItem("blockforge:moon-hopper:v1"));
      const user = sessionStorage.getItem("blockforge:demo-user") || "AmariAI";
      count = (saved?.invitations || []).filter((invite) => invite.username?.toLowerCase() === user.toLowerCase() && invite.status === "pending").length;
    } catch { count = 0; }
    $("messageCount").textContent = String(count);
    $("messageCount").hidden = count === 0;
    $("messagesButton").setAttribute("aria-label", count ? `Messages, ${count} pending invitation${count === 1 ? "" : "s"}` : "Messages");
  }
  updateMessageCount();
  window.addEventListener("storage", updateMessageCount);
  window.setInterval(updateMessageCount, 800);
  document.querySelectorAll("[data-close]").forEach((button) => {
    if (button.dataset.close === "searchDialog") button.addEventListener("click", () => searchDialog.close());
  });
})();
