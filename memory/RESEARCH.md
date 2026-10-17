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

## Investedia market data: provider terms (checked 2026-10-17)
**Current state (verified in hellaynr1/Investedia):** no licensed provider. `update_market.py` / `update_prices.py` call Yahoo Finance's unofficial chart endpoint (query1.finance.yahoo.com/v8/finance/chart) every 10 min on weekdays via GitHub Actions and publish the results as quotes.js; `update_market.py` also pulls FRED CSVs; `update_news.py` pulls Google News RSS, Yahoo Finance RSS, CoinDesk and Cointelegraph RSS.

| Source | What the official terms say | Verdict |
|---|---|---|
| Yahoo (Terms of Service, legal.yahoo.com) | Bans collecting data "using any automated means" without prior permission; no reuse "for any commercial purpose"; must not "distribute, transmit, broadcast"; must not use data "to create any database, archive, mobile application, data feed, widget" | **Not permitted** as used now (verified, primary). Regional Yahoo Finance section not fully read. |
| FRED API terms (St. Louis Fed) | Apps must show the notice that the product "is not endorsed or certified by the Federal Reserve Bank of St. Louis" and link the terms; series marked "Copyright" are third-party owned and need the owner's permission beyond personal use; keep proprietary notices | **Usable with conditions** (verified, primary). Uses the CSV download, not the API: same caution applies. |
| TradingView widgets (tradingview.com/widget, widget FAQ) | Free "for FREE with default TradingView branding", embeddable "onto any website"; stock data delayed per exchange requirements; forex and crypto real-time; logo removal only by contacting them; no explicit commercial-use clause found | **Free but NOT for commercial use without an agreement.** Terms of Use §3: "we do not permit commercial usage of any of our services or APIs" unless a separate agreement; licence "strictly limited to personal or internal business purposes"; no distribution of market data "for any form of compensation"; §4 attribution to TradingView required (verified, primary, tradingview.com/policies). |
| CoinGecko Demo API (pricing page) | 10,000 calls/month, 100 calls/min, "Attribution required"; commercial use not clearly stated for Demo | **OK for crypto with attribution** (verified, primary); commercial terms unclear. |
| Twelve Data Basic (pricing page) | 8 credits/min, 800/day; "Internal non-display usage"; individual data for "personal, internal, and non-commercial purposes" | **Not for public display** on the free plan (verified, primary). |
| Euronext delayed data (terms PDF) | Free to use; distribution may require fees and Subscriber Terms | Free for internal use; public display = check terms (verified, primary). |
| Google News RSS | No published developer terms found (Google URL 404) | **Unknown**: treat headlines + links as low risk, full text as not allowed; to verify. |

**Conclusion:** no free source found that clearly allows public display on a commercial site. Options: (1) keep Investedia non-commercial and use TradingView widgets with attribution, after confirming with TradingView via their contact form that an educational site qualifies; (2) for a monetized site, buy a licence that explicitly includes public display (quote needed); (3) show only own content + FRED (with notice) + links out.
**Assumptions needing legal confirmation:** whether TradingView widgets may be used on a site that earns money (ads/affiliates); whether showing headline + link from RSS is fine under Google/Yahoo terms; FRED third-party series used.

- FSMA's own page (fsma.be) still not found; the ESMA Belgium factsheet covers the basics.
- Investopedia traffic and social stats (not found).
- Same-month traffic comparison for all competitors (one tool).
- EU rules for broker affiliate links (MiFID II inducements, Unfair Commercial Practices).
- ✅ Investedia data terms checked (see table above). Remaining: TradingView commercial-use confirmation; RSS headline terms (partly answered: headline+link fine under EU art. 15; Yahoo feed reuse restricted; publisher RSS terms not found).
- Free hosting for a personal MCP server.
- Google Search Central's own scaled-content page (verify).

## Experiments (what we tried, result)
| Date | Experiment | Result | Next |
|---|---|---|---|
| 2026-10-17 | Fast model (Haiku) by default for Ask | Typical Ask ~1,100 input tokens; quality not yet judged by owner | Owner feedback after a week |
| 2026-10-17 | Weekly review in the app | Works in tests; no real-use data yet | Check suggestions quality after first real run |
| 2026-10-17 | Spaced review card in Learn (1/3/7/21 days, self-graded) | Works in tests; reviews saved per device (not synced yet) | Owner use; sync later if useful |
| 2026-10-17 | Milky Way galaxy (design C) | Looks right at 390px + desktop in tests | Owner check on iPhone (smoothness) |
