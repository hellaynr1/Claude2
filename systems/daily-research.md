# System: daily research (on)

**Trigger:** scheduled task "Daily research", every day at 07:15 Brussels time (approved 2026-10-17). Fresh session each run, push notification when done.
**Limit:** stores no connectors (no Google Drive); uses web search, web pages and GitHub only.
**Rule:** propose only. It opens one pull request "Daily research YYYY-MM-DD" in hellaynr1/Claude2; merge = approve, close = reject.

**Steps**
1. Read CLAUDE.md, the research-strategist skill, memory/RESEARCH.md, DECISIONS.md and project files.
2. Pick the 3 highest-value open questions (no repeats).
3. Research with primary sources; label PRIMARY/SECONDARY.
4. Add findings to RESEARCH.md, stars to app/knowledge.json, lines to app/reports.json, a log line.
5. Run node tests/smoke.js (must PASS), open the pull request with finding · evidence · implication · action · confidence.

**Done when:** a pull request is waiting, or a one-line "nothing worthwhile" summary.
