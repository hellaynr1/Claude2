---
name: build
description: Build, change or fix anything in my projects (Second Brain app, Investedia site, scripts, content tools). Use for 'add/change/fix X', bug reports, screenshots of errors and failing tests.
---

Follow `systems/build.md` exactly (contract, steps, gates). Key rules: single source `app/index.html` + `tools/build-claude-page.py`; `node tests/smoke.js` must PASS; every bug gets a regression check and a `memory/BUGS.md` row; one commit per change + Reports line; BIG changes need the owner's yes; say what wasn't tested on a real phone. Before presenting risky changes, attack your own answer: assumptions, edge cases, security, what breaks.
