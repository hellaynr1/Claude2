# System: daily optimizer (on)

**Trigger:** scheduled task "Daily optimizer", every day at 20:45 Brussels time (approved 2026-10-17). Push notification when a pull request is ready.
**Limit:** the scheduled task has no connectors, so it can't read Google Drive; recreate it from claude.ai's scheduled tasks screen with Google Drive enabled to add that.
**Roles:** coach, archivist, editor
**Skills & tools:** this repo, systems, Google Drive (read the Obsidian vault), Second Brain source

**Rule: propose, never act.** The session works on its own but changes nothing that matters until the owner approves.

**Steps**
1. Read `brain/log.md`, CLAUDE.md, skills, systems and the Obsidian vault's weekly note (read-only).
2. Study: what was built, what went wrong, what got repeated, what to learn next on the Learn AI path.
2b. **Teaching coach (every run):** read `learning/progress.md` (learned, learning now, How I learn best, daily time). Propose: 1–3 new lessons that build on what I learned, clearer explanations for topics I'm stuck on, and updates to my learner profile. Check that everything works on phone and computer.
3. Draft improvements on a new branch `optimizer/<date>`: clearer rules in CLAUDE.md, new or better skills and systems, new galaxy stars, a short "what I learned this week" entry.
4. Open a pull request titled "Daily proposals <date>" with a plain-language summary and a checklist. Send a push notification.
5. Stop. Nothing is merged, published, uploaded to Drive or sent anywhere.
6. Owner reviews: **merge = approve**, **close = reject**, a comment = change request. In the next normal session, Claude applies approved items to the galaxy and Drive (sync-everything).

**Done when:** a pull request with proposals is waiting for review.
