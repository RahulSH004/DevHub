# DevHub — Changelog

---

## Tools Page — Full Implementation Session
**Date:** 2026-07-15

---

### 1. Tools Page Layout (Two-Panel Design)

**File:** `app/tools/page.tsx`

Built the two-panel layout matching the wireframe sketch:
- Outer bordered container with rounded corners (`rounded-[2rem]`)
- Header row with "Tools" title + total count badge
- Left sidebar for categories, right area for tool grid
- Responsive: stacks vertically on mobile, side-by-side on `md+`

---

### 2. Made Tools Page a Proper Server Component

**File:** `app/tools/page.tsx`

Rewrote the page from `"use client"` with `useState` to a true **async Server Component**, following project rules:

- `await searchParams` (required in Next.js 16 — params are async)
- Direct Prisma queries in the page — no data fetching in child components
- Reads `?category=`, `?page=`, and `?q=` from the URL
- All filters and pagination are **URL-driven** (shareable, bookmarkable, back-button safe)
- Removed all `useState` filter logic from the page level

---

### 3. Created `CategorySidebar` Component

**File:** `components/tools/container/CategorySidebar.tsx`

- `"use client"` — only this small component is client-side
- On click, pushes `?category=<slug>` to the URL via `useRouter`
- Resets `?page=` to 1 when category changes
- Shows tool count badge per category (from Prisma `_count`)
- Active state driven by URL param, not `useState`
- Wrapped in `<Suspense>` in the page (required because it calls `useSearchParams()`)

---

### 4. Created `PaginationControls` Component

**File:** `components/tools/container/PaginationControls.tsx`

- `"use client"` — updates `?page=` in the URL on click
- Smart page range: shows max 7 pages with `…` ellipsis around current page
- Prev / Next buttons disabled at boundaries
- Page 1 removes the `?page=` param (clean URL)
- Wrapped in `<Suspense>` in the page

---

### 5. Fixed `SearchBox` — Made It Functional

**File:** `components/tools/searchbox.tsx`

The original `SearchBox` was a static display-only `<input>` that did nothing.

**Changes:**
- Added `"use client"`, `useRouter`, `usePathname`, `useSearchParams`
- On every keystroke pushes `?q=<term>` to the URL via `useTransition` (low-priority so UI stays responsive)
- Resets `?page=` to 1 on new search
- Input value initialized from URL so browser Back/Forward keeps it in sync
- Shows `opacity-70` during pending navigation

---

### 6. Fixed `Smallhero` — Added `Suspense` Boundary

**File:** `components/tools/smallhero.tsx`

`SearchBox` now calls `useSearchParams()` internally. When used inside a Server Component tree, it **must** be wrapped in `<Suspense>` — otherwise Next.js throws a build error.

**Change:** Wrapped `<SearchBox />` in `<Suspense fallback={...}>` with a shimmer placeholder.

---

### 7. Extended Search to Cover Category Name & Tags

**File:** `app/tools/page.tsx`

**Problem:** Searching "devops" returned zero results even though Docker exists in "DevOps & Infrastructure". The `OR` clause only matched `name` and `description`.

**Fix:** Added two more branches to the Prisma `OR`:

```ts
{ category: { name: { contains: searchQuery, mode: "insensitive" } } }
{ tags: { some: { name: { contains: searchQuery, mode: "insensitive" } } } }
```

Search now matches across **4 fields**:

| Search term     | Matches via           |
|-----------------|-----------------------|
| `docker`        | `tool.name`           |
| `containerized` | `tool.description`    |
| `devops`        | `tool.category.name`  |
| `orm`           | `tool.tags[].name`    |

Uses Postgres-native `contains` with `mode: insensitive` — no Elasticsearch, no extra infrastructure (per project rules).

---

### 8. Fixed Category Sidebar Overflow

**File:** `components/tools/container/CategorySidebar.tsx`

**Problem:** "Developer Productivity & Collaboration" overflowed outside the sidebar box.

**Fix (3 targeted changes):**

| Change | Why |
|---|---|
| `overflow-hidden` on `<Button>` | Prevents button stretching wider than the container |
| `min-w-0 truncate` on name `<span>` | `flex-1` alone won't truncate — needs `min-w-0` to allow flex shrinking, then `truncate` clips with `…` |
| `shrink-0` on count badge `<span>` | Stops the number pill from squishing when name is long |

---

### 9. Fixed Skeleton Hydration Mismatch

**File:** `app/tools/page.tsx`

The `CategorySidebarSkeleton` used `Math.random()` for widths — this caused a React hydration mismatch (server and client rendered different values).

**Fix:** Replaced `Math.random()` widths with a static array of Tailwind width classes cycled by index.

---

### 10. User Changes (Manual)

**File:** `app/tools/page.tsx`

- Imported and added `<Footer />` at the bottom of the tools page
- Removed `pb-20` from the outer wrapper div (Footer handles bottom spacing)
