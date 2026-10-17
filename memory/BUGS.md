# Bugs: found, fixed, never again

Each fixed bug gets one line here and, if possible, a check in `tests/smoke.js`, so it can't come back. Also add one line at the top of `app/reports.json` (`{"d":date,"type":"fix"|"update"|"saving"|"research","t":"plain text"}`) so it shows in the app's Reports tab. Avoid the literal strings "undefined", "NaN" and "[object" there (the smoke test flags them).

| Date | Bug | Cause | Fix | Test |
|---|---|---|---|---|
| 2026-10-17 | Notes list showed "[object HTMLButtonElement]" | replaceChildren doesn't flatten arrays | spread `.flat()` | smoke: panels show no "[object" |
| 2026-10-17 | Talk: "Claude couldn't answer" on iPhone | Puter sign-in popup blocked, old model names | sign in on tap, current models, real error text | manual (needs real Puter) |
| 2026-10-17 | Typed question, nothing happened | box defaulted to Save, not signed in | auto-detect questions, Connect button | smoke: Ask answers |
| 2026-10-17 | Progress markers visible in answers | markers not stripped | stripMarks | smoke: no markers in chat |
