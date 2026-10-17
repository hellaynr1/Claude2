"""Investedia brand kit generator: writes self-contained SVGs (text converted to outlines)."""
import os, sys
from fontTools.ttLib import TTFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen

OUT = sys.argv[1]
FONTS = os.path.join(os.path.dirname(os.path.abspath(__file__)), "fonts")  # Poppins, SIL Open Font License
os.makedirs(OUT, exist_ok=True)

INK = "#0A0A0B"; CARBON = "#1E1E21"; GRAPHITE = "#2A2A2E"; AMBER = "#FEA501"; ORANGE = "#FF7A1A"
WHITE = "#FFFFFF"; MIST = "#D4D4D8"; SLATE = "#8A8A93"; GAIN = "#22C55E"; LOSS = "#F04444"

_fonts = {}
def font(w):
    if w not in _fonts:
        f = TTFont(os.path.join(FONTS, f"Poppins-{w}.ttf"))
        _fonts[w] = (f, f.getGlyphSet(), f.getBestCmap(), f["head"].unitsPerEm, f["hmtx"])
    return _fonts[w]

def measure(text, size, w="SemiBold", track=0.0):
    f, gs, cmap, upm, hmtx = font(w)
    s = size / upm
    adv = [hmtx[cmap.get(ord(ch), cmap[ord("?")])][0] * s for ch in text]
    return sum(adv) + track * size * max(0, len(text) - 1)

def text(t, size, x, y, fill, w="SemiBold", track=0.0, anchor="start", opacity=None):
    """Return an SVG <path> for the text, baseline at y."""
    f, gs, cmap, upm, hmtx = font(w)
    s = size / upm
    width = measure(t, size, w, track)
    cx = x - (width if anchor == "end" else width / 2 if anchor == "middle" else 0)
    ds = []
    for ch in t:
        g = cmap.get(ord(ch), cmap[ord("?")])
        pen = SVGPathPen(gs, ntos=lambda v: ("%.1f" % v).rstrip("0").rstrip("."))
        gs[g].draw(TransformPen(pen, (s, 0, 0, -s, cx, y)))
        ds.append(pen.getCommands())
        cx += hmtx[g][0] * s + track * size
    op = f' opacity="{opacity}"' if opacity is not None else ""
    return f'<path d="{" ".join(ds)}" fill="{fill}"{op}/>', width

def wordmark(x, y, size, color=WHITE, dot=AMBER, anchor="start"):
    """'Investedia' with the brand's amber dot on the i."""
    word = "Investedıa"
    width = measure(word, size, "SemiBold", -0.01)
    left = x - (width if anchor == "end" else width / 2 if anchor == "middle" else 0)
    p, _ = text(word, size, left, y, color, "SemiBold", -0.01)
    f, gs, cmap, upm, hmtx = font("SemiBold")
    s = size / upm
    pre = measure("Invested", size, "SemiBold", -0.01) - 0.01 * size * 0 + (-0.01 * size)
    ig = cmap[0x131]; iw = hmtx[ig][0] * s
    xh = f["OS/2"].sxHeight * s
    cxd = left + measure("Invested", size, "SemiBold", -0.01) + (-0.01 * size) + iw / 2
    r = size * 0.078
    circ = f'<circle cx="{cxd:.2f}" cy="{y - xh - size * 0.135:.2f}" r="{r:.2f}" fill="{dot}"/>'
    return p + circ, width

def chart(x0, y0, w, h, line=AMBER, area=CARBON, stroke=None, outline=INK, pts=None):
    """The brand chart: a rising zig-zag line with a dark area below it."""
    pts = pts or [(-0.02, .78), (.40, .45), (.56, .62), (1.02, .18)]
    P = [(x0 + px * w, y0 + py * h) for px, py in pts]
    sw = stroke or h * .085
    line_d = "M" + " L".join(f"{a:.1f},{b:.1f}" for a, b in P)
    area_pts = [(x0 + px * w, y0 + py * h + sw * 1.2) for px, py in pts]
    area_d = "M" + " L".join(f"{a:.1f},{b:.1f}" for a, b in area_pts) + f" L{x0 + w * 1.02:.1f},{y0 + h:.1f} L{x0 - w * .02:.1f},{y0 + h:.1f} Z"
    out = f'<path d="{area_d}" fill="{area}"/>'
    if outline:
        out += f'<path d="{line_d}" fill="none" stroke="{outline}" stroke-width="{sw * 1.9:.1f}" stroke-linejoin="round" stroke-linecap="butt"/>'
    out += f'<path d="{line_d}" fill="none" stroke="{line}" stroke-width="{sw:.1f}" stroke-linejoin="round" stroke-linecap="butt"/>'
    return out

