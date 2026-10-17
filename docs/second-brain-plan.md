# The Second Brain: audit and implementation plan

Date: 2026-10-17 · Current version: artifact v7, https://claude.ai/artifact/RGPX3G4upwNNFNPNxY8Jnz

## 1. What already works (verified in a browser, desktop + phone)

| Area | Status |
|---|---|
| One knowledge graph, two views | Galaxy and Brain are two layouts of the same nodes and links; smooth morph between them; click, orbit, zoom, pinch |
| Visual design | Dark premium UI (Geist font, glass panels), 10 color clusters with a color key, hover/selection highlighting, labels |
| Notes | Capture (type or dictate) → saved privately to the user's Claude account (artifact database, `data/users/<id>/thoughts`); edit title/body/cluster; manual links and backlinks |
| AI filing | On save, Claude (via the artifact's built-in Claude access) proposes title, cluster, tags and links to existing stars |
| Ask | Chat that retrieves notes by keyword scoring, cites them as clickable stars, can save an answer as a Research star |
| Today | Daily journal (one note per day), daily template, "worth revisiting" picks, captured-today list |
| Learn | 16-step AI course with progress saved to the account and "Teach me" mini lessons |
| Talk | Spoken answers (browser text-to-speech), auto-send after dictation, orb states |
| Search | Title/summary/tag search that flies to a star |

Code: one HTML file (~1,200 lines, ~118 KB), Three.js r128 from a CDN, vanilla JavaScript, no build step.

## 2. What is missing, partial or simulated

| Gap | Detail |
|---|---|
| Built-in knowledge is hard-coded | The 73 "learned with Claude" stars live in the page source. Only Claude can change them (by republishing); the owner can't edit them in the app |
| AI overwrites originals | Filing replaces the note's title, cluster and tags without asking. The original text is kept, but there's no "AI suggestion vs mine" separation, no undo |
| No item model beyond basics | No source/provenance, verification status, importance, raw vs distilled vs system distinction, or version history |
| Retrieval is keyword-only | No full-text index, no semantic (vector) search; quality drops as notes grow |
| No export / import / backup | Notes can't leave the artifact. This is the biggest risk: the data is locked in one place |
| Data is only reachable inside the artifact | Each person's notes are private even from Claude Code, so other tools (Claude Code, ChatGPT, Codex) can't read them. No API, no MCP server |
| Microphone | The artifact frame doesn't allow microphone access on this account; voice relies on browser speech recognition (often blocked) or keyboard dictation |
| Views | No Projects, Review, Explore or Settings screens; filters are by category only (no date/project/importance); links don't explain why two items are related |
| Daily optimizer | Runs as a Claude Code scheduled task on the GitHub repo only. It can't see the app's notes or Google Drive (no connectors). It is not part of the app |
| Repo privacy | hellaynr1/Claude2 is public, so personal details are kept out of it and `projects/second-brain.html` in the repo is an older version |
| Testing | AI features were tested with a stand-in; live Claude calls only run on the published page |

## 3. What to reuse

- The visual engine: galaxy layout (force-directed), brain layout (region per cluster), morph, particle brain, labels, camera controls. Port to React Three Fiber, or keep as a self-contained module.
- The interaction model and copy: capture bar, Today, Learn path, Ask with citations, Talk orb, color key.
- The category model (10 clusters), the 73 seed items (become seed data, not code), the systems/skills/CLAUDE.md setup in GitHub.
- The rule set: propose → approve for automation; never lose originals; sync to Drive and GitHub.

## 4. Recommended architecture

**One source of truth: a PostgreSQL database (Supabase).** Everything else reads from it or receives exports from it.

```
                 ┌───────────────────────────── Supabase (source of truth) ─────────────────────────────┐
  Web app        │  Postgres: items, item_versions, links, projects, reviews, suggestions               │
  (Next.js on    │  Auth + row-level security (only you can read your rows)                             │
  Vercel, PWA)───┤  Full-text search (tsvector) + pgvector embeddings                                   │
                 │  Storage: attachments, brand files                                                   │
                 └───────────────▲───────────────────────▲──────────────────────────▲───────────────────┘
                                 │                       │                          │
              Memory API (/api/v1, server-side keys)     │                Nightly job (cron 20:45 Brussels)
                    │            │                       │                writes a Review report; no edits
        MCP server (/api/mcp)    │                       │
          │       │       │      │                       │
   Claude Code  claude.ai  ChatGPT / Codex         Exports (one-way): Google Drive backup (Markdown + JSON),
   (MCP)        (custom    (MCP where the plan     GitHub (only non-private, version-controlled knowledge)
                connector)  supports it)
```

- **Web app:** Next.js + TypeScript + Tailwind; the 3D views in React Three Fiber. Installable on iPhone and Mac as a PWA (progressive web app). Outside the artifact frame, the browser's own speech recognition and microphone work (Chrome; Safari on iPhone).
- **Data model:** `items` (original_content, title, summary, category, tags, kind = raw | distilled | system, source, source_url, status = unverified | verified | outdated, importance, project_id, private flag, timestamps), `item_versions` (every edit, restorable), `links` (from, to, reason, created_by = me | ai, status = suggested | accepted), `suggestions` (AI proposals awaiting approval), `reviews` (nightly reports).
- **AI rule in the schema:** AI output goes into `suggestions` or separate `ai_*` fields, never into `original_content`. Accepting a suggestion creates a version, so it can be undone.
- **AI providers:** a small provider interface (`generate`, `embed`) with Claude as the default and OpenAI optional. API keys stay on the server.
- **Shared memory for other AI tools:** an MCP server with tools such as `search_knowledge`, `get_item`, `get_project_history`, `add_capture` (write = capture only; edits become suggestions). Claude Code connects with `claude mcp add --transport http`; claude.ai and ChatGPT can connect to remote MCP servers as custom connectors on supported plans (check your plan; ChatGPT requires its developer/connector settings). The same API serves all of them, so there is one copy of the knowledge.
- **Google Drive:** nightly one-way export (Markdown per item + a full JSON backup) to a "Second Brain backups" folder. The Obsidian vault stays your planning notebook; the app can import it once, then export to it, rather than both being edited copies.
- **GitHub:** code, schema, skills, systems, CLAUDE.md, and only knowledge you mark as shareable. Make the repo private before anything personal goes in.
- **Nightly optimizer:** a scheduled job (Vercel Cron or Supabase scheduled function) at 20:45 Europe/Brussels that reads new items and writes a Review report (duplicates, suggested links, stale projects, open decisions, workflow ideas) with evidence. You approve items in the Review screen; nothing changes otherwise. The current Claude Code scheduled task can then be retired or kept for repo housekeeping.

## 5. Main risks and limitations

1. **Maintenance load for a beginner.** A real app needs accounts, keys, deployments and updates. Mitigation: small milestones, one stack, no extra services until needed, a setup checklist.
2. **Credentials you must create:** Supabase project, Vercel account, Anthropic API key (separate from the Claude subscription, pay-as-you-go), optionally OpenAI API key and a Google Cloud project for Drive export.
3. **Data migration out of the artifact.** Only the page itself can read your private notes. So the first step is an export button inside the current artifact.
4. **MCP authentication.** Remote MCP for claude.ai/ChatGPT needs OAuth; a personal access token works for Claude Code first. Plan support differs and changes.
5. **3D performance on iPhone.** Needs a lower-detail mode and a fast 2D list for everyday tasks.
6. **Cost creep** from AI calls on every capture. Mitigation: cheap model for filing, caching, monthly cap setting.
7. **Free-tier limits:** Supabase free projects pause after a week of inactivity and have size limits; Vercel Hobby is for personal, non-commercial use.

## 6. Phased plan

| Phase | Goal | Where |
|---|---|---|
| **M1 · Data safety in the current artifact** | Export (JSON + Markdown) and import; AI suggestions you accept or reject instead of silent overwrites; item fields (kind, source, status, importance, project); version history with restore | Existing artifact, no new accounts |
| **M2 · Foundation** | Next.js app on Vercel, Supabase schema + auth + row-level security, import from M1 export, notes CRUD, list/search, Today and quick capture, PWA | New repo (private) |
| **M3 · Signature visuals** | Port Galaxy/Brain to React Three Fiber on the new data; filters (category, project, date, importance); link reasons; low-detail mode | App |
| **M4 · Ask and retrieval** | Full-text + vector search, Ask with citations, personal vs general knowledge labels, missing-info detection, project history summaries | App + Claude API |
| **M5 · Shared memory** | Memory API + MCP server; connect Claude Code first, then claude.ai and ChatGPT where supported | App |
| **M6 · Review and optimizer** | Nightly job at 20:45 Brussels, Review screen with approve/reject, duplicate and stale detection | App + cron |
| **M7 · Exports and polish** | Drive backups with a tested restore, GitHub export of shareable items, offline capture, Settings | App |

## 7. Effort and ongoing costs (estimates)

Effort, working together in sessions: M1 one session; M2 two to three; M3 two; M4 two; M5 one to two; M6 one; M7 one to two. Roughly 10 to 14 sessions in total.

Monthly costs for one person:

| Item | Cost |
|---|---|
| Vercel Hobby | free (personal use) |
| Supabase free tier | free (pauses when idle; the Pro plan is paid if you outgrow it) |
| Claude API: Haiku 5.5 ($0.10 in / $0.50 out per million tokens) for filing and the nightly review | about $1–3 |
| Claude API: Sonnet 5.5 ($2 / $10) or Opus 5.5 ($4 / $20) for Ask | about $5–20 at ~20 questions a day |
| Embeddings (Anthropic has no embeddings endpoint; use a provider such as Voyage AI or OpenAI) | under $1 |
| Domain name (optional) | about €10–15 a year |

Estimate assumes about 30 captures, 20 questions and one nightly review a day (~7 million input and ~0.7 million output tokens a month). Claude Pro or ChatGPT Plus subscriptions do not include API usage; the API is billed separately per token.

## 8. Smallest useful milestone first: M1

Inside the current artifact, without any new accounts:
1. **Export / import:** download all notes, journal, progress and links as JSON and as Markdown; import a file back.
2. **Original vs AI:** filing produces a suggestion card (title, cluster, tags, links with reasons) that you accept, edit or reject; your original title and text are never overwritten.
3. **Item fields:** kind (raw / distilled / system), source, status (unverified / verified / outdated), importance, project.
4. **Version history:** every edit keeps the previous version; restore with one click.

This protects your data now and makes the move to M2 a simple import.
