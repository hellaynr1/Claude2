# Workflow: build (features, fixes, bugs)
Merges: build-app, ship-feature, bug-fix, full-stack-dev, reviewer. Skill: `build`.

| Contract | |
|---|---|
| **Inputs** | a request ("add/change/fix X"), a screenshot or a failing test |
| **Outputs** | one commit per change in the single source (`app/index.html`, Investedia repo…), passing `node tests/smoke.js`, Claude page rebuilt (`tools/build-claude-page.py`), a Reports line with commit + time, phone + desktop screenshot when visual |
| **Steps** | restate goal → small or BIG? (CLAUDE.md autonomy) → read only relevant code → smallest change → test (+ a regression check for every bug) → screenshot → ship → tell the owner what wasn't tested on a real device |
| **Failure modes** | breaks on a real phone (Puter sign-in, mic, Safari); two copies drift; untested AI paths |
| **Approval point** | none for small reversible changes; owner's yes for BIG ones |
| **Metric / target** | owner-found defects reaching live ≤1/week; fix commits ≤8% of commits; smoke on main 100% |
| **Kill criterion** | n/a (core). Review the steps if defects >2/week for 2 weeks |
