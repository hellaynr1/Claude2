"""Workflow metrics from raw data (no summaries): git history, GitHub PRs/CI, the Claude Code transcript.
Usage: python3 tools/metrics.py [transcript.jsonl] > memory/metrics/baseline-YYYY-MM-DD.json
"""
import json, re, subprocess, sys, statistics as st, datetime as dt
from collections import Counter

def sh(cmd): return subprocess.run(cmd, shell=True, capture_output=True, text=True).stdout
def ts(s): return dt.datetime.fromisoformat(s.replace("Z", "+00:00"))

out = {"generated": dt.datetime.now(dt.timezone.utc).isoformat(timespec="seconds")}
# --- git (Claude2 + Investedia) ---
for repo, path in [("Claude2", "."), ("Investedia", "/home/user/investedia")]:
    lines = [l.split("|", 2) for l in sh(f"git -C {path} log --format='%cI|%an|%s'").splitlines() if l]
    mine = [l for l in lines if l[1] == "Claude"] if repo == "Investedia" else lines
    out[f"git_{repo}"] = {"commits": len(lines), "claude_commits": len(mine),
        "fix_commits": sum(1 for l in mine if re.search(r"\bfix|correct|bug", l[2], re.I))}
# --- GitHub PRs and CI ---
for repo in ["Claude2", "Investedia"]:
    prs = json.loads(sh(f"gh api 'repos/hellaynr1/{repo}/pulls?state=all&per_page=100'") or "[]")
    runs = json.loads(sh(f"gh api 'repos/hellaynr1/{repo}/actions/runs?per_page=100'") or "{}").get("workflow_runs", [])
    c = Counter((r["name"], r.get("conclusion")) for r in runs)
    out[f"github_{repo}"] = {"prs_total": len(prs), "prs_merged": sum(1 for p in prs if p.get("merged_at")),
        "ci": {f"{k[0]}:{k[1]}": v for k, v in c.items()}}
# --- transcript: requests, commits, workflow use, rework ---
if len(sys.argv) > 1:
    reqs, commits, skills, systems_read, complaints = [], [], Counter(), Counter(), []
    for line in open(sys.argv[1], encoding="utf-8"):
        try: e = json.loads(line)
        except Exception: continue
        t = e.get("timestamp"); m = e.get("message") or {}
        if not t: continue
        if e.get("type") == "user" and not e.get("isMeta"):
            c = m.get("content")
            text = c if isinstance(c, str) else " ".join(x.get("text", "") for x in (c or []) if isinstance(x, dict) and x.get("type") == "text")
            if text and not text.startswith("<") and "tool_use_id" not in str(c)[:200] and len(text) > 3:
                reqs.append((ts(t), text[:120]))
                if re.search(r"didn.?t work|not working|nothing came|broken|stays on|doesn.?t|failed|wrong|bs\b", text, re.I): complaints.append((t, text[:90]))
        if e.get("type") == "assistant":
            for x in m.get("content") or []:
                if not isinstance(x, dict) or x.get("type") != "tool_use": continue
                inp = x.get("input") or {}
                if x.get("name") == "Skill": skills[inp.get("skill")] += 1
                cmd = json.dumps(inp)
                for s in re.findall(r"systems/([a-z-]+)\.md", cmd): systems_read[s] += 1
                if x.get("name") == "Bash" and "git commit" in inp.get("command", "") or "git -c user.name" in inp.get("command", ""): commits.append(ts(t))
    # lead time: user request -> first commit after it (before the next request)
    lead = []
    for i, (t0, _) in enumerate(reqs):
        t1 = reqs[i + 1][0] if i + 1 < len(reqs) else None
        nxt = [c for c in commits if c > t0 and (t1 is None or c < t1)]
        if nxt: lead.append((nxt[0] - t0).total_seconds() / 60)
    out["transcript"] = {"requests": len(reqs), "requests_with_commit": len(lead),
        "lead_time_min_median": round(st.median(lead), 1) if lead else None,
        "lead_time_min_p90": round(sorted(lead)[int(len(lead) * .9) - 1], 1) if lead else None,
        "commit_tool_calls": len(commits), "skill_invocations": dict(skills), "system_files_touched": dict(systems_read),
        "owner_reported_problems": len(complaints), "problem_examples": complaints[:12],
        "span_days": round((reqs[-1][0] - reqs[0][0]).total_seconds() / 86400, 2) if reqs else 0}
print(json.dumps(out, indent=1, ensure_ascii=False, default=str))
