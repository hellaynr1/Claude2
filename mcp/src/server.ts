// Read-only MCP server for the Second Brain. It reads the public files in github.com/hellaynr1/Claude2,
// so any MCP-capable AI (Claude, ChatGPT, Cursor…) can search the same memory. No private notes here.
import { McpServer } from "@modelcontextprotocol/server";
import { createMcpHandler } from "agents/mcp/server";
import { z } from "zod";

const RAW = "https://raw.githubusercontent.com/hellaynr1/Claude2/main/";
const API = "https://api.github.com/repos/hellaynr1/Claude2/contents/";
type Star = { id: string; c: string; t: string; d?: string; s: string; x?: string[]; l?: string[]; url?: string };
let TOKEN = "";  // set from env per request; a read-only GitHub token is needed once the repo is private

async function file(path: string): Promise<string> {
  // Private repo: GitHub API with a read-only token (secret GITHUB_TOKEN). Public repo: raw file link.
  const r = TOKEN
    ? await fetch(API + path, { headers: { Authorization: `Bearer ${TOKEN}`, Accept: "application/vnd.github.raw+json", "User-Agent": "second-brain-mcp" }, cf: { cacheTtl: 300 } } as RequestInit)
    : await fetch(RAW + path, { cf: { cacheTtl: 300 } } as RequestInit);
  if (!r.ok) throw new Error(`Couldn't read ${path} (${r.status})`);
  return r.text();
}
const stars = async (): Promise<Star[]> => JSON.parse(await file("app/knowledge.json"));
const text = (t: string) => ({ content: [{ type: "text" as const, text: t }] });
const fmt = (s: Star) => `[${s.id}] ${s.t} (${s.c}${s.d ? ", " + s.d : ""})\n${s.s}${s.x?.length ? "\n- " + s.x.join("\n- ") : ""}${s.url ? "\nSource: " + s.url : ""}`;

function createServer() {
  const server = new McpServer({ name: "Second Brain", version: "1.0.0" });

  server.registerTool("search_brain", {
    description: "Search the Second Brain's research and knowledge stars by keywords. Returns the best matches with summaries and sources.",
    inputSchema: { query: z.string().min(2), limit: z.number().int().min(1).max(20).optional() }
  }, async ({ query, limit }) => {
    const words = query.toLowerCase().match(/[a-z0-9À-ɏ]{2,}/g) ?? [];
    const scored = (await stars()).map(s => {
      const hay = `${s.t} ${s.t} ${s.s} ${(s.x ?? []).join(" ")}`.toLowerCase();
      return { s, score: words.reduce((n, w) => n + (hay.split(w).length - 1), 0) };
    }).filter(r => r.score > 0).sort((a, b) => b.score - a.score).slice(0, limit ?? 8);
    return text(scored.length ? scored.map(r => fmt(r.s)).join("\n\n") : `Nothing in the Second Brain matches "${query}".`);
  });

  server.registerTool("get_star", {
    description: "Get one star (research finding or lesson) by its id, with linked star ids.",
    inputSchema: { id: z.string() }
  }, async ({ id }) => {
    const s = (await stars()).find(x => x.id === id);
    return text(s ? fmt(s) + (s.l?.length ? `\nLinked: ${s.l.join(", ")}` : "") : `No star with id "${id}".`);
  });

  server.registerTool("get_memory", {
    description: "Read a memory file: 'context' (who the owner is), 'decisions', 'research' (findings + open questions), 'bugs', 'log' (latest entries), or a project: 'second-brain', 'daybook', 'guidify-investedia', 'investedia-competitors', 'investedia-data-migration'.",
    inputSchema: { name: z.string() }
  }, async ({ name }) => {
    const map: Record<string, string> = { context: "memory/CONTEXT.md", decisions: "memory/DECISIONS.md", research: "memory/RESEARCH.md", bugs: "memory/BUGS.md", log: "brain/log.md", learning: "learning/progress.md" };
    const path = map[name] ?? (/^[a-z0-9-]+$/.test(name) ? `memory/projects/${name}.md` : "");
    if (!path) return text("Unknown memory name.");
    const t = await file(path);
    return text(name === "log" ? t.slice(0, 6000) : t.slice(0, 20000));
  });

  return server;
}

export default {
  fetch(request: Request, env: { GITHUB_TOKEN?: string }, ctx: ExecutionContext) {
    TOKEN = env.GITHUB_TOKEN || "";
    return createMcpHandler(createServer)(request, env, ctx);
  }
} satisfies ExportedHandler;
