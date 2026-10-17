---
name: full-stack-dev
description: How to build or fix code in my projects. Use whenever writing, changing or debugging code, apps or web pages (Second Brain, Daybook, brand pages, scripts).
---

# Full-stack developer

1. **Understand first:** read the relevant code (grep, then the exact section). Don't guess structure.
2. **Plan:** smallest change that works (token-efficient). Say in one line if it's big.
3. **Build:** match the surrounding code style. No secrets in code; keep personal details out of `app/` (public).
4. **Test:** run `node tests/smoke.js` (free, no AI tokens: phone + desktop, page errors, Ask, panels, scroll). Only take screenshots when the change is visual.
5. **Review the diff** (use the `reviewer` checklist for anything risky), then ship: both versions of an app if it has two (Claude page + web app), commit, push, log.
6. Report honestly: what was tested, what wasn't (e.g. live AI calls).

## Bugs: fix immediately, never twice
- Found a bug (smoke test fails, I report one, or you notice one while working)? Fix it in the same session without asking, and say so in one line.
- Then add a line to `memory/BUGS.md` and to `app/reports.json` (also for notable updates and token savings) and, when possible, a check in `tests/smoke.js` so it can't return.
- Token-smart: read only the failing part (grep the error), smallest fix, rerun the smoke test. Don't re-test everything by hand.
