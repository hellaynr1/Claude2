// Code-graded evals for each workflow (systems/*.md). Runs in CI on every push; exit 1 on any failure.
// Model-graded cases (judgement) live in rubrics.json and are scored by the nightly run.
const fs = require("fs"), path = require("path"), { execSync } = require("child_process");
const R = p => path.join(__dirname, "../..", p), read = p => fs.readFileSync(R(p), "utf8"), exists = p => fs.existsSync(R(p));
const results = {}, add = (wf, name, ok, why = "") => (results[wf] = results[wf] || []).push({ name, ok: !!ok, why: ok ? "" : why });
const FORBID = /undefined|NaN|\[object /;

// build
const html = read("app/index.html");
add("build", "single source builds the Claude page", (() => { try { execSync(`python3 ${R("tools/build-claude-page.py")} /tmp/eval-claude-page.html`, { stdio: "pipe" }); return !fs.readFileSync("/tmp/eval-claude-page.html", "utf8").includes("window.SBWeb = "); } catch { return false; } })(), "build-claude-page.py failed or left the Puter adapter in");
add("build", "every bug-log row names a test or 'manual'", read("memory/BUGS.md").split("\n").filter(l => /^\| 20\d\d-/.test(l)).every(l => l.split("|").slice(-2, -1)[0].trim().length > 2), "a BUGS.md row has an empty Test column");
const reports = JSON.parse(read("app/reports.json"));
add("build", "Reports entries are valid", reports.every(r => r.d && r.type && r.t && !FORBID.test(r.t)), "a reports.json entry misses d/type/t or contains a forbidden string");
add("build", "offline service worker is registered", exists("app/sw.js") && html.includes('register("sw.js")'), "sw.js missing or not registered");
add("build", "no personal details in the public app", !/odisee|bpost|salary|iban|wachtwoord|password:/i.test(html + read("app/knowledge.json")), "personal keyword found in app/");
add("build", "mic is released on hide and after answers", /function stopMic/.test(html) && /visibilitychange[\s\S]{0,80}stopMic/.test(html), "stopMic wiring missing");

// research
const stars = JSON.parse(read("app/knowledge.json")), ids = new Set();
add("research", "star ids are unique", stars.every(s => !ids.has(s.id) && ids.add(s.id)), "duplicate star id");
add("research", "stars have id/c/t/s", stars.every(s => s.id && s.c && s.t && s.s), "a star misses a field");
add("research", "research stars state their source check", stars.filter(s => s.c === "research" && s.id.startsWith("r-")).every(s => (s.x || []).some(x => /Source check: (PRIMARY|SECONDARY)/.test(x)) || s.id === "r-my-os-map" || s.id === "r-ai-os"), "a research star has no PRIMARY/SECONDARY label");
add("research", "research stars link a source", stars.filter(s => s.c === "research" && s.id.startsWith("r-") && !["r-my-os-map", "r-ai-os"].includes(s.id)).every(s => /^https:\/\//.test(s.url || "")), "a research star has no https source url");
const rrows = read("memory/RESEARCH.md").split("## Experiments")[0].split("\n").filter(l => /^\| 2026-/.test(l) && l.split("|").length >= 6);
add("research", "research log rows have confidence and source", rrows.every(l => { const c = l.split("|").map(x => x.trim()); return c[4] && c[5]; }), "a RESEARCH.md row misses confidence/source");
add("research", "no forbidden strings in stars", !FORBID.test(JSON.stringify(stars)), "forbidden string in knowledge.json");

// content
const days = exists("content/investedia") ? fs.readdirSync(R("content/investedia")).filter(d => /^\d{4}-\d\d-\d\d$/.test(d)) : [];
for (const d of days) {
  const md = read(`content/investedia/${d}/README.md`);
  add("content", `${d}: disclaimer present`, /not financial advice/i.test(md), "missing 'not financial advice'");
  add("content", `${d}: sources section`, /##\s*Sources/i.test(md), "missing Sources section");
  add("content", `${d}: compliance table all READY/PASS`, /Compliance/i.test(md) && !/\bFIX\b/.test(md), "compliance missing or a FIX left");
  add("content", `${d}: no advice phrasing in captions`, !/\b(you should (buy|invest in)|buy now|guaranteed profit|can't lose)\b/i.test(md.split("## Sources")[0].replace(/"[^"]*"/g, "")), "advice-like phrasing outside quotes");
  for (const sub of fs.readdirSync(R(`content/investedia/${d}`)).filter(x => x.startsWith("post-"))) {
    const png = fs.readFileSync(R(`content/investedia/${d}/${sub}/slide-01.png`));
    add("content", `${d}/${sub}: 1080x1350 slides`, png.readUInt32BE(16) === 1080 && png.readUInt32BE(20) === 1350, "slide size is not 1080x1350");
  }
}

// learn
const prog = read("learning/progress.md");
for (const sec of ["Today's objectives", "How I learn best", "Learned", "Learning now"]) add("learn", `progress has "${sec}"`, prog.includes("## " + sec), `section ${sec} missing`);
add("learn", "spaced reviews wired in the app", /reviewTopic\(id, true\)/.test(html) && /IV = \[1, 3, 7, 21\]/.test(html), "spaced review code missing");

// close-out + contracts
for (const f of fs.readdirSync(R("systems")).filter(f => f.endsWith(".md") && f !== "README.md")) {
  const t = read("systems/" + f);
  add("close-out", `contract complete: ${f}`, f === "nightly.md" ? /WIP limit/.test(t) && /Kill criterion/.test(t) : ["Inputs", "Outputs", "Failure modes", "Approval point", "Metric", "Kill criterion"].every(k => t.includes(k)), "contract field missing");
}
const claude = read("CLAUDE.md");
add("close-out", "skills named in CLAUDE.md exist", ["build", "research", "content", "learn", "close-out"].every(s => exists(`.claude/skills/${s}/SKILL.md`) && claude.includes("`" + s + "`")), "a skill is missing or not listed");
add("close-out", "log has today's or a recent entry", (() => { const m = read("brain/log.md").match(/## (\d{4}-\d\d-\d\d)/); return m && (Date.now() - Date.parse(m[1])) / 864e5 < 8; })(), "brain/log.md has no entry in the last 7 days");

// report
let fail = 0; const summary = {};
for (const [wf, rs] of Object.entries(results)) { const ok = rs.filter(r => r.ok).length; summary[wf] = `${ok}/${rs.length}`; rs.filter(r => !r.ok).forEach(r => { fail++; console.log(`FAIL [${wf}] ${r.name}: ${r.why}`); }); }
fs.mkdirSync(R("memory/metrics"), { recursive: true });
fs.writeFileSync(R("memory/metrics/evals-latest.json"), JSON.stringify({ at: new Date().toISOString(), summary, results }, null, 1));
console.log("EVALS", JSON.stringify(summary)); process.exit(fail ? 1 : 0);