def svg(w, h, body, bg=INK, rx=0, title=""):
    rect = f'<rect width="{w}" height="{h}" rx="{rx}" fill="{bg}"/>' if bg else ""
    clip = f'<defs><clipPath id="c"><rect width="{w}" height="{h}" rx="{rx}"/></clipPath></defs>'
    return (f'<svg xmlns="http://www.w3.org/2000/svg" width="{w}" height="{h}" viewBox="0 0 {w} {h}">'
            f'<title>{title}</title>{clip}<g clip-path="url(#c)">{rect}{body}</g></svg>')

files = {}
def save(name, content):
    files[name] = content
    with open(os.path.join(OUT, name), "w") as fh:
        fh.write(content)

# ---------- 1. Logo mark / app icon / favicon ----------
def mark_body(S, line_w=None):
    return chart(0, S * .30, S, S * .70, stroke=line_w or S * .075, outline=INK)
save("01-icon-mark.svg", svg(1024, 1024, mark_body(1024), rx=0, title="Investedia icon"))
save("02-app-icon-rounded.svg", svg(1024, 1024, mark_body(1024), rx=224, title="Investedia app icon"))
save("03-favicon.svg", svg(64, 64, chart(0, 22, 64, 42, stroke=6.5, outline=None), rx=14, title="Investedia favicon"))

# ---------- 2. Profile pictures ----------
def profile(S, circle_safe=False):
    wm, ww = wordmark(S / 2, S * (.43 if not circle_safe else .45), S * (.135 if not circle_safe else .115), anchor="middle")
    return wm + chart(0, S * .52, S, S * .48, stroke=S * .06)
save("04-profile-picture.svg", svg(1080, 1080, profile(1080), title="Investedia profile picture"))
save("05-profile-picture-circle-safe.svg", svg(1080, 1080, profile(1080, True), title="Investedia profile picture (circle-safe)"))

# ---------- 3. Logos (transparent) ----------
def horizontal(dark_bg=True):
    H = 360; icon = 280; pad = 40
    ic = f'<g transform="translate({pad},{(H - icon) / 2})"><rect width="{icon}" height="{icon}" rx="62" fill="{INK}"/>{chart(0, icon * .30, icon, icon * .70, stroke=icon * .075, outline=INK).replace("<path", "<path clip-path=\"url(#ic)\"")}</g>'
    defs = f'<defs><clipPath id="ic"><rect width="{icon}" height="{icon}" rx="62"/></clipPath></defs>'
    wm, ww = wordmark(pad + icon + 56, H * .66, 150, color=WHITE if dark_bg else INK)
    W = int(pad + icon + 56 + ww + pad)
    return W, H, defs + ic + wm
W, H, body = horizontal(True)
save("06-logo-horizontal-white.svg", svg(W, H, body, bg=None, title="Investedia logo, for dark backgrounds"))
W, H, body = horizontal(False)
save("07-logo-horizontal-black.svg", svg(W, H, body, bg=None, title="Investedia logo, for light backgrounds"))
for nm, col, bg in [("08-wordmark-white.svg", WHITE, None), ("09-wordmark-black.svg", INK, None), ("10-wordmark-amber.svg", AMBER, None)]:
    wm, ww = wordmark(30, 190, 200, color=col, dot=AMBER if col != AMBER else WHITE)
    save(nm, svg(int(ww + 60), 260, wm, bg=bg, title="Investedia wordmark"))

# ---------- 4. Banners ----------
def banner(W, H, safe=None, tag="Invest with clarity."):
    sx, sy, sw_, sh = safe or (0, 0, W, H)
    size = sh * .26
    body = chart(0, H * .55, W, H * .45, stroke=H * .045, pts=[(-0.02, .80), (.30, .55), (.42, .70), (.70, .30), (.80, .42), (1.02, .05)])
    wm, ww = wordmark(sx + sw_ * .07, sy + sh * .40, size)
    t, _ = text(tag, size * .36, sx + sw_ * .07 + size * .02, sy + sh * .40 + size * .62, MIST, "Regular")
    u, _ = text("investedia.com", size * .22, sx + sw_ * .93, sy + sh * .18, SLATE, "Medium", 0.04, anchor="end")
    return body + wm + t + u
