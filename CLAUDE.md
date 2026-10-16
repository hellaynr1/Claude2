# Instructions for Claude

These notes load automatically at the start of every Claude Code session on this repository.

## About me
- GitHub: hellaynr1
- I'm building productivity tools, starting with Daybook (tasks, calendar, goals, habits, focus timer, notes, alarms).

## How I like to work
- I'm a total beginner with AI and coding. Explain everything: say what a new word means the first time it comes up, and say why we're doing each step, not just what to type.
- Give exact steps to follow (where to click, what to paste) and tell me what I should see when it works.
- Explain things in plain language and keep answers short.
- Point out when there's a smarter way to do what I'm asking, or a better way to use Claude.
- When you build something, show me the result (a link or screenshot) instead of just describing it.
- Ask before deleting anything. Saving to this repo and pushing it is pre-approved (see Auto-save).

## Tools in this repo
- `.mcp.json` adds the Playwright MCP server, so Claude can open and test web pages in a browser.
- `.claude/skills/` holds custom skills. Each skill is a folder with a `SKILL.md` file: `daily-plan` (plan my day), `web-data` (free APIs and scraping) and `video-notes` (read videos through their transcripts).

## My projects
- Daybook: productivity workspace (tasks, calendar, goals, habits, focus timer, notes, alarms). https://claude.ai/artifact/YNuKimVQYiEoxTvTG2ZTUi
- Second Brain: 3D galaxy I can talk to: capture notes (typing or dictation), AI files and links them, Ask answers from my notes. https://claude.ai/artifact/RGPX3G4upwNNFNPNxY8Jnz
  When we learn something worth keeping, offer to add it here (in CLAUDE.md or a skill) and to the Second Brain.

## Auto-save (every session)
I want everything we build and learn kept. At the end of any session where we built, changed or learned something:
1. Add a dated entry to `brain/log.md`: what we did, what I learned, links to anything published.
2. Put new lessons and preferences in this file (short) and new how-tos in a skill under `.claude/skills/`.
3. Save the latest source of any app you built for me in `projects/` (for example `projects/second-brain.html`, `projects/daybook.html`).
4. Add new lessons, skills and tools to the Second Brain's built-in stars (the `BASE` list in `projects/second-brain.html`) and republish it to the same link.
5. Commit and push to GitHub without asking. Tell me in one line what was saved.
Keep this file lean: rules about me here, know-how in skills, history in `brain/log.md`.
