// Smoke test for the Second Brain web app: phone + desktop, no real AI calls (Puter is mocked).
// Run: node tests/smoke.js   → prints PASS or the failures, exits 1 on failure. Costs no AI tokens.
const http = require("http"), fs = require("fs"), path = require("path");
let pw; try { pw = require("playwright"); } catch { pw = require(require("child_process").execSync("npm root -g").toString().trim() + "/playwright"); }
const root = path.join(__dirname, "..", "app"), fails = [];
const check = (ok, msg) => { if (!ok) fails.push(msg); };
const server = http.createServer((q, r) => { const f = path.join(root, decodeURIComponent(q.url.split("?")[0]).replace(/\/$/, "/index.html")); fs.readFile(f, (e, b) => { if (e) { r.writeHead(404); return r.end(); } r.writeHead(200, { "Content-Type": f.endsWith(".json") ? "application/json" : "text/html" }); r.end(b); }); }).listen(0);
const MOCK = `window.puter={auth:{isSignedIn:()=>true,signIn:async()=>{}},fs:{read:async()=>{throw{code:'subject_does_not_exist'}},write:async()=>({})},
 ai:{chat:async(m,o)=>{const t='Answer.\\n[progress:tokens:learning]\\n[learnstyle: likes examples]';
 if(o&&o.stream)return(async function*(){yield{text:t}})();return{message:{content:[{text:'[]'}]}};}}};`;
(async () => {
  for (const f of ["knowledge.json", "reports.json"]) { try { JSON.parse(fs.readFileSync(path.join(root, f), "utf8")); } catch (e) { check(false, f + " is not valid JSON: " + e.message); } }
  const url = `http://localhost:${server.address().port}/`;
  const b = await pw.chromium.launch({ args: ["--use-gl=swiftshader", "--enable-webgl", "--ignore-gpu-blocklist"] });
  for (const [name, vp, mobile] of [["phone", { width: 390, height: 844 }, true], ["desktop", { width: 1300, height: 860 }, false]]) {
    const p = await b.newPage({ viewport: vp, isMobile: mobile, hasTouch: mobile }), errs = [];
    p.on("pageerror", e => errs.push(e.message));
    await p.route("https://js.puter.com/**", r => r.fulfill({ contentType: "application/javascript", body: MOCK }));
    await p.goto(url); await p.waitForTimeout(2500);
    const tab = t => p.evaluate(t => [...document.querySelectorAll("button")].find(x => x.textContent.trim().startsWith(t)).click(), t);
    await tab("Ask"); await p.fill("#cap-text", "what is a token?"); await p.keyboard.press("Enter"); await p.waitForTimeout(1200);
    const chat = await p.textContent("#chat").catch(() => "");
    check(chat.includes("Answer."), `${name}: Ask got no answer`);
    check(!/\[(progress|learnstyle)/.test(chat), `${name}: hidden markers visible in chat`);
    for (const t of ["Notes", "Today", "Learn", "Key", "Data", "Reports"]) { await tab(t); await p.waitForTimeout(250); const txt = await p.textContent("#panel").catch(() => ""); check(!/\[object |undefined|NaN/.test(txt), `${name}: ${t} panel shows broken text: ${(txt.match(/.{0,40}(\[object |undefined|NaN).{0,20}/) || [""])[0]}`); }
    check(await p.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `${name}: horizontal scroll`);
    check(errs.length === 0, `${name}: page errors: ${errs.join(" | ")}`);
    await p.close();
  }
  // Data integrity + editing: malformed records survive, links are cleaned, edits persist after reload
  {
    const p = await b.newPage({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true }), errs = [];
    p.on("pageerror", e => errs.push(e.message));
    await p.route("https://js.puter.com/**", r => r.fulfill({ contentType: "application/javascript", body: MOCK }));
    await p.addInitScript(() => { if (!sessionStorage.getItem("seeded")) { sessionStorage.setItem("seeded", "1"); localStorage.setItem("sb.local", JSON.stringify({ n1: { title: "Seed note alpha", note: "hello", cluster: "ideas", links: ["n1", "n2", "n2", 5], tags: [] }, n2: { title: "Seed note beta", note: "x", cluster: "ideas", links: [] }, bad: null })); } });
    await p.goto(url); await p.waitForTimeout(2500);
    await p.fill("#q", "Seed note alpha"); await p.keyboard.press("Enter"); await p.waitForTimeout(600);
    check(await p.$("#ed-body"), "search did not open the seeded note");
    const drawer = await p.textContent("#drawer").catch(() => "");
    check(drawer.includes("Seed note beta"), "connected star not shown in the detail panel");
    await p.fill("#ed-body", "hello edited"); await p.waitForTimeout(1200);
    check((await p.textContent("#ed-saved").catch(() => "")).includes("Saved"), "no save feedback after editing");
    const stored = await p.evaluate(() => JSON.parse(localStorage.getItem("sb.local")));
    check(stored.n1 && JSON.stringify(stored.n1.links) === '["n2"]', "links not cleaned (self/duplicate/non-string): " + JSON.stringify(stored.n1 && stored.n1.links));
    check(!("bad" in stored), "malformed record was kept");
    await p.reload(); await p.waitForTimeout(2500);
    await p.fill("#q", "Seed note alpha"); await p.keyboard.press("Enter"); await p.waitForTimeout(600);
    check((await p.inputValue("#ed-body").catch(() => "")) === "hello edited", "edit did not persist after reload");
    check(errs.length === 0, "data test page errors: " + errs.join(" | "));
    await p.close();
  }
  // Spaced review: a due topic shows in Learn, ✓ schedules the next review
  {
    const p = await b.newPage({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true }), errs = [];
    p.on("pageerror", e => errs.push(e.message));
    await p.route("https://js.puter.com/**", r => r.fulfill({ contentType: "application/javascript", body: MOCK }));
    await p.addInitScript(() => { localStorage.setItem("sb.learned", JSON.stringify(["prompting"])); localStorage.setItem("sb.reviews", JSON.stringify({ prompting: { stage: 0, due: 0 } })); });
    await p.goto(url); await p.waitForTimeout(2500);
    await p.evaluate(() => [...document.querySelectorAll("button")].find(x => x.textContent.trim().startsWith("Learn")).click()); await p.waitForTimeout(400);
    check((await p.textContent("#review-due").catch(() => "")).includes("Review due"), "review card missing in Learn");
    await p.click("#review-due button[aria-label='I got it right']"); await p.waitForTimeout(300);
    const rv = await p.evaluate(() => JSON.parse(localStorage.getItem("sb.reviews")));
    check(rv.prompting && rv.prompting.stage === 1 && rv.prompting.due > Date.now() + 2 * 864e5, "review not rescheduled: " + JSON.stringify(rv));
    check(errs.length === 0, "review test page errors: " + errs.join(" | "));
    await p.close();
  }
  await b.close(); server.close();
  console.log(fails.length ? "FAIL\n- " + fails.join("\n- ") : "PASS"); process.exit(fails.length ? 1 : 0);
})().catch(e => { console.log("FAIL\n- test crashed: " + e.message); process.exit(1); });
