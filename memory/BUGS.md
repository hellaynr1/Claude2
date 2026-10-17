# Bugs: found, fixed, never again

Each fixed bug gets one line here and, if possible, a check in `tests/smoke.js`, so it can't come back. Also add one line at the top of `app/reports.json` (`{"d":date,"at":ISO date-time,"type":"fix"|"update"|"saving"|"research","t":"plain text","c":commit,"repo":"owner/repo"}`) so it shows in the app's Reports tab. Avoid the literal strings "undefined", "NaN" and "[object" there (the smoke test flags them).

| Date | Bug | Cause | Fix | Test |
|---|---|---|---|---|
| 2026-10-17 | Notes list showed "[object HTMLButtonElement]" | replaceChildren doesn't flatten arrays | spread `.flat()` | smoke: panels show no "[object" |
| 2026-10-17 | Talk: "Claude couldn't answer" on iPhone | Puter sign-in popup blocked, old model names | sign in on tap, current models, real error text | manual (needs real Puter) |
| 2026-10-17 | Typed question, nothing happened | box defaulted to Save, not signed in | auto-detect questions, Connect button | smoke: Ask answers |
| 2026-10-17 | Data page empty although the owner had talked with the AI (owner report) | Ask/Talk answers were never saved, only Save-mode notes | logConversation() after every answer + Data page totals | smoke: conversation saved after Ask |
| 2026-10-17 | Mic stayed on after answers and after closing the app (owner report) | Talk restarted listening after every answer; no stop on page hide | stopMic() after answers, on visibilitychange/pagehide and closeTalk | smoke: fake mic block (no restart, released when hidden) |
| 2026-10-17 | New function name `review` clashed with the weekly-review variable: app failed to load (caught before release) | duplicate identifier in one scope | renamed to reviewTopic | smoke: page errors + spaced review block |
| 2026-10-17 | Storage failures silent; malformed records and bad links (self, duplicate) accepted | no validation | cleanNote/cleanLinks + warning toast | smoke: data integrity block |
| 2026-10-17 | Research details rendered as HTML | knowledge.json used html | feed items render as text | manual |
| 2026-10-17 | Progress markers visible in answers | markers not stripped | stripMarks | smoke: no markers in chat |
