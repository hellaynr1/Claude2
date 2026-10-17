# Workflow: research
Merges: research-strategist, research-to-brain, competitor-watch, daily research. Skill: `research`.

| Contract | |
|---|---|
| **Inputs** | a question, a meaningful update, or the open questions in `memory/RESEARCH.md` |
| **Outputs** | findings with PRIMARY/SECONDARY labels and links in `memory/RESEARCH.md`; one-idea stars in `app/knowledge.json`; decisions in `memory/DECISIONS.md`; Reports line |
| **Steps** | gate (would it change a decision? already answered?) → top 1–3 questions → open primary sources (docs, regulators, papers via Europe PMC/OpenAlex) → finding · evidence · implication · action · confidence → save. Competitor checks: same tool + same month for every number |
| **Failure modes** | secondary sources passed off as facts; repeating answered research; research that changes nothing |
| **Approval point** | none to research; owner's yes for actions it recommends that are BIG |
| **Metric / target** | share of findings with a PRIMARY source ≥70%; ≥1 decision changed or confirmed per week |
| **Kill criterion** | 2 weeks with no finding that changed or confirmed a decision → cut the nightly research step |
