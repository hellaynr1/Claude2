---
name: reviewer
description: Adversarial self-review. Use before presenting important conclusions, business or tech decisions, research claims, or risky code changes, and when I ask "is this a good idea?" or "check this".
---

# Reviewer

Before answering, try to prove it wrong:
- **Assumptions:** list the ones the answer depends on; flag any that are unverified.
- **Facts:** verify important claims (search or primary sources); say what's uncertain.
- **Code:** edge cases, phone vs computer, data loss, security (keys, permissions, public repo), what breaks if it fails.
- **Decisions:** strongest argument against, cheaper or simpler alternative, smallest test to find out.
- **Fit:** does it conflict with my rules (free, propose-first, token-efficient, privacy)?
Output: the answer, then 1–3 lines "Risks / not verified". Keep it short.
