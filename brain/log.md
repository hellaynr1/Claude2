# Brain log

What we built and learned, newest first. Claude adds an entry at the end of every session.

## 2026-10-17
- **Web app sync (free)**: notes, deletions and Learn progress sync between devices through a private file in the user's own Puter account (SecondBrain/sync.json); newest version of each note wins; syncs on save, on focus and every minute. Fixed a bug where the Notes list showed "[object HTMLButtonElement]" (web app and Claude page).
- **Second Brain web app (free)** in `app/`: same app as the Claude page, but as a normal website so the microphone works. Claude through Puter.js (free account, no API key), notes stored in the browser, Export/Import, installable on iPhone (Add to Home Screen). Personal stars removed from this public build. Test link: https://raw.githack.com/hellaynr1/Claude2/main/app/index.html · permanent link once GitHub Pages is on: https://hellaynr1.github.io/Claude2/app/
- **Second Brain M1 done** (v9, same link): Data panel with Export JSON/Markdown, Import, and Back up to Google Drive; AI filing now shows a suggestion card (title, cluster, type, tags, links with reasons) that you apply or dismiss, so your own words are never overwritten; new fields: type (raw/distilled/system), status, importance, project, source; version history with Restore; Ask uses BM25 search and labels "From your notes" vs "General knowledge" and says when something isn't in your notes. Chosen: the free route (AI through the Claude subscription, no API costs).
- **Second Brain audit & plan** (`docs/second-brain-plan.md`): what works, what's missing, recommended architecture (Supabase as source of truth, Next.js app, memory API + MCP, nightly review with approvals), phases M1–M7, costs. Proposed first milestone M1: export/import, AI suggestions instead of overwrites, item fields, version history.
- **Systems** (new color, silver): saved recipes in `systems/` (brand-kit, build-app, sync-everything, research-to-brain) plus the `systems` skill to run and save them. Copy in the vault as `Systems.md`.
- **Remote automation**: approved and switched on the Daily optimizer (every day 20:45 Brussels). It proposes improvements as a pull request; merge = approve. It can't read Google Drive yet (no connectors on the scheduled task).
- Rule confirmed: save everything learned here to the Second Brain, Google Drive and this repo automatically.
- **Investedia brand kit** (https://claude.ai/artifact/CZhqQatKudTSVtbeKQSKYp): 25 assets from the investedia.com logo: logos, profile pictures, icons, banners, website share image, 5 highlight covers, 4 post templates, story template, guidelines. PNG + SVG in `brand/investedia/`. Drive folder `@ Guidify LLC / Investedia / Brand kit` has the icon, app icon, favicon and profile picture; the page's button uploads the rest.
- **Talk mic**: tapping the mic tries instant voice typing and falls back to keyboard dictation. Talk sends when you stop speaking and listens again after answering.
- Removed the NBU and Pinterest drafts. Guidify assets wait for the owner's pictures.
- New rule: update the Second Brain, Google Drive and this repo at the same time.
- **Second Brain v3** (same link): Galaxy ⇄ Brain switch (a real 3D particle brain with one region per color), cleaner design with the Geist font and no big title, Key panel explaining every color, Today's notes journal with my daily template, Learn AI course (15 steps with progress and "Teach me" mini lessons), Talk mode (dictate, Claude answers out loud), two new colors: Learn AI and Brand & assets.
- Found my Obsidian vault in Google Drive and added my businesses (Guidify, Investedia), plus draft brand stars (logos still to confirm).
- Limits: a web page can't use the microphone directly, so Talk uses keyboard dictation. For fully hands-free talking, the Claude mobile app's voice mode is the best option.
- Not pushed yet: the latest `projects/second-brain.html` holds personal details (goals, school, work) and stays out of GitHub until this repo is private.

## 2026-10-16
- **Second Brain v2** (https://claude.ai/artifact/RGPX3G4upwNNFNPNxY8Jnz): 3D galaxy of everything I've learned. Capture notes by typing or dictating; AI files them into a cluster, adds tags and links them to related stars. "Ask" answers questions using my notes and can save answers as Research stars. Today page shows what I captured and older notes worth revisiting. Read aloud speaks answers. Inspired by Obsidian (graph, backlinks), Logseq and Reflect (daily notes), Mem (AI filing).
  - Limits: voice works through the device's own dictation (keyboard mic, Fn twice on Mac). Ask can't browse the live web.
- **Setup repo** pushed to GitHub (hellaynr1/Claude2) after installing the Claude GitHub App. Added auto-save rule, `brain/` log and `projects/` sources.
- **Skills added:** daily-plan, web-data (free APIs first, polite scraping), video-notes (read videos via yt-dlp transcripts).
- **Learned:** Claude starts each chat with a blank memory and only "learns" what's saved in CLAUDE.md and skills. APIs vs scraping. Keep API keys secret. OmniRoute ban risks. Fix npm EACCES with sudo. Getting an Anthropic API key.

## 2026-10-15
- **Daybook** (https://claude.ai/artifact/YNuKimVQYiEoxTvTG2ZTUi): Notion-style workspace with tasks (list and board), calendar, goals with target dates, habits, focus timer, notes pages and alarms.
- Added the Playwright MCP server.
