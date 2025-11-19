# GuateAbroad Frontend

A Next.js application helping Guatemalan students navigate US scholarship applications.

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Database**: Supabase (PostgreSQL)
- **Auth**: Supabase Auth
- **Styling**: Tailwind CSS v4 + shadcn/ui
- **Language**: TypeScript

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Supabase account

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Supabase

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to **Project Settings > API**
3. Copy your credentials

### 3. Configure Environment Variables

Create a `.env.local` file in the frontend directory:

```bash
cp .env.example .env.local
```

Fill in your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
├── components/
│   └── ui/                 # shadcn/ui components
├── lib/
│   ├── supabase/          # Supabase client utilities
│   │   ├── client.ts      # Browser client
│   │   ├── server.ts      # Server client
│   │   └── middleware.ts  # Auth middleware helper
│   └── utils.ts           # Utility functions
├── types/
│   └── database.ts        # Supabase database types
└── middleware.ts          # Next.js middleware for auth
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Supabase Setup

### Database Types

Generate TypeScript types from your Supabase schema:

```bash
npx supabase gen types typescript --project-id YOUR_PROJECT_ID > src/types/database.ts
```

### Row Level Security (RLS)

RLS policies should be configured in Supabase dashboard or via migrations. See the database schema in `/docs/GuateAbroad.md` for table structures.

## Authentication

The app uses Supabase Auth with cookie-based sessions. Protected routes are handled in `middleware.ts`:

- `/dashboard/*` - Requires authentication
- `/profile/*` - Requires authentication
- `/roadmap/*` - Requires authentication
- `/login`, `/register` - Redirect to dashboard if authenticated

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL | Yes |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous key | Yes |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key (server-only) | Yes |
| `NEXT_PUBLIC_APP_URL` | Application URL | Yes |

## Contributing

1. Create a feature branch
2. Make your changes
3. Run `npm run lint` to check code style
4. Submit a pull request

## License

MIT
