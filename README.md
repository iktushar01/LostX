# LostX Client

University lost & found platform — report, search, and recover campus belongings.

## Deploy to Vercel

1. Import this repository as a separate Vercel project (root directory: `LostX-Client` if using a monorepo).
2. Set environment variables from `.env.example`:
   - `NEXT_PUBLIC_API_BASE_URL` — your deployed backend URL (e.g. `https://lostx-api.vercel.app`)
   - `ACCESS_TOKEN_SECRET` — same value as the backend `ACCESS_TOKEN_SECRET`
3. Deploy. Vercel auto-detects Next.js; `pnpm install` and `next build` run by default.

The backend (`LostX-Server`) should be deployed as its own Vercel project with `FRONTEND_URL` pointing to this client URL.
