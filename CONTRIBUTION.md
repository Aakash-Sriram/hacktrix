# Contributing

This repo is a Next.js + Supabase prototype for a financial-literacy simulation game. The codebase is intentionally modular so UI, domain logic, and backend integration can evolve independently.

Before making changes, read `AGENTS.md` (it contains important repo-specific Next.js guidance).

## Architecture (Matches Repo Layout)

- **UI & routing**: `app/`
  - Keep route files thin: compose feature components, load data, and handle navigation.
  - Current implemented routes include `/dashboard`, `/login`, and `/auth/callback`.
- **Feature modules**: `features/<feature>/`
  - Feature UI components live here (e.g. `features/dashboard/components/*`).
  - Some feature folders are currently placeholders while the project is being built out.
- **Shared primitives/utilities**: `shared/`
  - Reusable UI primitives live in `shared/components/ui/*`.
  - Shared layout building blocks live in `shared/components/layout/*`.
  - Small helpers/constants live in `shared/utils/*`, `shared/constants/*`.
- **Server-side code**: `server/`
  - Supabase service-role client is in `server/db/db.ts` (must remain server-only).
  - `server/services/*` and `server/repositories/*` exist, but some files are currently stubs (0 bytes). If you need them, implement them rather than assuming functionality exists.
- **Runtime config**: `config/`
  - Environment variables are wired in `config/env.ts`.

## Feature Structure (Recommended Convention)

When creating a new feature, prefer this internal layout:
```text
features/<feature-name>/
- components/  # React components specific to the feature
- hooks/       # Custom hooks (optional)
- logic/       # Pure, testable domain logic (optional but preferred)
- services/    # Feature-scoped API/data access helpers (optional)
- index.ts     # Feature public API (optional; add when it helps)
```

## Coding Guidelines

1. **Absolute imports**: Prefer `@/*` imports (configured in `tsconfig.json`) over deep relative paths.
2. **Keep Next routes thin**: Put reusable UI in `features/` or `shared/`, not in `app/` route files.
3. **Server-only secrets**: Never reference `SUPABASE_SERVICE_ROLE_KEY` (or anything in `server/`) from client components.
4. **Prefer pure logic**: Simulation/state transition logic should be pure functions in `features/<feature>/logic` so it’s easy to test and reuse.
5. **Don’t assume stubs work**: Several files are placeholders (empty). If you need a service/repository/test, implement it as part of your change.

## Local Setup

1. Install dependencies: `npm install`
2. Run the dev server: `npm run dev`
3. Run lint: `npm run lint`
4. Production build check: `npm run build`

### Supabase Environment

See `config/env.ts` for expected variables:

```bash
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...
```

## How to Contribute

1. Fork the repository.
2. Create a new branch: `git checkout -b feature/your-feature-name`.
3. Make your changes following the rules above.
4. Verify: `npm run lint` and `npm run build`.
5. Submit a Pull Request.

## Testing

`tests/` exists, but a dedicated test runner isn’t wired into `package.json` yet. If you introduce non-trivial logic (especially in `features/*/logic`), add tests and update `package.json` with an appropriate `test` script as part of the same PR.

---

Thank you for contributing to better financial education for everyone!
