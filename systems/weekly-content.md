# System: weekly content (on)

**Trigger:** scheduled task "Weekly content", every Monday 07:45 Brussels (approved 2026-10-17). Fresh session, push notification.
**Rule:** propose only: one pull request "Weekly content YYYY-MM-DD" in hellaynr1/Claude2. Merge = approve; you post the content yourself. No paid credits, no posting, no Investedia repo changes.

**Steps:** plan 3 pieces (pillars, no repeats) → primary-source facts or labeled math → render with `content/investedia/tools/render.js` (reels with voice-over + subtitles) → check frames → compliance-check until READY → save to `content/investedia/<date>/` with captions, sources, compliance table, posting days → Reports + log → smoke test → pull request.
**Done when:** a pull request with 3 ready pieces is waiting.