save("11-banner-linkedin-1584x396.svg", svg(1584, 396, banner(1584, 396), title="Investedia LinkedIn banner"))
save("12-banner-x-twitter-1500x500.svg", svg(1500, 500, banner(1500, 500, safe=(0, 60, 1500, 380)), title="Investedia X header"))
save("13-banner-youtube-2560x1440.svg", svg(2560, 1440, banner(2560, 1440, safe=(507, 509, 1546, 423)), title="Investedia YouTube banner (safe area centered)"))
save("14-website-share-image-1200x630.svg", svg(1200, 630, banner(1200, 630, safe=(0, 40, 1200, 520), tag="We teach, inspire and guide you to invest smarter."), title="Investedia website share image (Open Graph)"))

# ---------- 5. Instagram highlight covers ----------
def cover(icon_paths, label):
    S = 1080
    ring = f'<circle cx="{S/2}" cy="{S/2 - 40}" r="250" fill="{CARBON}"/><circle cx="{S/2}" cy="{S/2 - 40}" r="250" fill="none" stroke="{AMBER}" stroke-width="10"/>'
    g = f'<g transform="translate({S/2 - 110},{S/2 - 150})" fill="none" stroke="{AMBER}" stroke-width="18" stroke-linecap="round" stroke-linejoin="round">{icon_paths}</g>'
    t, _ = text(label.upper(), 54, S / 2, S / 2 + 330, WHITE, "SemiBold", 0.12, anchor="middle")
    return svg(S, S, ring + g + t, title=f"Investedia highlight cover: {label}")
ICONS = {
    "About": '<circle cx="110" cy="110" r="96"/><path d="M110 98v62"/><circle cx="110" cy="62" r="4" fill="#FEA501"/>',
    "Tips": '<path d="M70 140c-22-16-34-38-34-62a74 74 0 01148 0c0 24-12 46-34 62v24H70z"/><path d="M78 196h64M90 218h40"/>',
    "POV": '<path d="M10 110c30-52 66-78 100-78s70 26 100 78c-30 52-66 78-100 78S40 162 10 110z"/><circle cx="110" cy="110" r="34"/>',
    "Learn": '<path d="M20 50c34-12 62-10 90 10v150c-28-20-56-22-90-10z"/><path d="M200 50c-34-12-62-10-90 10v150c28-20 56-22 90-10z"/>',
    "Results": '<path d="M20 200V20M20 200h190"/><path d="M50 160l46-48 34 30 66-80"/><path d="M158 62h38v38"/>',
}
for i, (k, v) in enumerate(ICONS.items()):
    save(f"{15 + i}-highlight-{k.lower()}.svg", cover(v, k))

# ---------- 6. Post templates (4:5) ----------
def post_frame(S_W, S_H, inner, kicker):
    head, _ = wordmark(72, 118, 46)
    k, _ = text(kicker.upper(), 26, S_W - 72, 112, AMBER, "SemiBold", 0.14, anchor="end")
    foot_l, _ = text("investedia.com", 26, 72, S_H - 64, SLATE, "Medium", 0.04)
    foot_r, _ = text("Save this for later", 26, S_W - 72, S_H - 64, SLATE, "Medium", 0.02, anchor="end")
    rule = f'<rect x="72" y="{S_H - 120}" width="{S_W - 144}" height="2" fill="{GRAPHITE}"/>'
    return head + k + inner + rule + foot_l + foot_r

def lines(ts, size, x, y, fill, w="SemiBold", lh=1.12, anchor="start"):
    return "".join(text(t, size, x, y + i * size * lh, fill, w, -0.01, anchor)[0] for i, t in enumerate(ts))

W, H = 1080, 1350
tip = (lines(["Start small.", "Stay consistent."], 112, 72, 420, WHITE)
       + lines(["€50 a month for 20 years beats waiting", "for the perfect moment to start."], 40, 72, 700, MIST, "Regular", 1.4)
       + chart(0, 900, W, 330, stroke=26, pts=[(-0.02, .85), (.25, .62), (.38, .74), (.62, .40), (.74, .50), (1.02, .08)]))
save("20-post-template-tip.svg", svg(W, H, post_frame(W, H, tip, "Tip #01"), title="Investedia post template: tip"))

bars = "".join(f'<rect x="{110 + i * 82}" y="{1130 - hgt}" width="52" height="{hgt}" rx="10" fill="{AMBER if i == 9 else GRAPHITE}"/>' for i, hgt in enumerate([60, 80, 75, 110, 140, 135, 190, 240, 300, 380]))
pov = (lines(["POV: you invested", "€100 a month", "starting in 2016"], 92, 72, 360, WHITE)
       + text("Example for illustration. Not financial advice.", 28, 72, 680, SLATE, "Regular")[0]
       + bars + text("2016", 26, 110, 1180, SLATE, "Medium")[0] + text("2025", 26, 110 + 9 * 82 + 52, 1180, AMBER, "SemiBold", anchor="end")[0])
