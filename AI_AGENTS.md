# AI Agent Context — newiniot.com (NewInIoT)

## What this project is
A no-login utility site for IoT engineers. Two pillars:

1. **Interactive calculators** for fleet economics — MQTT cost, IoT battery life, OTA bandwidth (coming soon).
2. **Structured platform update logs** — version timelines for the IoT platforms engineers actually ship on (`/updates`, `/updates/:slug`, plus a legacy `/esp32-updates` route).

Tagline: *"Track what changed in IoT. Calculate what it costs."*

Distinct from the broader `iotnews.today` intelligence platform — this site is focused on calculators and changelogs.

## Stack
- Language: TypeScript / JSX (mixed — `App.jsx`, `main.tsx`)
- Framework: React 18 + Vite 5 (SWC plugin)
- Routing: react-router-dom v6
- UI: MUI v9 + Radix UI (shadcn/ui set, see `components.json`) + Tailwind CSS
- Forms: react-hook-form + zod
- Data fetching: TanStack Query v5
- Tests: vitest + @testing-library/react + jsdom
- Origin: Lovable-generated scaffold (`lovable-tagger` dev plugin still wired in `vite.config.ts`)

## Project structure
- `src/pages/` — route components: `Home`, `ToolsIndex`, `MqttCostTool`, `BatteryLifeTool`, `UpdatesIndex`, `UpdatePage`, `NotFound`
- `src/components/` — shared UI (incl. `Navbar`, `ToolCard`)
- `src/data/` — static JSON content (`tools.json`, `updates.json`)
- `src/theme/` — MUI theme
- `src/hooks/`, `src/lib/`, `src/test/` — utilities, hooks, test setup
- `public/` — static assets
- Path alias `@/` → `src/`

## Builder background — Docker + Makefile from `sites/`

This project is built via the shared infrastructure in the parent `sites/` directory, **not** by running pnpm/node directly on the host.

### Why
- All `sites/*` projects share one Volta-pinned toolchain (Node 18.17.1, pnpm, vite, tailwind, postcss) defined in `sites/Dockerfile`.
- Building on the host would drift from the toolchain that Cloudflare Pages and other deploy targets expect.
- The image (`sites1`) is reused across projects, so `make buildsh` is cheap after the first build.

### How
From the `sites/` directory:

```bash
make buildsh                       # build the sites1 image and drop into a bash shell inside it
                                   # mounts $(sites)/ to /usr/src/app, exposes ports
# inside the container:
make deps                          # install global pnpm/Volta tooling (one-time per shell)
make run  proj=newiniot.com        # cd newiniot.com && pnpm install && pnpm dev (Vite on :8080)
make test proj=newiniot.com        # pnpm install && pnpm build && pnpm test (+ test:seo if defined)
```

The Makefile lives at `../Makefile` (i.e. `sites/Makefile`). Key targets:

| Target  | What it does |
|---------|--------------|
| `buildsh` | Build `sites1` image from `sites/Dockerfile` and run a shell with the workspace mounted (`./dev_container.sh`). |
| `deps`    | `pnpm setup` + install stable toolchain. Required once per fresh shell. |
| `run`     | `pnpm install` + `pnpm dev` in `proj=<dir>`. Auto-detects Astro/Vite scripts. |
| `test`    | Install + build + `pnpm test`, plus `pnpm test:seo` if the script exists. Refuses to run outside Docker. |
| `clean`   | Removes `package.json`, `package-lock.json`, `node_modules/` from the *current* dir. |
| `reclaim` | Prunes Docker containers/images/volumes/networks. |

### Conventions enforced by the builder
- **Package manager: pnpm only.** No `bun.lockb`, no `package-lock.json`. The `make` targets call `pnpm install`/`pnpm dev`/`pnpm build`/`pnpm test`. (This project was originally bun-scaffolded by Lovable — those lockfiles have been removed.)
- **No nested git repos.** Cloudflare Pages will choke on stray gitlinks (mode `160000` entries in the parent tree). This project's source must live directly under `sites/newiniot.com/`, not as a submodule.
- **Vite dev server** binds to `::` on port `8080` (see `vite.config.ts`), reachable from outside the container via the host-network mapping in `dev_container.sh`.

### Cloudflare Pages deploy notes
- Cloudflare Pages requires **Vite ≥ 6** for sites under this monorepo. Current `package.json` pins `vite ^5.4.19` — bump before first Pages deploy.
- `pnpm install --frozen-lockfile` is used in CI; commit `pnpm-lock.yaml` after the first `make run` regenerates it.
- Do **not** add a `_redirects` SPA fallback; Pages handles client-side routing differently for this monorepo.

## How to run (TL;DR)
```bash
# from sites/
make buildsh                       # enter Docker
# inside container:
make run proj=newiniot.com         # dev server at http://localhost:8080
```

## Status
- **Migrated:** Code moved out of the standalone `genai/iot-compute-hub` repo into `sites/newiniot.com/` to use the shared Docker+Makefile builder.
- **Pending:** First `pnpm install` inside Docker (regenerates `pnpm-lock.yaml`); Vite 5 → 6 bump before Cloudflare Pages deploy; OTA Bandwidth tool still marked `comingSoon` in `src/data/tools.json`.

## Out of scope / don't touch
<!-- fill in as constraints emerge -->
