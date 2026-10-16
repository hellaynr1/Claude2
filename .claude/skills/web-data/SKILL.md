---
name: web-data
description: Get data from the internet into a project, for free where possible: find and call public APIs, or scrape public web pages when no API exists. Use when I ask to pull, fetch, collect, track or scrape data from a website or service (prices, weather, news, listings, stats, anything online), or to connect a project to an API.
---

# Getting web data (free first)

Explain each step to me in plain language. I'm learning, so say what an API key, endpoint or selector is the first time it comes up.

## 1. Pick the method, in this order
1. **Free public API, no key** (examples: Open-Meteo for weather, Frankfurter for currency rates, REST Countries, Wikipedia, Hacker News, PokeAPI). Check the public-apis list on GitHub for the topic.
2. **Free API with a free key** (examples: NewsAPI, OpenWeatherMap, NASA, YouTube Data, Google Maps free tier). Tell me where to sign up and what the free limit is.
3. **Official export or RSS feed** (CSV downloads, RSS/Atom feeds, sitemaps).
4. **Scraping**, only if none of the above exist.

Say which option you picked and why, in one line.

## 2. Rules for APIs
- Never put an API key in code that gets committed or published. Use an environment variable or a `.env` file listed in `.gitignore`, and tell me how to set it.
- Respect the free limit: cache results and don't call more often than needed.
- Handle errors (rate limits, network failures) with a clear message.

## 3. Rules for scraping
- Only public pages that don't need a login. Never scrape personal data about private people.
- Check the site's `robots.txt` and terms first. If they forbid scraping, stop and suggest another source.
- Go slowly: at least 1–2 seconds between requests, and never hammer a site.
- Prefer a plain HTTP request plus an HTML parser. Use the Playwright browser only when the page needs JavaScript to show its content.
- Don't get around CAPTCHAs, paywalls or bot-blocking. If a site blocks you, tell me and find another source.

## 4. Deliver
- Save results in a simple format (JSON or CSV) unless I ask for something else.
- Show me a small sample of the real data you got, so I can see it worked.
- If it needs to run on a schedule, explain the free ways to do that (GitHub Actions, a cron job).
