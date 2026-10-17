# Workflow: nightly run (the only scheduled run)
Replaces: daily optimizer, daily research, weekly content. Scheduled task "Nightly" 20:45 Brussels.

| Contract | |
|---|---|
| **WIP limit** | if a previous `nightly/*` pull request is still open (unreviewed), **stop immediately** (spend nothing) |
| **Steps** | 1 bug check (smoke test + CI) and smallest fix if red · 2 research: top 2 open questions (research workflow) · 3 learn: tomorrow's 3 objectives + due reviews · 4 Sundays: knowledge consolidation + weekly Drive export list + metrics refresh (`tools/metrics.py`) · 5 Sundays: 3 content pieces for the week (content workflow) · 6 run evals · 7 ONE pull request "Nightly YYYY-MM-DD" with a checklist |
| **Outputs** | at most 1 PR per night |
| **Approval point** | owner merges (approve) or closes (reject); merging batches everything |
| **Metric / target** | PRs reviewed ≤48 h ≥80%; merged ≥60% |
| **Kill criterion** | merge rate <30% over 2 weeks → reduce to 3 nights/week |
