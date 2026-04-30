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
- Supabase Postgres accessed from server-side REST calls

## Product

This is a personal pet diary site for recording daily cat photos.

- The homepage presents a cute, fresh cat album experience.
- Users can upload a cat photo with a title, pet name, and note.
- Photos are saved to Supabase and displayed by upload date, newest first.
- The photo detail page is available at `/photos/[id]`.
- If Supabase environment variables are missing, the app shows sample photos and the upload action returns a setup message.

## Environment

Create `.env.local` from `.env.example`:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

`SUPABASE_SERVICE_ROLE_KEY` must only be used on the server. Do not expose it in client components or commit real secrets.

## Supabase Schema

The Supabase MCP migration `create_pet_photos_table` created this table:

```sql
public.pet_photos (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  pet_name text not null default '猫咪',
  note text,
  image_url text not null,
  uploaded_at timestamptz not null default now(),
  uploaded_on date not null default ((now() at time zone 'Asia/Shanghai')::date),
  created_at timestamptz not null default now()
)
```

Indexes:

- `pet_photos_uploaded_at_idx` on `uploaded_at desc`
- `pet_photos_uploaded_on_idx` on `uploaded_on desc`

RLS is enabled. No anonymous policies are created. The app expects server-side credentials for reads and writes.

## Architecture

```
app/
├── actions.ts                          # Server Action for uploading cat photos
├── layout.tsx                          # Root layout, navbar, footer, metadata
├── page.tsx                            # Homepage, upload entry, grouped timeline
├── globals.css                         # Tailwind v4 globals and theme tokens
├── lib/
│   └── pet-photos.ts                   # Supabase REST helper, types, date grouping
├── components/
│   └── pet/
│       └── UploadPetPhotoForm.tsx      # Client form using useActionState
└── photos/
    └── [id]/
        └── page.tsx                    # Full photo detail page
```

## Key Conventions

- Read relevant Next.js 16 docs under `node_modules/next/dist/docs/` before changing App Router, forms, data fetching, routing, or config behavior.
- Route `params` are Promise objects: `params: Promise<{ id: string }>`.
- Mutations go through Server Actions in `app/actions.ts`.
- Supabase access is centralized in `app/lib/pet-photos.ts`; do not duplicate REST calls in pages.
- Uploaded images are currently stored as data URLs in `pet_photos.image_url` with a 4MB file limit. This avoids creating a public Storage bucket. If the app later needs larger files or private media delivery, migrate to Supabase Storage with explicit authentication and signed URLs.
- Keep the visual style cute, clean, and fresh: warm off-white background, rose accents, emerald/mint support colors, compact rounded corners, and photo-first layouts.

## Netlify Deployment Notes

Production deployment completed on 2026-04-30.

Completed:

- Added `netlify.toml` with `pnpm build` and `.next` publish directory.
- Added `.netlify` to `.gitignore`.
- Logged into Netlify as `1119034261@qq.com`.
- Created and linked Netlify project `miao-diary-xuzihan`.
- Netlify project URL: `https://miao-diary-xuzihan.netlify.app`
- Netlify admin URL: `https://app.netlify.com/projects/miao-diary-xuzihan`
- Netlify project ID: `b96b29ed-2723-42cd-b34b-58054193de3e`
- Imported `NEXT_PUBLIC_SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` from `.env.local`.
- Re-set `SUPABASE_SERVICE_ROLE_KEY` as a production secret.
- Removed unused `framer-motion` dependency to reduce the Netlify server function upload size.

Successful deployment:

- Command: `PATH=/Users/baidu/Library/Caches/fnm_multishells/64387_1777543903326/bin:$PATH npx netlify deploy --prod --skip-functions-cache --timeout 900 --message "Deploy cat diary app"`
- Netlify Build detected Next.js Runtime v5.15.10.
- `pnpm build` succeeded.
- Netlify packaged `___netlify-server-handler`.
- Deploy URL: `https://69f351252be96f5c51220edd--miao-diary-xuzihan.netlify.app`
- Production URL: `https://miao-diary-xuzihan.netlify.app`
- Build logs: `https://app.netlify.com/projects/miao-diary-xuzihan/deploys/69f351252be96f5c51220edd`
- Verified production URL returns HTTP 200 and renders the Supabase-backed page.

Notes:

- Before broad sharing, add a simple upload password/auth gate; the current upload Server Action is public.
