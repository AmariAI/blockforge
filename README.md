# BlockForge

BlockForge is a static creative-coding demo with a stage, sample block palette, and a local collaboration-invitation prototype.

## Collaboration demo

Use **Share → Collaborate** to invite a username. The invite is stored as pending and does not grant edit access. Use **Account** to switch the local demo profile to the invited username; that recipient can accept or decline in the inbox. Acceptance unlocks editing for that profile. Refreshing the page preserves the project and invite state in this browser's local storage.

**Important limitation:** this is a same-browser UI demo, not secure multi-user collaboration. A visitor can choose any demo username, and local storage does not sync to another device or send a real notification. Do not use this for private projects or rely on its client-side edit checks as security. Real collaboration requires authenticated user accounts, a server/database to persist invites and verify project membership on every write, and a real-time or polling sync mechanism. GitHub OAuth credentials and authorization checks must remain server-side.

## Public site

The expected GitHub Pages URL is <https://amariai.github.io/blockforge/> after Pages is enabled for the repository and deployment succeeds. Open the repository's Actions tab to check deployment status; set **Settings → Pages → Build and deployment → Source** to **GitHub Actions** when required.

## Run locally

Open `index.html`, or run `python -m http.server 3000` and visit `http://localhost:3000`.
