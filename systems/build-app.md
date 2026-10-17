# System: build-app

**Trigger:** "build me an app", "add <feature> to <app>", "improve the design"
**Roles:** product designer, front-end developer, tester
**Skills & tools:** artifacts (+ capabilities: db for saving, sample for AI, mcp for connectors), Playwright for testing

**Steps**
1. Restate the goal in one line and list the features. Check which page abilities this account has before promising something (for example, the microphone isn't available).
2. Design tokens first (colors, fonts, layout), clean and modern; avoid generic AI looks.
3. Build in one file; keep user data in the account (db), never in the page source.
4. Test in a browser: every feature, desktop + phone width, no console errors, no sideways scrolling. Use a stand-in for Claude to test AI features.
5. Look at screenshots and fix what looks off (one pass), then publish to the same link.
6. Send screenshots, explain what's new in plain words, list what couldn't be tested live.
7. Run **sync-everything**.

**Done when:** published, tested, screenshots sent, synced.
**Last runs:** Daybook (2026-10-15), Second Brain v1–v3 (2026-10-16/17).
