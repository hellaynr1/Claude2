# System: brand-kit

**Trigger:** "make a brand kit for <brand>", "logos and assets for <brand>"
**Roles:** brand designer, researcher, file organizer
**Skills & tools:** web-data (find the logo), Google Drive connector, Python + fonttools, Playwright (render PNGs), artifacts (brand kit page)

**Steps**
1. Find the real logo: chat uploads first, then the brand's Drive folder, then the top-left logo on its website. Never invent a new logo without asking.
2. Sample the exact colors from the logo and identify the font. Confirm anything uncertain with the owner.
3. Generate the kit as SVG with text turned into shapes (`brand/brandkit.py`): logos (dark/light, wordmarks), profile pictures (normal + circle-safe), icon/app icon/favicon, banners (LinkedIn, X, YouTube, website share image), Instagram highlight covers, post and story templates, guidelines sheet.
4. Render every SVG to PNG and check a preview sheet for broken glyphs or layout issues.
5. Publish a brand kit page with previews, PNG/SVG downloads and a "Save all to Google Drive" button.
6. Run **sync-everything** (Drive folder `@ Guidify LLC / <brand> / Brand kit`, galaxy stars, repo `brand/<brand>/`).

**Done when:** every asset exists as PNG + SVG, is in Drive and the repo, and the owner has seen a preview.
**Last run:** 2026-10-17, Investedia (25 assets).
