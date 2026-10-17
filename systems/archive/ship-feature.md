# System: ship-feature

**Trigger:** "add X to the app", "change X", "improve X"
**Roles:** product engineer, tester, reviewer
**Skills & tools:** full-stack-dev, reviewer, Playwright, tests/smoke.js, tools/build-claude-page.py

**Steps**
1. Restate the goal in one line; decide small (just do it) or BIG (ask first, see CLAUDE.md autonomy rule).
2. Read only the relevant code (grep); plan the smallest change.
3. Build in `app/index.html` (single source); match the code style.
4. Test: `node tests/smoke.js` (phone + desktop) + a targeted check of the new behavior; add a test if it can break again.
5. Screenshots at 390px and desktop; fix what looks off (one pass).
6. Ship: build + publish the Claude page, commit (one change per commit), push, Reports line with commit and time, log.
7. Show the owner the result (screenshot/link) and what wasn't tested live.

**Done when:** live, tested, visible in Reports, undoable.
