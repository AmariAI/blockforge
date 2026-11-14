# BlockForge

BlockForge is a static creative-coding demo with a stage, sample block palette, local collaboration invitation prototype, and local admin featuring controls.

## Admin featuring demo

The **AmariAI** demo profile sees **Admin tools** in the top navigation. Open it to feature/unfeature the example **Moon Hopper** project and the **AmariAI** studio. Featured items appear in the Community spotlight below the editor and remain saved in that browser's local storage.

**Important limitation:** this is a UI prototype, not secure administration or a shared community catalog. The profile switcher is not verified authentication, browser storage is editable by visitors and does not sync across users, and the admin role is hard-coded for this demo. For production, authenticate users server-side, assign admin roles in a trusted database, enforce role checks on every feature/unfeature API request, and store featured content in a shared database. Never trust a client-side role check to authorize real admin actions.

## Collaboration demo

Use **Share → Collaborate** to invite a username. The invite is stored as pending and does not grant edit access. Use **Account** to switch the local demo profile to the invited username; that recipient can accept or decline in the inbox. Acceptance unlocks editing for that profile. This is same-browser only and is not secure multi-user collaboration; see the limitation above.

## Public site

Expected GitHub Pages URL: <https://amariai.github.io/blockforge/> after Pages is enabled and deployment succeeds. Check the repository's Actions tab for status and **Settings → Pages → Build and deployment → Source** for the GitHub Actions setting.

## Run locally

Open `index.html`, or run `python -m http.server 3000` and visit `http://localhost:3000`.
