# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Common Development Commands

```bash
npm run dev           # Start dev server with Turbopack (port 3000)
npm run build         # Build for production
npm run lint          # ESLint
npm run lint:fix      # ESLint with auto-fix
npm run tsc:check     # TypeScript type checking (tsc --noEmit)
npm run check:local   # Run tests + lint + type check
npm run seed          # Seed database (tsx scripts/seed.ts)
```

**Environment**: Requires `.env.local` with `MONGODB_URI` and `PAYLOAD_SECRET`.

## Architecture Overview

Next.js 15 App Router + Payload CMS v3 (MongoDB) site for Nalaikh City Development Corporation ("Ногоон Налайх" / Green Nalaikh project).

### Routing: Two Parallel Layout Trees

The app has two independent layout hierarchies:

1. **Public site** (`app/[lang]/`) — locale-parameterized pages with Header/Footer, uses Roboto font (cyrillic-ext). Root `app/page.tsx` redirects `/` → `/mn`.
2. **Custom admin** (`app/admin/`) — separate layout, protected by middleware auth (`middleware.ts` checks `payload-token` cookie against Payload's `/api/payload/users/me`). Login at `/login`, unauthorized redirect at `/unauthorized`.
3. **Payload admin** (`app/(admin)/`) — Payload CMS's built-in admin panel.

There is also a legacy `app/posts/` route (outside `[lang]`) for posts.

### i18n System

- **Locales**: `mn` (default), `en`, `zh` — defined in both `lingui.config.ts` and `src/payload.config.ts`
- **Frontend translations**: `lib/translations.ts` — a single flat object keyed by locale, NOT Lingui catalog files. `lib/i18n.ts` wraps this into Lingui catalogs.
- **Pattern**: Pages receive `params.lang`, call `getT(language)` to get a `Record<string, string>`, pass `t` as prop to section components. Components access strings as `t.keyName`.
- **Types**: `lib/_types.ts` defines `Params`, `PageProps`, `Translate` used across pages/components.

### Payload CMS Configuration (`src/payload.config.ts`)

- **Collections**: `Posts` (`src/collections/Posts.ts`), `Media` (`src/collections/Media.ts`), `Users` (inline)
- **Database**: MongoDB via `@payloadcms/db-mongodb`, dbName `nalaikh-city`
- **Rich text**: Lexical editor
- **Localization**: mn/en/zh with fallback enabled
- **Upload limit**: 5MB
- **API**: `/api/payload/[...slug]` handles all Payload REST endpoints; custom `/api/posts` for public post listing

### Component Organization

- `components/sections/` — page-level sections (hero, footer, header, contact, etc.) that receive `t` translation prop
- `components/ui/` — reusable primitives (shadcn/ui pattern with Radix UI + CVA)
- `components/admin/` — admin-specific components (AdminNav, ImageUpload, MediaBrowser)

### Styling

- TailwindCSS v4 with `@import "tailwindcss"` syntax
- Brand colors as CSS variables in `app/globals.css`: `--nalaikh-navy` (#002868), `--nalaikh-gold`, `--nalaikh-red`
- Light/dark mode via `.dark` class variant
- shadcn/ui component config in `components.json`

### Path Aliases

- `@/*` → project root
- `@payload-config` → `./src/payload.config.ts`

### Key Conventions

- All user-facing strings are in Mongolian (Cyrillic) by default
- No test suite currently configured (test script is a no-op)
- Media uploads stored in `/public/media`
