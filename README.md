# Hangul Learning Game (Next.js)

Simple web game for students learning Hangul:

- Level 1: 1 Hangul character
- Level 2: 2 Hangul characters
- Level 3: 3 Hangul characters
- Level 4: 4 Hangul characters

The game shows Hangul and the student types the pronunciation (romanization). Score + current level are saved in `localStorage` so the student can continue later on the same device/browser.

## Run locally

```bash
nvm use
npm install
npm run dev
```

Then open `http://localhost:3000`.

## Deploy to Vercel

1. Push this repo to GitHub (or GitLab/Bitbucket).
2. In Vercel, click **New Project** → import the repo.
3. Framework preset: **Next.js** (auto-detected)
4. Build command: `next build` (default)

That’s it — Vercel will build and host it.

## Customize prompts

Current prompts are generated from a small syllable pool (so Level 2–4 are random multi-syllable combinations).

To replace them with real vocabulary lists per level, update `lib/levels.ts` (or tell me:
language of instructions + student grade level + topic words you want).
