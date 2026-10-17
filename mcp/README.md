# Second Brain MCP server (free, Cloudflare Workers)

Lets any MCP-capable AI (Claude, Claude Code, Cursor, ChatGPT where supported) read the same memory:
- `search_brain(query)`: research and knowledge stars from `app/knowledge.json`
- `get_star(id)`: one star with its links
- `get_memory(name)`: context, decisions, research, bugs, log, learning, or a project file

Read-only and public data only (it reads this public repo). Private notes are not included; adding them needs a login (GitHub OAuth) first.

## Deploy (once, about 5 minutes, free)
1. Make a free account at https://dash.cloudflare.com/sign-up
2. On your Mac, in Terminal:
   ```
   git clone https://github.com/hellaynr1/Claude2 && cd Claude2/mcp
   npm install
   npx wrangler login        # opens the browser: click Allow
   npm run deploy
   ```
3. You'll see a URL like `https://second-brain-mcp.<your-name>.workers.dev`. Your server is at that URL + `/mcp`.

Free plan: 100,000 requests/day (Cloudflare Workers pricing page, checked 2026-10-17).

## When the repo is private
The server then needs a read-only GitHub token:
1. github.com → Settings → Developer settings → Personal access tokens → **Fine-grained tokens → Generate new token**.
2. Repository access: **Only select repositories → Claude2**. Permissions: **Contents: Read-only**. Expiration: 90 days (renew later).
3. In Terminal (in `Claude2/mcp`): `npx wrangler secret put GITHUB_TOKEN` and paste the token. Never put it in a file or chat.
4. Protect the server itself too: add it to the same Cloudflare Access setup (only your email), because it will serve private data.

## Connect it
- **Claude Code:** `claude mcp add --transport http second-brain https://second-brain-mcp.<your-name>.workers.dev/mcp`
- **claude.ai / Claude app:** Settings → Connectors → Add custom connector → paste the `/mcp` URL.
- **ChatGPT:** add it as a custom MCP connector if your plan supports it.

## Test locally
`npm run dev`, then send MCP requests to `http://localhost:8787/mcp` (or use `npx @modelcontextprotocol/inspector`).
