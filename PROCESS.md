# PROCESS.md

How this site is built, and what has to be true before a change ships.

## The one rule

Every number on the site comes from a file in the audited repository, through
`scripts/extract-lw.mjs`. Nothing is typed by hand into a page or a component. If a figure
cannot be read from a source file, it does not appear.

## Pipeline

```mermaid
flowchart TD
  A[audited repo working tree] --> B[scripts/extract-lw.mjs]
  B --> C{8 cross-checks}
  C -->|any false| D[exit non-zero, build stops]
  C -->|all true| E[src/data/report.json]
  E --> F[src/lib/report.js]
  F --> G[Astro pages]
  G --> H[dist/]
  H --> I[wrangler deploy - Workers static assets]
```

`npm run verify` re-extracts into `.cache/report.verify.json` and diffs it against the
committed `src/data/report.json`, ignoring only the timestamp. It fails on drift, so a
stale committed figure cannot pass CI.

## The checks

The extractor refuses to write its output if any of these is false:

| check | what it catches |
|---|---|
| README counter block vs `tools/constructs.json` | the two tallies drifting apart |
| `COMPILED.md` audit table vs `tools/constructs.json` | an audit row added without a construct row, or the reverse |
| verdict tally in that table vs the JSON | a construct reclassified on one side only |
| facade census complete | a facade in the source that the audit never classified |
| MAP coverage index has no blank verdict | a documentation page silently dropped |
| README docs counter vs MAP row count | the same, from the other direction |
| ledger status tally covers every row | a ledger row whose status the parser cannot read |
| one feature-map row per area | a feature area that lost its rows in parsing |

## What is deliberately not published

`notes/PLAYBOOK.local.md` is gitignored in the audited repository: it is working-tree
material, not published text. This site therefore republishes only its aggregate shape
(row count, status tally, severity spread, area counts) and never its item text. The
`/ledger/` page states this in the reader's face rather than burying it.

## Local development

```sh
npm install
npm run extract    # refresh src/data/report.json from ../laravel-workers
npm run dev        # http://localhost:4321
npm run build      # static build into dist/
npm run preview    # build, then wrangler dev (Worker + assets, real 404 path)
```

## Release

```sh
npm run deploy     # extract -> verify -> astro build -> wrangler deploy
```

The deploy runs the extraction and the drift check first, so a stale or unverified figure
cannot reach the public URL. After deploying, load the root and one bad deep link: the
first must render, the second must return the styled 404 page rather than a bare browser
error.

## Verification recorded for the current revision

All of it in Chromium, against the built output, both themes.

| what | how | result |
|---|---|---|
| every page renders | 8 routes fetched and inspected | 8/8 |
| text contrast | computed colour pairs, WCAG contrast with alpha compositing | min 4.19:1 for large status text, 5.52:1 for 13px muted text |
| non-text contrast | census cells, dots, chips, buttons vs their ground | min 4.61:1, all above the 3:1 floor |
| horizontal overflow | 320, 360, 480, 600, 768, 1024, 1440 px, all routes | none |
| tap targets | interactive elements measured at 360 px | 24 px cells on coarse pointers; only inline links in prose are smaller, which WCAG 2.5.8 exempts |
| census grid interaction | chip filter, cell click, arrow keys, Enter | 118 rows to 64 and back, panel fills, focus moves |
| theme | pre-paint script plus toggle, both themes | theme is applied by an inline script before first paint; toggle swaps both palettes |
| keyboard reachability | repeated Tab from the document start | skip link, brand, nav, toggle, main content, footer |
| oversized tables | wide tables inside a scroll container | container is keyboard-focusable; page itself never scrolls sideways |

## Limits stated on the site

The `/method/` page is the public version of this list: which commit was read, what was
measured on what machine, that one-run CPU numbers are not a benchmark, that punctuation
inside quoted rows from the audited repo was normalised, and that the ledger's item text
is withheld.
