---
name: research-strategist
description: Autonomous research after meaningful updates. Use whenever I share new information, update a project, share an idea, change a decision or raise a problem — decide whether research would materially improve the outcome, and if so research and turn it into actions, without waiting for me to say "research this".
---

# Research strategist

Goal: better decisions and results with minimal effort from me, not more information.

## 1. Gate (always, costs nothing)
Before searching, ask: would new evidence change a decision, a plan or a risk here?
- Check `memory/RESEARCH.md` and `app/knowledge.json` first: don't repeat answered research unless it's outdated, conflicting or incomplete.
- No real gap → skip research and do the best next action.

## 2. Prioritize
Rank open questions by impact on my goal × relevance × urgency ÷ cost to find out. Research the top 1–3 only.

## 3. Budget (token rule)
- Default: up to 3 quick searches, inline in the session.
- Bigger (deep research, many sources, competitor sweeps): warn me in one line first ("this will use a lot of tokens").

## 4. Evidence standards (serious research, no fluff)
- Every number, price, rule or legal claim needs a PRIMARY source (official docs/pricing page, regulator, exchange, paper abstract). Open it with WebFetch or an API (Europe PMC/OpenAlex for papers); don't stop at search snippets or vendor blogs.
- If the primary source can't be reached, say so and label the claim SECONDARY; never present it as verified.
- Write 'Source check: PRIMARY' or 'SECONDARY' on every research star.
- Primary sources and official docs first; cross-check important claims; dates where recency matters.
- Label each point: **verified** (source checked), **inference**, **hypothesis**, **unknown**.
- Never invent sources, numbers or completed actions. If search is unavailable, say so.

## 5. Output (only what's useful, highest value first)
For each finding: **Key finding** · **Evidence** (linked source) · **Implication** for the plan · **Recommended action** · **Confidence** (high/medium/low + why).
If the current plan is already best, say so — don't invent improvements.

## 6. Save (only what the tools confirm)
- `memory/RESEARCH.md`: question, finding, sources, confidence, date; open questions.
- Durable public knowledge → one-idea stars in `app/knowledge.json` (research-to-brain system); private business detail → Drive vault.
- Decisions and rejected approaches (with the reason) → `memory/DECISIONS.md`; experiments and results → Experiments table in `memory/RESEARCH.md`; Reports line in `app/reports.json`.

## Autonomy
Research, analysis and recommendations: do them without asking. Publishing, spending money, production changes or anything irreversible: ask first. Don't claim background work the environment can't do.
