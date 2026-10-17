# My AI operating system: map

One place that says where everything lives, so Claude (and any AI tool) can pick up any project without me re-explaining.

| What | Where | Private? |
|---|---|---|
| Profile: how I work, rules | `CLAUDE.md` (loads automatically in Claude Code) | public repo, no personal details |
| Goals, life areas, journal, business plans | Obsidian vault in Google Drive | private |
| Projects: status, links, next step | `memory/projects/*.md` | public repo |
| Competitors (Investedia) | `memory/projects/investedia-competitors.md`; repeat with `systems/research.md` | public repo |
| Research log (findings, confidence, open questions) | `memory/RESEARCH.md` | public repo |
| Decisions: what, why, when to reconsider | `memory/DECISIONS.md` | public repo |
| Session log: what changed, next step | `brain/log.md` (newest first) | public repo |
| Learning progress | `learning/progress.md` (+ copy in the vault) | public repo |
| Skills (how to do recurring work) | `.claude/skills/` | public repo |
| Systems (role + skill recipes) | `systems/` (+ `Systems.md` in the vault) | public repo |
| Research the brain knows | `app/knowledge.json` (Claude Code adds, web app loads) | public repo |
| Known bugs + fixes | `memory/BUGS.md`; checks in `tests/smoke.js` (runs free on GitHub every push + nightly) | public repo |
| Reports (tokens, savings, fixes, updates) | app Reports tab: usage measured on the device + `app/reports.json` | public repo |
| Daily research (07:15) | merged into `systems/nightly.md` | public repo |
| Shared memory server (MCP) | `mcp/`: search_brain, get_star, get_memory over the public files; deploy on Cloudflare free plan | public repo |
| Investedia content drafts | `content/investedia/<date>/` (+ renderer in `content/investedia/tools`) | public repo |
| Claude usage over time (baseline for the workflow audit) | `memory/metrics/claude-usage.csv` (from your usage screenshots) | public repo |
| Short context for ChatGPT / other AIs | `memory/CONTEXT.md` | public repo |

## Workflows and skills (redesigned 2026-10-17, see memory/metrics/AUDIT-2026-10-17.md)
| Workflow (systems/) | Skill | Use for |
|---|---|---|
| build | build | features, fixes, bugs |
| research | research | questions, updates, competitors (primary sources) |
| content | content | Investedia posts/reels + compliance gate |
| learn | learn | lessons, progress, reviews |
| close-out | close-out | saving, memory, weekly Drive export |
| nightly | (scheduled) | the one nightly run, 1 PR max, WIP limit 1 |
Tools: daily-plan, video-notes, web-data. Archived: systems/archive/, .claude/skills-archive/.

Roadmap (add only when a real workflow needs it): startup-strategist, ui-critic, project-manager skills; a SessionStart hook; shared memory server (M5 in `docs/second-brain-plan.md`).
