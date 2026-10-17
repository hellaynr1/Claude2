# Research log

What was researched, what we concluded, how sure we are. Check here before researching again.
Labels: verified · inference · hypothesis · unknown. Source check per finding: PRIMARY (official docs, regulator, paper abstract) or SECONDARY (blogs, vendors, summaries).

## Corrections after primary-source check (2026-10-17)
- Prompt caching: reads are 0.05x on Opus/Sonnet 5.5 (0.025x Fable 5.1), not 0.1x; minimum 512 tokens on current models (Anthropic docs).
- beehiiv: referral program is NOT on the free plan; needs Lite (from $49/mo annual) (beehiiv pricing).
- Market data: Euronext delayed data is free to USE; DISTRIBUTION (public display) may need terms/fees (Euronext delayed-data terms).
- Google scaled content abuse: confirmed verbatim (Search Central, updated 2026-08-28).
- Deliberate practice figures: confirmed in the 2014 abstract.
- TOB caps added (1,300 / 1,600 / 4,000 euro), still secondary.

| Date | Question | Finding | Confidence | Sources |
|---|---|---|---|---|
| 2026-10-17 | What makes a personal AI OS smart? | Memory quality + small context + consolidation beat more tools/skills | high (Anthropic posts, Letta docs) | knowledge.json: r-context-eng, r-agent-memory |
| 2026-10-17 | Finfluencer rules for Investedia (EU/BE) | Educate, don't advise; advice needs FSMA authorization; disclose conflicts and sponsors | medium (secondary + Wikifin) | r-finfluencer-rules, r-esma-social |
| 2026-10-17 | What drives Reels reach? | Watch time, likes per reach, sends per reach | medium (reported, not Mosseri's own post) | r-reels-signals |
| 2026-10-17 | Investedia competitors | Winners own one promise/tool, SEO page per ticker, free newsletter | medium (Semrush estimates, mixed months) | memory/projects/investedia-competitors.md |
| 2026-10-17 | Official Belgian finfluencer guidance | ESMA BE factsheet (Jan 2026): responsible for posts, disclose all benefits openly, true/fair/clear, facts vs opinions, high-risk products warning | high (primary PDF) | r-be-factsheet |
| 2026-10-17 | Best way to retain what I learn | Spaced retrieval (quiz at 1/3/7 days) beats rereading; effect varies by subject | high (meta-analyses) | r-spaced-retrieval |
| 2026-10-17 | How to grow a newsletter | Referral link + milestone rewards once readers already share | medium (third-party case studies) | r-referral-newsletter |

| 2026-10-17 | Programmatic SEO risk | Fine only with unique value per page; scaled content abuse manual actions since 2025 | medium (secondary; check Google Search Central) | r-pseo |
| 2026-10-17 | Newsletter platform | beehiiv (0% cut, referrals, free to ~2.5k) vs Substack (10%, discovery) | medium (reviews) | r-newsletter-platforms |
| 2026-10-17 | Can Investedia show market data free? | Displaying exchange data can require licences/fees; delayed/EOD cheaper | medium (vendors, exchange price lists) | r-market-data-license |
| 2026-10-17 | Affiliate links | Disclose clearly; EU specifics unknown | low | r-affiliate-disclosure |
| 2026-10-17 | Young investors' interests | Beginners, ETFs, big-name stocks, crypto (seen as risky) | medium (N26 + US surveys) | r-genz-investors |
| 2026-10-17 | Belgian ETF taxes | TOB 0.12/1.32/0.35% by registration; 30% dividend tax | medium (one source conflicts) | r-be-etf-tax |
| 2026-10-17 | Prompt caching | reads ~0.1x, writes 1.25x/2x | medium (third-party; verify Anthropic) | r-prompt-caching |
| 2026-10-17 | Build an MCP server | TS SDK, stdio local / HTTP remote | medium | r-build-mcp |
| 2026-10-17 | Evals | specific criteria + many automated tests | high (Anthropic docs) | r-evals |
| 2026-10-17 | Deliberate practice | 26/21/18/4% variance by domain; quality matters | high (meta-analysis + critiques) | r-deliberate-practice |
| 2026-10-17 | Self-explanation | small-moderate effect; Feynman untested directly | high (meta-analysis) | r-self-explanation |

## Open questions
- FSMA's own page (fsma.be) still not found; the ESMA Belgium factsheet covers the basics.
- Investopedia traffic and social stats (not found).
- Same-month traffic comparison for all competitors (one tool).
- EU rules for broker affiliate links (MiFID II inducements, Unfair Commercial Practices).
- Your data provider's public-display terms for Investedia.
- Free hosting for a personal MCP server.
- Google Search Central's own scaled-content page (verify).

## Experiments (what we tried, result)
| Date | Experiment | Result | Next |
|---|---|---|---|
| 2026-10-17 | Fast model (Haiku) by default for Ask | Typical Ask ~1,100 input tokens; quality not yet judged by owner | Owner feedback after a week |
| 2026-10-17 | Weekly review in the app | Works in tests; no real-use data yet | Check suggestions quality after first real run |
| 2026-10-17 | Milky Way galaxy (design C) | Looks right at 390px + desktop in tests | Owner check on iPhone (smoothness) |
