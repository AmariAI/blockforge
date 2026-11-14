# BlockForge

BlockForge is an original creative-coding playground. The studio now includes extra block-editor features such as category tabs, more blocks, selectable stage backdrops, keyboard and pointer sprite controls, a score variable, sound toggle, and project JSON import/export. Existing collaboration, admin featuring, and community spotlight demos remain included.

## Extra editor features

- Use the block category tabs to browse Motion, Looks, Sound, Events, Control, Sensing, and Variables blocks.
- Click blocks to add them to the script; use × to remove a block.
- Choose Meadow, Ocean, or Space for the stage backdrop.
- Drag the sprite or use arrow keys to move it. Press Space to run the script.
- Try hide/show, grow, wait, repeat, edge bounce, score, and sound blocks.
- Use Export/Import to save or load a project JSON file.

## Important prototype limitations

This app is a static browser demo. Project data, collaboration invites, and featured content are stored in the browser's local storage and do not sync across users or devices. The account switcher and admin permission checks are not secure authentication/authorization. Real collaboration and admin tools need a trusted backend, authenticated accounts, and server-side authorization.

## Public site

Expected GitHub Pages URL: <https://amariai.github.io/blockforge/> after Pages is enabled and deployment succeeds. Check the repository's Actions tab for status and **Settings → Pages → Build and deployment → Source** for the GitHub Actions setting.

## Run locally

Open `index.html`, or run `python -m http.server 3000` and visit `http://localhost:3000`.

Community guidelines: [community-guidelines.html](community-guidelines.html)
