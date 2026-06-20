# LostX Client

University lost & found platform — report, search, and recover campus belongings.

## Deploy to Vercel

1. Import **iktushar01/LostX** as a Vercel project.
2. **Root Directory** must be empty (repo root is this Next.js app — do not set `LostX-Client`).
3. **Production Branch**: `main`.
4. **Build Command**: leave empty (uses `vercel.json` → `next build --no-lint`) or set to `next build --no-lint`. Clear any dashboard override of `next build` alone.
5. Set environment variables from `.env.example`:
   - `NEXT_PUBLIC_API_BASE_URL` — your deployed backend URL (e.g. `https://lostx-api.vercel.app`)
   - `ACCESS_TOKEN_SECRET` — same value as the backend `ACCESS_TOKEN_SECRET`
6. Deploy from the latest `main` commit with **Clear build cache** enabled.

The backend (`LostX-Server`) should be deployed as its own Vercel project with `FRONTEND_URL` pointing to this client URL.
