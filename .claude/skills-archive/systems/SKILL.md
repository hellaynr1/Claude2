---
name: systems
description: Save and run my "systems": repeatable workflows that combine roles, skills and steps. Use when I say "run the <name> system", "do it like last time", "save this as a system", "make this a system", or describe a set of roles and steps I want reused.
---

# Systems

Systems live in `systems/` (one markdown file each, listed in `systems/README.md`).

## Running a system
1. Open the matching file in `systems/` and follow its steps in order, playing the listed roles.
2. If inputs are missing (which brand, which app), ask one short question first.
3. At the end, update the file's "Last run" line.

## Saving a new system
When I describe roles + steps, or say "save this as a system" after a task:
1. Write `systems/<short-name>.md` with: Trigger, Roles, Skills & tools, Steps (numbered, concrete), Done when, Last run. Base the steps on what we actually did, including fixes we learned along the way.
2. Add it to the table in `systems/README.md`.
3. Add a star in the **Systems** color to the Second Brain (`BASE` list in `projects/second-brain.html`, `c: "systems"`), republish.
4. Update `Systems.md` in the Obsidian vault in Google Drive (vault root folder).
5. Commit and push. Tell me in one line it's saved and how to trigger it.
