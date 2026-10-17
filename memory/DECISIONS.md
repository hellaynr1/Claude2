# Decisions

Newest first. Format: decision · why · alternatives · reconsider when.

- **2026-10-17 · Shared memory via a read-only MCP server on Cloudflare Workers (approved).** Public data only, no login needed yet. Alternatives: Supabase + Vercel (more upkeep). Reconsider: when private notes should be included → add GitHub OAuth.

- **2026-10-17 · Daily research run at 07:15 Brussels** (scheduled task trig_01WuM4sHVVZUSsd3Ti1i9doF): 3 open questions/day, primary sources, one pull request. Why: owner wants much more research. Cost: daily usage. Reconsider: if weekly limit runs out or PRs are low value.

- **2026-10-17 · Autonomy for small changes.** Claude makes small, reversible changes in any project without asking; big ones (delete, money, legal/data-source on live sites, redesigns, data storage, new publishing, hard to undo) still need a yes. Every change: own commit + Reports line with link; undo = git revert. Scheduled (unattended) runs stay pull-request only.

- **2026-10-17 · APPROVED (option 1) + news cleanup approved and done.** Yahoo stays until TradingView confirms, to avoid showing sample prices.
- **2026-10-17 · (was proposed) replace Yahoo scraping in Investedia with licensed/permitted sources.** Why: Yahoo's terms ban automated collection, commercial reuse and redistribution (primary source). Proposal (corrected after TradingView ToS check): while Investedia earns nothing, TradingView widgets with attribution after written OK from TradingView; once monetized, a paid licence that includes public display; CoinGecko only after confirming Demo-plan commercial terms; FRED kept with its required notice. Alternatives: paid licensed API with public-display rights (cost), or end-of-day data only. Reconsider: if TradingView terms forbid commercial sites.

- **2026-10-17 · Fast model by default in the app; smart model for lessons and "in depth" questions.** · Saves usage. · Reconsider: answers feel too shallow.
- **2026-10-17 · Confirmed: Guidify LLC is the company; Investedia is its investing-education brand.** ("Codify" in dictation = Guidify.)
- **2026-10-17 · Build an AI operating system from what exists, not 50 skills.** Few sharp skills + memory files + verification. · Alt: install many skills. · Reconsider: a recurring workflow has no skill.
- **2026-10-17 · Teaching level: intermediate adult, compact lessons with resources.** · Alt: beginner style. · Reconsider: lessons feel too hard or too light.
- **2026-10-17 · Token-efficient by default; warn before big tasks.** · Usage limit is shared between learning and projects.
- **2026-10-17 · Everything free.** AI in the Claude page uses the subscription; the web app uses Puter.js (free account, no API key); sync via a private Puter file. · Alt: Claude API (paid per token), Supabase + Vercel (later, M5). · Reconsider: Puter limits or need for shared memory across tools.
- **2026-10-17 · Automation only proposes.** Daily optimizer (20:45 Brussels) opens a pull request; merge = approve. · Reconsider: never without my yes.
- **2026-10-17 · Personal details stay out of the public repo.** Private stuff lives in the Drive vault. · Reconsider: repo made private (note: free GitHub Pages needs a public repo).
- **2026-10-17 · Web app for the mic.** Claude pages can't use the microphone; the web app on GitHub Pages / githack can. 
- **2026-10-16 · GitHub repo hellaynr1/Claude2 is the home for instructions, skills and app code.**

- **2026-10-17 · PROPOSED (legal → needs yes): news page safety.** Keep headline + source + link; drop the description snippets or cap them at ~100 characters; drop Yahoo Finance RSS (Yahoo ToS). Small risk today, easy to undo.

## Rejected approaches (and why)
- **Twelve Data free plan for Investedia** · rejected 2026-10-17: Basic plan is internal non-display, non-commercial only.
- **Scraping Yahoo Finance for a public site** · rejected 2026-10-17 (pending owner): violates Yahoo's terms.
- **Paid Claude API for the app** · rejected 2026-10-17: owner wants everything free; Puter.js + Claude page subscription instead. Revisit if Puter limits block daily use.
- **Supabase + Vercel backend now** · deferred: adds accounts and upkeep; revisit at M5 (shared memory via MCP).
- **Mic inside the Claude page** · not possible: the page frame blocks microphone access; the web app is used for voice.
- **Many overlapping skills** · rejected: few sharp skills + memory + verification work better (context engineering research).
- **OmniRoute** · not used: account ban risk discussed 2026-10-16.
- **Galaxy designs A and B** · not chosen 2026-10-17; C (nebula spiral) chosen.
