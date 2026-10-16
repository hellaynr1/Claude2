---
name: video-notes
description: Read a video through its transcript so I can reference it, for free. Use when I paste a YouTube (or other video) link, or ask what a video says, to summarize a video, pull quotes or steps from it, or use a video as a source in a project.
---

# Video notes (free, via transcripts)

You can't watch videos, but you can read their captions. Explain this to me once if I seem to expect more.

## 1. Get the transcript with yt-dlp
- Check it's installed: `yt-dlp --version`. If not, tell me how to install it:
  - Mac: `brew install yt-dlp` (or `pip3 install yt-dlp`)
  - Windows: `winget install yt-dlp`
- Download only the captions, not the video:
  `yt-dlp --skip-download --write-subs --write-auto-subs --sub-langs "en.*,fr.*" --convert-subs srt -o "transcripts/%(title)s.%(ext)s" "<URL>"`
- Clean the .srt into plain text: drop the numbers, timestamps and repeated lines, but keep a timestamp every minute or so, so we can point to moments in the video.
- Also grab the title, channel and length: `yt-dlp --skip-download --print "%(title)s | %(channel)s | %(duration_string)s" "<URL>"`

## 2. If there's no transcript
Say so plainly. Don't guess what the video says from its title. Offer to use the video description instead (`--print description`), or suggest I find a video with captions.

## 3. What to give me
- A summary of 5–8 bullet points, with timestamps.
- Then whatever I asked for: steps, quotes, code, a checklist, notes for a project.
- Quote the transcript exactly when quoting, and say when a point is your interpretation.
- Save the clean transcript in `transcripts/` so we can come back to it.

## Rules
- Use transcripts for my own learning and notes. Don't republish someone's full transcript or content as my own.
- Don't download the actual videos unless I ask and it's my own video, or the license allows it.
