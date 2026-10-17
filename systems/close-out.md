# Workflow: close-out (memory and saving)
Merges: personal-intelligence, sync-everything, auto-save. Skill: `close-out`.

| Contract | |
|---|---|
| **Inputs** | the end of any session or task that changed something |
| **Outputs** | Claude page rebuilt + published once (if `app/` changed this session); dated line in `brain/log.md`; project file Status/Next step updated; decisions/rejections in `memory/DECISIONS.md`; Reports line; commit + push, verified against GitHub. **Weekly (Sundays, nightly run): one Drive export** of the vault notes that changed (learning progress, project notes), not every change |
| **Failure modes** | claiming saved without verifying; stale project files; personal details in the public repo |
| **Approval point** | none (saving and pushing is pre-approved) |
| **Metric / target** | remote == local after every session (100%); project "Next step" updated within the session |
| **Kill criterion** | n/a |
