<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Commands

- **Dev server:** `pnpm dev`
- **Build:** `pnpm build`
- **Lint:** `pnpm lint` (ESLint with next/core-web-vitals + next/typescript configs)
- **Lint fix:** `pnpm lint:fix`

This project uses **pnpm** as its package manager.

## Tech Stack

- Next.js 16 (App Router) with React 19
- TypeScript (strict mode)
- Tailwind CSS v4 (via `@tailwindcss/postcss` plugin)
- ESLint 9 with flat config (`eslint.config.mjs`)

## Architecture

This is a demo app showcasing Next.js **intercepting routes** and **parallel routes**.

### Routing Structure

```
app/
├── layout.tsx                          # Root layout — renders both children and @modal slot
├── page.tsx                            # Home page — photo grid with links to /photos/[id]
├── @modal/
│   ├── default.tsx                     # Returns null (no modal when slot has no match)
│   └── (.)photos/[id]/page.tsx         # Intercepted route — renders photo in a modal
├── photos/[id]/page.tsx                # Full photo detail page (direct URL access)
└── components/Modal.tsx                # Client component — overlay modal with Escape/back dismiss
```

### How Intercepting Routes Work Here

- **Client-side navigation** (clicking a photo link): The `(.)photos` interceptor catches the route and renders `@modal/(.)photos/[id]/page.tsx` inside the `Modal` component, overlaid on the current page.
- **Direct URL access** (typing `/photos/1` or refreshing): The interception is bypassed; `photos/[id]/page.tsx` renders as a full standalone page.
- The root layout accepts a `modal` prop (the `@modal` parallel route slot) alongside `children`.

### Key Conventions

- `@modal` is a parallel route slot — its content renders in the root layout via the `modal` prop.
- `(.)photos` uses the `(.)` convention to intercept a sibling-level route.
- `default.tsx` in `@modal` returns `null` so no modal appears when the parallel route has no matching segment.
- Route `params` are `Promise` objects (Next.js 16 async params API): `params: Promise<{ id: string }>`.
- Photo data is hardcoded in each page file as a local constant (no API or database).
