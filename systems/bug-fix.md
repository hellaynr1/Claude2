# System: bug-fix

**Trigger:** "X is broken", a screenshot of an error, a failing smoke test
**Roles:** debugger, tester
**Skills & tools:** full-stack-dev, Playwright, tests/smoke.js, memory/BUGS.md

**Steps**
1. Reproduce it (same screen size, same steps); if it can't be reproduced, say so and ask for one detail.
2. Find the cause by grepping the error; read only the failing part.
3. Smallest fix; no unrelated changes.
4. Add a check to `tests/smoke.js` that fails without the fix; run it until PASS.
5. Line in `memory/BUGS.md` (date, bug, cause, fix, test) and in Reports; commit, push, publish if the app changed.
6. Tell the owner in 2 lines: what was wrong, what changed.

**Done when:** fixed, tested, logged, can't silently return.
