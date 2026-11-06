# laravel-workers-report

The public report for [`arfoux/laravel-workers`](https://github.com/arfoux/laravel-workers):
what the compiler carries, what it refuses, and where the platform wall sits.

Deployed to Cloudflare Workers (static assets); the URL is the owner's to publish, so it is
deliberately not recorded here. `npm run deploy` prints it.

## What this is

A static site built by Astro, generated from the audited repository by script. No figure
on any page is typed by hand without a build check behind it: `scripts/extract-lw.mjs`
reads `README.md`, `MAP.md`, `COMPILED.md`, `tools/constructs.json`, `package.json` and
two working-tree notes (`notes/PLAYBOOK.local.md` for the audit ledger,
`.opencode/context.md` for the severity definitions) from the audited repo, cross-checks
them against each other, and writes `src/data/report.json`. A check that stops agreeing
with its source stops the build.

If a figure cannot be verified, the page says so rather than smoothing it over. The
`/method/` page lists what was measured, on what machine, and what could not be checked.

## Layout

```text
scripts/
  extract-lw.mjs        reads the audited repo, cross-checks it, writes src/data/report.json
  verify-lw.mjs         re-extracts and diffs; fails on drift
src/
  data/report.json      the only data source for every page
  lib/report.js         typed accessors over that JSON
  layouts/Base.astro    document shell: head, theme boot, topbar, footer, provenance
  components/           Stat, Census, CensusGrid
  pages/                home, constructs, coverage, gaps, ledger, method, report, 404
  styles/site.css       single stylesheet, four cascade layers
  worker.js             Worker entry: static assets plus a real 404 page
public/                 logo.svg and favicon.svg, copied byte-identical from `docs/`
```

## Commands

```sh
npm run extract    # re-read the audited repo, rewrite src/data/report.json
npm run verify     # extract into a temp file and diff against the committed data
npm run dev        # local dev server
npm run build      # static build into dist/
npm run deploy     # extract, verify, build, then wrangler deploy (Workers static assets)
```

`LW_REPO` overrides the audited repo path (default `../laravel-workers`).

## Hosting

Cloudflare Workers with static assets: `wrangler.jsonc` points `main` at `src/worker.js`
and binds the build output as `ASSETS`. The Worker serves the assets, and for anything the
build did not emit it returns `/404.html` with a real 404 status, so a bad deep link still
lands on the styled page.

## Deploying

```sh
npm run build
npx wrangler deploy
```

## Data freshness

Every page prints the audited commit, version and extraction date in the footer, taken
from `report.json`. Re-run `npm run extract && npm run build` after the audited repo
moves; `npm run verify` is the check that the published numbers still match their source.
