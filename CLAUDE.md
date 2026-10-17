# Instructions for Claude

These notes load automatically at the start of every Claude Code session on this repository.

## About me
- GitHub: hellaynr1
- I'm building productivity tools, starting with Daybook (tasks, calendar, goals, habits, focus timer, notes, alarms).

## How I like to work
- I'm 20, an adult, intermediate with AI (I know the basics), newer to coding. Don't be childish or generic: define only genuinely new terms, say why we do each step.
- Teaching: basic → intermediate, compact but not too short, practical, with good free online resources (search for them when you can).
- Give exact steps to follow (where to click, what to paste) and tell me what I should see when it works.
- Explain things in plain language and keep answers short.
- Point out when there's a smarter way to do what I'm asking, or a better way to use Claude.
- I often dictate my messages, so names can come out wrong. Read generously and confirm names ("Visidia" = Investedia, "Codify" = Guidify). Give the big picture plus the next step.
- For brand, logo or personal facts: put them in as a draft and ask me to confirm.
- When you build something, show me the result (a link or screenshot) instead of just describing it.
- Ask before deleting anything. Saving to this repo and pushing it is pre-approved (see Auto-save).

## Tokens (order)
- Be token-efficient by default: minimal UI, smallest change that works, no extra polish. Spend more only when I say so.
- Before a big or token-heavy task (long lessons, big redesigns), warn me in one line ("this will use a lot of tokens") so I can choose how to spend my usage limit.

## Memory and projects (rule)
- Remember everything: read CLAUDE.md, `brain/log.md`, `learning/progress.md` and the relevant skill before acting, so I never repeat myself. Save new facts the same session.
- My projects are connected, but never change another project just because one changed. Propose it and wait for my yes.
- Take my instructions with caution and logic: if something conflicts or could break things, say so and suggest the safe version.

## Tools in this repo
- `.mcp.json` adds the Playwright MCP server, so Claude can open and test web pages in a browser.
- `.claude/skills/` holds custom skills. Each skill is a folder with a `SKILL.md` file: `daily-plan` (plan my day), `web-data` (free APIs and scraping), `video-notes` (read videos through their transcripts), `systems` (save and run my repeatable workflows in `systems/`), `learning-tracker` (my AI learning progress in `learning/progress.md`), `personal-intelligence` (memory routine), `full-stack-dev` (build/fix code) and `reviewer` (self-review before important answers).
- `memory/README.md` is the map of my AI operating system: projects, decisions, context for other AIs.

## My projects
- Daybook: productivity workspace (tasks, calendar, goals, habits, focus timer, notes, alarms). https://claude.ai/artifact/YNuKimVQYiEoxTvTG2ZTUi
- Second Brain: 3D galaxy / brain I can talk to: capture notes, daily journal, Learn AI course, Ask, and Talk (spoken answers). https://claude.ai/artifact/RGPX3G4upwNNFNPNxY8Jnz
- Second Brain web app (free, mic works): `app/` → https://hellaynr1.github.io/Claude2/app/ (AI via Puter.js, notes in the browser). Keep personal details out of `app/` because the repo is public.
- My Obsidian vault in Google Drive is my main notes system (projects, planning, journal). Check it for context about my businesses.
  When we learn something worth keeping, offer to add it here (in CLAUDE.md or a skill) and to the Second Brain.

## Everything in sync (rule)
Whenever you build or change something for me, update all three at the same time: the Second Brain (galaxy stars), Google Drive (the right project folder) and this repo. Brand assets live in `brand/` and in Drive under `@ Guidify LLC / <brand> / Brand kit`. Repeatable workflows live in `systems/` (and `Systems.md` in the vault).
- Always keep improving my teaching: track my daily learning time, adapt to how I learn (`learning/progress.md`), add new lessons as I progress (`learning-tracker` skill). The Daily optimizer proposes teaching upgrades every evening.
- Everything must work well on phone and computer: run `node tests/smoke.js` after every app change.
- Bugs: fix them immediately in sessions, log them in `memory/BUGS.md` and add a test so they never return. Unattended agents propose fixes as pull requests.
- Automation: anything that runs without me (scheduled sessions) only prepares and proposes. I approve before any action (merge a pull request, or say yes).

## Auto-save (every session)
I want everything we build and learn kept. At the end of any session where we built, changed or learned something:
1. Add a dated entry to `brain/log.md`: what we did, what I learned, links to anything published.
2. Put new lessons and preferences in this file (short) and new how-tos in a skill under `.claude/skills/`.
3. Save the latest source of any app you built for me in `projects/` (for example `projects/second-brain.html`, `projects/daybook.html`).
4. Add new lessons, skills and tools to the Second Brain's built-in stars (the `BASE` list in `projects/second-brain.html`) and republish it to the same link.
5. Commit and push to GitHub without asking. Tell me in one line what was saved.
Keep this file lean: rules about me here, know-how in skills, history in `brain/log.md`.
