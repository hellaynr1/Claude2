# Make the Second Brain private (approved 2026-10-17)

Goal: only your email can open the app; the repo becomes private. Free: Cloudflare Pages + Cloudflare Access.
Steps checked against Cloudflare's docs (Pages known issues: Access on the production *.pages.dev domain) and GitHub's docs (private Pages only on Enterprise Cloud).
**Order matters:** A → B → C, so you never lose access or notes.

## A · Cloudflare (about 10 minutes, a computer is easiest)
1. Sign up free: https://dash.cloudflare.com/sign-up (use your Gmail).
2. **Workers & Pages → Create → Pages → Connect to Git** (import an existing Git repository) → allow GitHub → pick **hellaynr1/Claude2**.
   - Project name: something only you know, e.g. `adonay-brain-7k` (it becomes the address).
   - Production branch: `main` · Framework preset: **None** · Build command: *(empty)* · Build output directory: `/`
   - **Save and Deploy** → after ~1 minute your app is at `https://<project>.pages.dev/app/`
3. **Lock it to your email** (Cloudflare's own steps):
   1. Workers & Pages → your project → **Settings → Enable access policy**.
   2. Select **Manage** on the access policy that appears (this opens Zero Trust; the first time it asks for a team name and plan → choose **Free**. If it asks for payment details, stop and tell me).
   3. Access → **Applications** → your project → **Configure**.
   4. Under **Public hostname**, in **Subdomain**, delete the `*` and **Save** (rename the application if it shows an error).
   5. **Policies:** the Allow rule must include **Emails = your Gmail address** only. Login method: **One-time PIN**.
   6. Back in Pages **Settings**, select **Enable access policy** again (this re-protects test versions).
4. **Test:** open `https://<project>.pages.dev/app/` in a private window → Cloudflare asks your email → a code arrives in Gmail → the app opens. Any other email: blocked.

## B · Move your notes (2 minutes)
Notes are stored per web address, so the new address starts empty.
1. Old app (https://hellaynr1.github.io/Claude2/app/) → **Data → Export JSON**.
2. New app → **Data → Import** → pick that file. Then **Connect Claude** (Puter sign-in) on the new address, on iPhone and Mac.

## C · Make the repo private (1 minute)
github.com/hellaynr1/Claude2 → **Settings → General → Danger Zone → Change visibility → Private**.
- The old public link stops working (expected). Cloudflare keeps deploying every push.
- Investedia stays public (it's a public website).

## D · Tell Claude "done" + your .pages.dev address
Claude then: updates every link (CLAUDE.md, memory, app), points the MCP server at the private data, adds your personal context (drafts you confirm first), and checks the lock from outside (a request without login must be blocked).
