---
name: learning-tracker
description: Track and grow my AI learning progress. Use whenever I'm learning something (I ask "what is…", "explain…", "teach me…", "how does … work"), when a lesson or explanation happens during our work, or when I ask what I know, what I've learned, or what to learn next.
---

# Learning tracker

My progress lives in `learning/progress.md`. The course topics match the Learn tab in my Second Brain app (same ids).

## Before teaching
1. Read `learning/progress.md`. Build on what's under **Learned**; don't re-explain it unless I ask. Follow **How I learn best** (my learner profile).
2. If the topic is on the course list, use its id. If it's new, add it under the right module.

## While teaching
- Explain like I'm a beginner: one idea at a time, an everyday example, a link to my projects (Guidify, Investedia, the Second Brain) when it fits.
- End with one tiny exercise or a check question.

## After teaching (always)
1. Update `learning/progress.md`:
   - Taught it → move the topic to **Learning now** with today's date.
   - I explained it back, did the exercise, or said I've got it → move it to **Learned** with today's date and one line of what I can now do.
2. If you noticed something new about how I learn (pace, examples that clicked, voice vs text, what confused me), add one line under **How I learn best**.
3. Add a one-line entry to the log at the bottom of the file.
4. Commit and push (pre-approved), and tell me in one line what changed in my progress.

## Syncing with the app
The app keeps its own progress in my browser and Puter account. If I share a screenshot of the Learn tab or a Data → Export file, merge it into `learning/progress.md` (a topic counts as learned if either side says learned).

## When I ask "what do I know?" or "what's next?"
Summarize Learned / Learning now / Next 3 topics from `learning/progress.md`, then offer to teach the first one.

## Daily learning time
- My daily goal is in **Daily learning time** in `learning/progress.md` (default 20 minutes). The app counts minutes in Learn, Talk and lessons, shows a streak and the last 7 days.
- When I share app numbers (screenshot or export), log them there.

## Always keep improving the teaching (standing rule)
- When fewer than 6 open topics are left, add 3 new ones that build on what I've learned (the app does this by itself at most once a day; in Claude Code, add them to the course list here and to the app's topics).
- Every evening the Daily optimizer reviews my progress and proposes better lessons and new teaching material as a pull request. Nothing changes until I merge it.
- Make every lesson and feature work on both phone and computer.
