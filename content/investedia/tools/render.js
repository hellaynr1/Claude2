// Renders Investedia carousels (1080x1350 PNG) and reels (1080x1920 MP4) from HTML. Free: Playwright + ffmpeg.
// Usage: node render.js <spec.json> <outDir>
const fs = require("fs"), path = require("path"), { execSync } = require("child_process");
let pw; try { pw = require("playwright"); } catch { pw = require(execSync("npm root -g").toString().trim() + "/playwright"); }
const [specFile, out] = process.argv.slice(2), spec = JSON.parse(fs.readFileSync(specFile, "utf8"));
const brand = path.resolve(__dirname, "../../../brand"), b64 = f => fs.readFileSync(f).toString("base64");
const font = f => "data:font/ttf;base64," + b64(brand + "/fonts/" + f);  // embedded: pages can't read local files
const CSS = `@font-face{font-family:P;src:url(${font("Poppins-Regular.ttf")});font-weight:400}
@font-face{font-family:P;src:url(${font("Poppins-SemiBold.ttf")});font-weight:600}
@font-face{font-family:P;src:url(${font("Poppins-Bold.ttf")});font-weight:700}
*{box-sizing:border-box;margin:0}html,body{width:100%;height:100%;background:#0A0A0B;color:#fff;font-family:P,sans-serif;overflow:hidden}
.f{position:absolute;inset:0;padding:110px 96px;display:flex;flex-direction:column;justify-content:center;gap:34px;background:radial-gradient(120% 80% at 85% 0%,rgba(254,165,1,.16),transparent 60%),#0A0A0B}
.k{color:#FEA501;font-weight:600;font-size:34px;letter-spacing:.14em;text-transform:uppercase}
h1{font-weight:700;font-size:96px;line-height:1.04;letter-spacing:-.02em}h2{font-weight:700;font-size:72px;line-height:1.08}
p{font-size:42px;line-height:1.35;color:#D4D4D8}.a{color:#FEA501}.o{color:#FF7A1A}.s{font-size:28px;color:#8A8A93;line-height:1.4}
.num{font-weight:700;font-size:150px;letter-spacing:-.03em;line-height:1}.pill{display:inline-block;background:#1E1E21;border:2px solid #2A2A2E;border-radius:999px;padding:14px 30px;font-size:34px;font-weight:600;color:#D4D4D8}
.card{background:#1E1E21;border:2px solid #2A2A2E;border-radius:36px;padding:44px 48px}.foot{position:absolute;left:96px;right:96px;bottom:70px;display:flex;justify-content:space-between;align-items:center}
.foot img{height:54px}.foot span{font-size:26px;color:#8A8A93}.n{font-size:30px;color:#8A8A93;font-weight:600}
.bar{height:34px;border-radius:17px;background:#2A2A2E;overflow:hidden}.bar i{display:block;height:100%;border-radius:17px}`;
const logo = "data:image/png;base64," + b64(brand + "/investedia/png/06-logo-horizontal-white.png");
const page = (inner, w, h) => `<!doctype html><html><head><meta charset="utf-8"><style>${CSS}</style></head><body style="width:${w}px;height:${h}px">${inner}<script>${spec.script || ""}</script></body></html>`;
(async () => {
  fs.mkdirSync(out, { recursive: true });
  const b = await pw.chromium.launch();
  if (spec.kind === "carousel") {
    const p = await b.newPage({ viewport: { width: 1080, height: 1350 } });
    for (const [i, s] of spec.slides.entries()) {
      const foot = `<div class="foot"><img src="${logo}"><span>${i + 1}/${spec.slides.length}</span></div>`;
      await p.setContent(page(`<div class="f">${s}</div>${foot}`, 1080, 1350), { waitUntil: "load" });
      await p.evaluate(() => document.fonts.ready);
      await p.screenshot({ path: path.join(out, `slide-${String(i + 1).padStart(2, "0")}.png`) });
    }
  } else {
    const fps = 30, frames = Math.round(spec.seconds * fps), tmp = path.join(out, ".frames");
    fs.mkdirSync(tmp, { recursive: true });
    const p = await b.newPage({ viewport: { width: 1080, height: 1920 } });
    await p.setContent(page(spec.html.replaceAll("{{LOGO}}", logo), 1080, 1920), { waitUntil: "load" });
    await p.evaluate(() => document.fonts.ready);
    for (let f = 0; f < frames; f++) {
      await p.evaluate(t => window.render(t), f / fps);
      await p.screenshot({ path: path.join(tmp, `f${String(f).padStart(5, "0")}.jpg`), type: "jpeg", quality: 92 });
    }
    execSync(`ffmpeg -y -loglevel error -framerate ${fps} -i ${tmp}/f%05d.jpg -c:v libx264 -pix_fmt yuv420p -crf 20 -movflags +faststart ${path.join(out, spec.file || "reel.mp4")}`);
    fs.rmSync(tmp, { recursive: true });
    await p.evaluate(t => window.render(t), spec.posterAt || 1.5);
    await p.screenshot({ path: path.join(out, "poster.png") });
  }
  await b.close(); console.log("rendered", out);
})();
