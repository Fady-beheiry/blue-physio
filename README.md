# Blue Physio Clinic Website

A premium, production-grade website for Blue Physio Clinic — a luxury aquatic rehabilitation clinic in Cairo, Egypt.

## Features

- Full landing page with hero, mission, services, team, and contact sections
- Online appointment booking with real-time slot availability
- WhatsApp integration for booking confirmations
- Admin dashboard with booking management
- Supabase backend for data persistence
- Framer Motion animations and glassmorphism design

## Tech Stack

- React 18 + Vite
- TypeScript
- Tailwind CSS
- Framer Motion
- React Router DOM v6
- Supabase JS v2
- date-fns
- Lucide React

## Environment Variables

Add these to your Replit secrets or `.env` file:

```
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
VITE_ADMIN_PASSWORD=BluePhysio2025
```

## Supabase Setup

1. Create a new Supabase project at https://supabase.com
2. Go to the SQL Editor
3. Run the contents of `SUPABASE_SETUP.sql`
4. Copy your Project URL and anon key from Settings → API
5. Add them to your environment variables

## Routes

| Path | Description |
|------|-------------|
| `/` | Main landing page |
| `/booking` | Online appointment booking |
| `/admin` | Admin dashboard (password protected) |

## Admin Access

Navigate to `/admin` and enter the admin password (`VITE_ADMIN_PASSWORD`).

Default: `BluePhysio2025`

## Development

```bash
pnpm --filter @workspace/blue-physio run dev
```

## Build

```bash
pnpm --filter @workspace/blue-physio run build
```
