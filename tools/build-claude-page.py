"""Build the Claude page (artifact) from the single source app/index.html.

Usage: python3 tools/build-claude-page.py OUT.html [--private OLD_CLAUDE_PAGE.html]
- Removes the web-only head (Puter script, SBWeb adapter, PWA links). The shared body already
  falls back to window.claude (db, sample, Drive) when SBWeb is missing.
- Inlines app/knowledge.json into BASE (the Claude page can't fetch files from GitHub).
- --private: copies personal stars (ids not in the public BASE) from the currently published
  Claude page (get it with Artifact read). Personal stars never go into this public repo.
"""
import json, re, sys, pathlib
root = pathlib.Path(__file__).resolve().parent.parent
src = (root / "app/index.html").read_text()

def base_block(s):
    i = s.index("const BASE = ["); return i, s.index("\n  ];", i)

def objects(block):
    out, i = {}, 0
    while (m := re.compile(r'\{ id: "([^"]+)"').search(block, i)):
        depth, j, q = 0, m.start(), None
        while True:
            ch = block[j]
            if q:
                if ch == "\\": j += 1
                elif ch == q: q = None
            elif ch in "\"'`": q = ch
            elif ch == "{": depth += 1
            elif ch == "}":
                depth -= 1
                if depth == 0: break
            j += 1
        out[m.group(1)] = block[m.start():j + 1]; i = j + 1
    return out

out = src
# 1. web-only head
out = re.sub(r'<script src="https://js\.puter\.com/v2/"></script>\s*<script>.*?</script>\s*', "", out, count=1, flags=re.S)
out = re.sub(r'<link rel="(manifest|apple-touch-icon)"[^>]*>\s*', "", out)
assert "window.SBWeb = " not in out, "Puter adapter still present"
# 2. extra stars: research feed + private stars
i, j = base_block(out)
public_ids = set(objects(out[i:j]))
extra = []
for k in json.loads((root / "app/knowledge.json").read_text()):
    if k["id"] not in public_ids: extra.append(json.dumps({"x": [], "l": [], **k, "feed": True}, ensure_ascii=False))
if "--private" in sys.argv:
    old = pathlib.Path(sys.argv[sys.argv.index("--private") + 1]).read_text()
    oi, oj = base_block(old)
    extra += [obj for pid, obj in objects(old[oi:oj]).items() if pid not in public_ids]
if extra:
    out = out[:j] + ",\n    " + ",\n    ".join(extra) + out[j:]
pathlib.Path(sys.argv[1]).write_text(out)
print(f"built {sys.argv[1]}: {len(extra)} extra stars")
