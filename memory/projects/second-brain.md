# Second Brain
**Status:** working. Claude page v23 (built from app/index.html) https://claude.ai/artifact/RGPX3G4upwNNFNPNxY8Jnz · web app `app/` → https://hellaynr1.github.io/Claude2/app/ (GitHub Pages, live)
**What:** 3D galaxy/brain of everything I learn: capture, Today journal, Learn course (36+ topics, daily time, streak, adaptive teaching), Ask, Talk (voice), Data export/backup, mobile bottom-sheet panels.
**Plan:** `docs/second-brain-plan.md` (M1 done; M2–M7 later).
**Open:** cross-device sync not yet verified on real devices (tests only cover one browser).
**Live check 2026-10-17:** Pages deployed commit 3bcf1a4; the live index.html serves the new code; smoke-test green.
**Next step (agreed 2026-10-17):** consolidate before new features.
1. ✅ Done (v21): build script. Remaining check: open the Claude page and confirm saving, Ask and Drive backup work with real Claude access. Old plan: `app/index.html` the single source. The Claude page can't load files from GitHub (its page rules only allow certain CDNs), so add a small build script (`tools/build-claude-page.py`) that generates the Claude page from `app/index.html`: swap the Puter adapter for the Claude adapter (window.claude: db, sample, Drive) and inline `knowledge.json`. Personal stars stay out of the public repo (keep them in the Claude page's private database or the Drive vault).
2. Verify the live app after each deploy (GitHub Pages run + check the new code is served).
3. Owner test: same Puter account on iPhone + MacBook, note and progress sync both ways.
4. Then: galaxy intelligence (related ideas, insight → next action).
