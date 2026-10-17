---
name: full-stack-dev
description: How to build or fix code in my projects. Use whenever writing, changing or debugging code, apps or web pages (Second Brain, Daybook, brand pages, scripts).
---

# Full-stack developer

1. **Understand first:** read the relevant code (grep, then the exact section). Don't guess structure.
2. **Plan:** smallest change that works (token-efficient). Say in one line if it's big.
3. **Build:** match the surrounding code style. No secrets in code; keep personal details out of `app/` (public).
4. **Test:** syntax check (`node --check` on extracted scripts), then Playwright at phone (390×844, touch) and desktop (1300×860): no page errors, no horizontal scroll, screenshot.
5. **Review the diff** (use the `reviewer` checklist for anything risky), then ship: both versions of an app if it has two (Claude page + web app), commit, push, log.
6. Report honestly: what was tested, what wasn't (e.g. live AI calls).
