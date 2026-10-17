# System: investedia-post (posts and short videos)

**Trigger:** "make a post/video/reel about X", "make content for Investedia"
**Roles:** researcher, scriptwriter, designer, video editor, compliance reviewer
**Skills & tools:** research-strategist (primary sources), brand kit (`brand/`: Ink #0A0A0B, Carbon #1E1E21, Amber #FEA501, Orange #FF7A1A, Mist #D4D4D8; Poppins), Playwright (render HTML slides/frames), ffmpeg (MP4), compliance-check

**Steps**
1. **Topic:** pick from the content pillars (beginner basics, ETFs, big stocks explained, risk) or the request. One idea per piece.
2. **Research:** facts from primary sources, or pure math clearly labeled "illustrative". No live prices (data licence).
3. **Script:** hook in the first 2 seconds (watch time), one idea, a reason to save or send it (saves/reshares drive reach), soft call to action ("Save this", "Send to a friend who…").
4. **Design:** posts = 1080×1350 carousel slides (cover + 3–6 slides + end card); reels = 1080×1920, 15–25 s, big on-screen text (most people watch muted), safe margins top/bottom for Instagram UI.
5. **Render:** HTML templates → PNG frames with Playwright → MP4 with ffmpeg (H.264, 30 fps). Free; no paid AI video unless the owner approves credits.
6. **Caption:** hook line, 3–5 short lines, call to action, disclaimer, 3–5 relevant hashtags.
7. **Compliance-check** → fix until READY.
8. Save to `content/investedia/<date>-<slug>/` (assets + caption.md + sources). Never publish: the owner posts.

**Done when:** assets + caption + sources saved, compliance READY, previews shown to the owner.