save("21-post-template-pov.svg", svg(W, H, post_frame(W, H, pov, "POV"), title="Investedia post template: POV / case study"))

quote = (text("“", 300, 60, 560, AMBER, "Bold")[0]
         + lines(["The best time to", "invest was yesterday.", "The next best", "time is today."], 86, 72, 640, WHITE)
         + text("Investedia lesson", 32, 72, 1080, SLATE, "Medium", 0.04)[0])
save("22-post-template-lesson.svg", svg(W, H, post_frame(W, H, quote, "Lesson"), title="Investedia post template: lesson / quote"))

carousel = (text("01", 200, 72, 520, AMBER, "SemiBold")[0]
            + lines(["What is an ETF?"], 96, 72, 680, WHITE)
            + lines(["One basket, hundreds of companies.", "Swipe to learn how it works  →"], 40, 72, 780, MIST, "Regular", 1.45))
save("23-post-template-carousel-cover.svg", svg(W, H, post_frame(W, H, carousel, "Learn"), title="Investedia carousel cover"))

# ---------- 7. Story template ----------
W, H = 1080, 1920
story = (wordmark(W / 2, 260, 64, anchor="middle")[0]
         + text("INVESTING TIP OF THE DAY", 34, W / 2, 520, AMBER, "SemiBold", 0.14, anchor="middle")[0]
         + lines(["Diversify.", "Don't put all your", "eggs in one basket."], 92, W / 2, 700, WHITE, anchor="middle")
         + chart(0, 1380, W, 540, stroke=36, pts=[(-0.02, .80), (.35, .50), (.50, .64), (1.02, .12)])
         + text("Link in bio → investedia.com", 34, W / 2, 1250, MIST, "Medium", anchor="middle")[0])
save("24-story-template.svg", svg(W, H, story, title="Investedia story template"))

# ---------- 8. Brand guidelines sheet ----------
W, H = 1920, 1200
sw = [("Ink", INK, "Backgrounds"), ("Carbon", CARBON, "Chart area, cards"), ("Graphite", GRAPHITE, "Lines, dividers"), ("Amber", AMBER, "Brand accent"), ("Orange", ORANGE, "Website accent"), ("White", WHITE, "Headlines"), ("Mist", MIST, "Body text"), ("Slate", SLATE, "Captions")]
sheet = text("Investedia brand kit", 64, 96, 150, WHITE, "SemiBold", -0.01)[0]
sheet += text("Invest with clarity.", 32, 96, 205, SLATE, "Regular")[0]
for i, (n, c, use) in enumerate(sw):
    x = 96 + (i % 4) * 300; y = 290 + (i // 4) * 250
    sheet += f'<rect x="{x}" y="{y}" width="260" height="140" rx="20" fill="{c}" stroke="{GRAPHITE}" stroke-width="2"/>'
    sheet += text(n, 30, x, y + 185, WHITE, "SemiBold")[0] + text(c, 24, x, y + 220, SLATE, "Medium", 0.04)[0] + text(use, 22, x + 260, y + 185, SLATE, "Regular", anchor="end")[0]
sheet += f'<rect x="1340" y="290" width="484" height="390" rx="28" fill="{INK}" stroke="{GRAPHITE}" stroke-width="2"/>'
sheet += f'<g transform="translate(1340,290)">{wordmark(242, 170, 74, anchor="middle")[0]}{chart(0, 220, 484, 170, stroke=16).replace("<path", "<path clip-path=\"url(#g1)\"")}</g><defs><clipPath id="g1"><rect width="484" height="390" rx="28"/></clipPath></defs>'
sheet += text("Typeface: Poppins SemiBold (headlines), Poppins Regular (body). Website: Inter + Geist Mono.", 28, 96, 860, MIST, "Regular")[0]
sheet += text("Rules: keep the amber dot on the i. Logo on Ink or White only. Leave space around it equal to the dot x 4.", 28, 96, 910, MIST, "Regular")[0]
sheet += text("Aa", 220, 1340, 1000, WHITE, "SemiBold")[0] + text("Aa", 220, 1600, 1000, MIST, "Regular")[0]
save("25-brand-guidelines.svg", svg(W, H, sheet, title="Investedia brand guidelines"))

print("\n".join(sorted(files)))
