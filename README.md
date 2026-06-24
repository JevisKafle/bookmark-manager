# Bookmark Manager

A full-stack bookmark manager built to learn and apply modern full-stack patterns with TanStack Start, server functions, and a type-safe Postgres backend.

## Features

- Save, edit, and delete bookmarks
- Real-time search and filtering across saved bookmarks
- Fast client-side filtering with memoized derived state
- Server-rendered routes with type-safe data loading
- Clean, accessible UI built on Shadcn components

## Tech Stack

**Frontend**
- [TanStack Start](https://tanstack.com/start) - full-stack React framework
- [TanStack Router](https://tanstack.com/router) - type-safe routing
- [TanStack Query](https://tanstack.com/query) - server state management and caching
- [Shadcn UI](https://ui.shadcn.com/) - component library

**Backend**
- TanStack Start server functions
- [Drizzle ORM](https://orm.drizzle.team/) - type-safe SQL query builder and schema management
- [Neon](https://neon.tech/) - serverless Postgres

## Architecture Notes

- **Search state** is held in a Zustand store so the search input and bookmark list stay in sync without prop drilling.
- **Filtering** happens client-side using `useMemo`, avoiding unnecessary network calls on every keystroke.
- **Data fetching** uses TanStack Query with a tuned `staleTime` to reduce redundant refetches while keeping data reasonably fresh.
- **Database access** goes through Drizzle ORM against a Neon Postgres instance, with schema defined in code for type safety end-to-end.

## Getting Started

### Prerequisites

- Node.js (LTS recommended)
- A Neon Postgres database (or any Postgres connection string)

### Installation

```bash
git clone <your-repo-url>
cd bookmark-manager
npm install
```

### Environment Variables

Create a `.env` file in the project root:

```env
DATABASE_URL=your_neon_postgres_connection_string
```

### Database Setup

```bash
npx drizzle-kit push
```

### Run the Development Server

```bash
npm run dev
```

The app will be available at `http://localhost:3000`.

## Project Structure

```
.
├── app/
│   ├── routes/          # TanStack Router file-based routes
│   ├── components/      # UI components (Shadcn-based)
│   ├── server/          # Server functions (CRUD operations)
│   ├── db/
│   │   ├── schema.ts    # Drizzle schema definitions
│   │   └── index.ts     # DB connection setup
│   └── store/           # Zustand store(s)
├── drizzle.config.ts
└── package.json
```

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the development server |
| `npm run build` | Build for production |
| `npm run start` | Start the production server |
| `npx drizzle-kit push` | Push schema changes to the database |
| `npx drizzle-kit studio` | Open Drizzle Studio to inspect data |

## Roadmap

- [ ] Tagging and categorization
- [ ] Bookmark import/export
- [ ] User authentication
- [ ] Browser extension for quick-saving

## License

This project is for personal learning and portfolio purposes.
