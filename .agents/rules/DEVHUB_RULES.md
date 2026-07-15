# DevHub — Project Rules & Conventions

This file defines how this codebase is built. Any AI agent (Claude Code, Cursor, Copilot, etc.) working on this repo must follow these rules exactly. Do not deviate without explicit user confirmation.

## Project Summary

DevHub is a curated developer-tool discovery platform. Users browse, search, and filter dev tools by category and tag. Admins moderate submissions. Built primarily as a Next.js learning project and resume artifact — code clarity and correct fundamentals matter more than clever shortcuts.

## Tech Stack (locked — do not swap without asking)

- **Framework:** Next.js 16, App Router, TypeScript, Turbopack (default)
- **Package manager:** Bun (`bun add`, `bun dev`) — never introduce npm/yarn/pnpm lockfiles
- **Database:** PostgreSQL hosted on Neon
- **ORM:** Prisma, custom generator output at `../generated/prisma` — always import the client from that path, never from `@prisma/client`
- **Auth:** Better Auth — email/password + Google OAuth. Session-cookie based, NOT JWT access/refresh tokens. Never implement manual token refresh logic.
- **UI:** shadcn/ui on **Radix** primitives (not Base UI — always pass `-b radix` if re-running shadcn init)
- **Styling:** Tailwind CSS
- **Client data-fetching:** TanStack Query — ONLY for post-load, repeated/cacheable client interactions (live search, optimistic saves). Never use it for one-shot mutations like sign-up/sign-in.
- **Search:** Postgres-native search (`contains`, `mode: "insensitive"`) via query params — Elasticsearch was evaluated and dropped for cost. Do not reintroduce Elasticsearch without explicit instruction.
- **File storage:** None (no S3) for v1 — logos are stored as plain URL strings.
- **Deployment:** Vercel

## Next.js 16 — Hard Rules (breaking changes vs older tutorials/training data)

- `params` and `searchParams` are **async** in every Server Component — always `await` them. Never destructure them synchronously.
- `cookies()`, `headers()`, `draftMode()` are also async — always `await`.
- Route gating file is `proxy.ts` (project root), exported function name is `proxy` — NOT `middleware.ts`/`middleware`. `proxy` runs Node.js runtime only, no Edge.
- Turbopack is default — do not add custom Webpack config without checking compatibility first.

## Architecture Rules

1. **Server Components by default.** Only add `"use client"` to the smallest possible component that actually needs interactivity (state, event handlers, browser APIs). Never mark a whole page/section client-side just because one small piece (e.g. a search input) needs it — split it into its own component instead.
2. **Data fetching lives in the route's `page.tsx`**, via direct Prisma calls (`db.tool.findMany(...)`). Presentational components (e.g. `ToolCard`) never fetch data themselves — they only receive props and render them.
3. **Pagination and filters are URL-driven** (`?page=2&category=cli&tag=opensource`), read via the `searchParams` prop server-side. Do not implement infinite scroll or client-only (`useState`) filter state — this was a deliberate architecture decision for shareable/bookmarkable/back-button-safe URLs.
4. **TanStack Query** is reserved for: live search-as-you-type, optimistic "save tool" mutations. It is NOT used for the initial page load or for simple one-shot form submissions (auth, tool submission) — those use plain `useState` + `async/await`.
5. **Server Actions** are preferred over custom Route Handlers for internal mutations (admin approve/reject, form submissions). Route Handlers are reserved for endpoints that need to return JSON to client-side fetch/TanStack Query calls (e.g. a future search API route).
6. **Moderation pipeline is uniform.** Every `Tool`, regardless of source (seed, admin, user submission, future scraper), is created with `status: PENDING` by default and only becomes visible via the same `APPROVED` state. No source bypasses this — seed/admin scripts explicitly set `status: APPROVED` at creation time rather than using a separate code path.
7. **Category vs Tag — do not conflate.**
   - `Category`: flat (not hierarchical), one-to-many with `Tool`, admin-managed only, ~8 fixed values.
   - `Tag`: many-to-many with `Tool` (implicit Prisma relation), open/growing set, created on demand via `connectOrCreate`.
   - Never model tags as a `String[]` array or an enum — both were explicitly rejected for this project (breaks faceted counts, renames, and referential integrity).
8. **Auth is optional until a feature needs persistence.** Browsing, searching, and filtering tools require no login. Login is only required for actions tied to a user across sessions (saving a tool, submitting a tool, admin actions).
9. **Role-based access uses layered checks, not a single gate:**
   - `proxy.ts` — fast, cookie-existence check only, gates broad route groups (e.g. `/admin/:path*`).
   - Route/layout-level Server Component — full session fetch + `role` check (e.g. `session.user.role === "ADMIN"`).
   - The Server Action itself — re-checks role independently (defense in depth; never trust that a request only arrived via the intended UI path).

## Things NOT to do in this project

- Do not add Redis or BullMQ yet — explicitly deferred to a later, post-launch phase. Do not scaffold job queues "just in case."
- Do not add S3 or any file upload flow — logos are URL strings only for v1.
- Do not build hierarchical/nested categories — flat category list only, tags handle cross-cutting attributes.
- Do not use `String[]` for tags or an enum for tags.
- Do not implement manual JWT access/refresh token logic — Better Auth's session-cookie model already handles this.
- Do not use `<a>` tags for internal navigation — always `next/link`'s `<Link>`.
- Do not wrap simple one-shot mutations (auth forms) in TanStack Query.
- Do not scaffold with `--monorepo` — this is a single Next.js app, not a workspace.

## Conventions

- Prisma model names are singular (`Tool`, `Tag`, `Category`, `User`) — not plural.
- Enum members use SCREAMING_CASE (`PENDING`, `APPROVED`, `REJECTED`, `USER`, `ADMIN`).
- Foreign keys are indexed (`@@index([categoryId])`) as a default habit, not an afterthought.
- Components split by responsibility: presentational components (`components/tools/tool-card.tsx`) never fetch data; route files (`app/tools/page.tsx`) own the fetch and the loop/`.map()` over results.
- Zod schemas live in `lib/validators/` and are the single source of truth for both client-side form validation and (where applicable) server-side re-validation — never duplicate validation rules by hand in two places.
