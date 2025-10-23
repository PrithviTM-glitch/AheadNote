# Aheadnote — UX/UI Design Brief

This repository is a Vite + React project used for the Aheadnote UX/UI design brief.

The instructions below assume you're on macOS using the zsh shell. The project uses Vite (see `vite.config.ts`) and the package scripts defined in `package.json`:

- `dev`: starts the Vite dev server
- `build`: builds a production bundle

## Requirements

- Node.js (recommended v18+). Use `node -v` to check.
- npm (bundled with Node) or your preferred package manager (yarn / pnpm).

## Run locally (recommended: npm)

1. Open a terminal and change to the project root:

```zsh
cd web 
```
OR
```zsh
cd mobile 
```

2. Install dependencies:

```zsh
npm install
```

3. Start the development server:

```zsh
npm run dev
```

The Vite dev server is configured to run on http://localhost:3000 and should open your browser automatically.

## Build for production

```zsh
npm run build
```

Preview the production build (option 1 — Vite preview):

```zsh
npx vite preview
```

Or serve the `build` folder with any static server.

## Using yarn or pnpm

If you prefer yarn:

```zsh
yarn
yarn dev
```

If you prefer pnpm:

```zsh
pnpm install
pnpm dev
```

## Troubleshooting

- If `npm install` fails due to an incompatible Node version, install or switch to Node 18+ (nvm is recommended):

```zsh
# install nvm (if you don't have it) and then:
nvm install 18
nvm use 18
```

- If port 3000 is in use, start Vite on a different port:

```zsh
npx vite --port 5173
# or
npm run dev -- --port 5173
```

- If you hit dependency errors, copy the error message and open an issue here or ask for help.

---

If you want, I can run `npm install` and `npm run dev` in this workspace and paste the output here — tell me "Yes, run it" to proceed (this will use network access to download packages).
