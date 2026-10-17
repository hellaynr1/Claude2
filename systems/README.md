# Workflows (redesigned 2026-10-17 from the audit in memory/metrics/AUDIT-2026-10-17.md)

Five workflows plus one nightly run. Each has a contract: inputs, outputs, failure modes, approval point, metric/target, kill criterion. Retired workflows are in `archive/` (moved, not deleted).

| Workflow | Use it for |
|---|---|
| [build](build.md) | features, fixes and bugs in any project |
| [research](research.md) | questions, updates, competitors (primary sources) |
| [content](content.md) | Investedia posts/reels with the compliance gate |
| [learn](learn.md) | lessons, progress, objectives, spaced reviews |
| [close-out](close-out.md) | saving, memory, weekly Drive export |
| [nightly](nightly.md) | the single scheduled run (1 PR max, WIP limit 1) |

Tools (not workflows): daily-plan, video-notes, web-data skills; `content/investedia/tools/render.js`; `tools/metrics.py`; `tools/build-claude-page.py`.
