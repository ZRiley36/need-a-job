# Agent Handoff — my-personal-website

Last updated: 2026-05-26

## Git state

- **Branch:** `main`
- **Remote:** `git@github.com:ZRiley36/need-a-job.git`
- **Working tree:** clean — all changes committed and pushed
- **Latest commit:** `d584ad9` — *Take site offline with maintenance page.*

## Current site status

The site is **intentionally offline** in production.

- `SITE_DOWN = true` in `src/app/page.tsx`
- Visitors see a minimal maintenance page (name + "temporarily offline" message)
- Full site code is preserved behind the flag in `SiteContent` component
- Metadata in `src/app/layout.tsx` is simplified for downtime:
  - title: `"Zach Riley"`
  - description: `"Site temporarily offline."`

### To bring the site back online

1. Set `SITE_DOWN = false` in `src/app/page.tsx`
2. Restore original metadata in `src/app/layout.tsx` if desired
3. Commit, push to `main` — Vercel should auto-deploy

## Deployment

- Hosted on **Vercel** (inferred from project setup; `.vercel` is gitignored)
- Deploys from `main` on push to GitHub
- Local changes do **not** affect production until committed and pushed

## Project overview

Personal portfolio site for **Zach Riley** — software developer / CS graduate.

Single-page Next.js app with client-side tab navigation (no separate routes per page).

### Navigation tabs

| Tab | Component | File |
|-----|-----------|------|
| Home | `Home` | `src/app/components/pages/Home.tsx` |
| Resume | `About` | `src/app/components/pages/About.tsx` |
| Projects | `Projects` | `src/app/components/pages/Projects.tsx` |
| Games | `Games` | `src/app/components/pages/Games.tsx` |
| Contact | `Contact` | `src/app/components/pages/Contact.tsx` |

Entry point: `src/app/page.tsx` — renders header, nav, and active page.

### Games / Interests page

`Games.tsx` includes:
- Playable games: Chess, Snake, Tetris (`src/app/components/Games Folder/`)
- Goodreads reading list section (see known issue below)

## Tech stack

- **Next.js** 16.1.1 (App Router)
- **React** 19.2.3
- **TypeScript**
- **Tailwind CSS** 3.4
- **Fonts:** Geist Sans + Geist Mono via `next/font/google`

### Notable dependencies

- `emailjs-com` — contact form
- `chess.js`, `react-chessboard`, `stockfish.js` — chess game
- `cheerio` — was used by deleted Goodreads API routes (still in package.json)

## Recent changes (commit `d584ad9`)

1. Added maintenance mode (`SITE_DOWN` flag + `MaintenancePage` / `SiteContent` split)
2. **Deleted** Goodreads API routes:
   - `src/app/api/goodreads/route.ts`
   - `src/app/api/goodreads-image/route.ts`
3. Removed Goodreads image `remotePatterns` from `next.config.ts`
4. Updated page components: About, Contact, Home, Projects, layout metadata

## Known issues / follow-up work

### Goodreads integration is broken when site is restored

`src/app/components/pages/Games.tsx` still fetches `/api/goodreads` on mount, but those API routes were deleted. When `SITE_DOWN` is set back to `false`, the Games/Interests tab will fail to load books (fetch will 404).

**Options for next agent:**
- Re-add the Goodreads API routes from git history (`git show 9e91bf8:src/app/api/goodreads/route.ts`)
- Or remove/update the Goodreads section in `Games.tsx` to use static data or an external embed

### Build config warnings

`next.config.ts` has:
- `typescript.ignoreBuildErrors: true`
- `eslint.ignoreDuringBuilds: true` (Next.js 16 warns this key is deprecated)

Build also warns about multiple lockfiles — workspace root may be inferred as parent `C:\Users\zachr\projects\` instead of this repo.

### Unused dependency

`cheerio` remains in `package.json` but is no longer used after Goodreads API removal.

## Repo structure

```
my-personal-website/
├── src/app/
│   ├── page.tsx              # Main entry, SITE_DOWN flag
│   ├── layout.tsx            # Root layout + metadata
│   ├── globals.css
│   ├── icon.svg
│   └── components/
│       ├── pages/            # Home, About, Projects, Games, Contact
│       └── Games Folder/     # Chess, Snake, Tetris
├── public/                   # Static assets (chess piece SVGs, etc.)
├── database/                 # Separate CA political finance DB project files
├── next.config.ts
├── tailwind.config.js
├── package.json
└── AGENT_HANDOFF.md          # This file
```

## Dev commands

```bash
npm run dev      # Local dev server (http://localhost:3000)
npm run build    # Production build
npm run start    # Run production build locally
npm run lint     # ESLint
```

Build was verified successfully after maintenance mode changes.

## Design notes

- Dark theme: `bg-neutral-900`, accent color `#00ff88`
- Responsive nav with horizontal scroll on small screens
- Sticky nav with backdrop blur

## Conversation context (why site is down)

User requested taking the site down temporarily. Maintenance mode was implemented locally, then committed and pushed so Vercel would deploy the offline page to production.
