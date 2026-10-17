# My AI operating system: map

One place that says where everything lives, so Claude (and any AI tool) can pick up any project without me re-explaining.

| What | Where | Private? |
|---|---|---|
| Profile: how I work, rules | `CLAUDE.md` (loads automatically in Claude Code) | public repo, no personal details |
| Goals, life areas, journal, business plans | Obsidian vault in Google Drive | private |
| Projects: status, links, next step | `memory/projects/*.md` | public repo |
| Decisions: what, why, when to reconsider | `memory/DECISIONS.md` | public repo |
| Session log: what changed, next step | `brain/log.md` (newest first) | public repo |
| Learning progress | `learning/progress.md` (+ copy in the vault) | public repo |
| Skills (how to do recurring work) | `.claude/skills/` | public repo |
| Systems (role + skill recipes) | `systems/` (+ `Systems.md` in the vault) | public repo |
| Short context for ChatGPT / other AIs | `memory/CONTEXT.md` | public repo |

## Session routine (the `personal-intelligence` skill)
- Start: read CLAUDE.md, this map, the project file, the top of `brain/log.md`.
- End: update the project file (status, next step), add decisions to DECISIONS.md, log entry, commit and push.

## Skills: few, sharp, no overlap
| Skill | Use for |
|---|---|
| personal-intelligence | memory: start/end of sessions, keeping project files current |
| full-stack-dev | building or fixing code: understand → plan → build → test phone + computer → review |
| reviewer | self-review and decisions: challenge assumptions, verify facts, security, edge cases |
| anthropic-skills:deep-research (built in) | sourced research reports |
| learning-tracker | lessons, progress, daily objectives |
| daily-plan, web-data, video-notes, systems | planning, data, videos, saved workflows |

Roadmap (add only when a real workflow needs it): startup-strategist, ui-critic, project-manager skills; a SessionStart hook; shared memory server (M5 in `docs/second-brain-plan.md`).
