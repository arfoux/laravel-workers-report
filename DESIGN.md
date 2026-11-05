# DESIGN.md

Direction for the `laravel-workers-report` site. Written by the agent on the owner's
instruction ("pikirkan ui nya sematang mungkin"), not invented as an example.

Reading this as: a build-coverage report for Laravel developers who are deciding whether
to put an app on Cloudflare Workers, in a lab-notebook visual language, dial ENERGY 2 /
RHYTHM 3 / MOTION 1.

## Identity

The report borrows the product's own identity instead of inventing a second one.
`laravel-workers/docs/BRAND.md` is the single source for the mark and the palette; this
site links to it and does not fork it.

- **Mark**: `docs/logo.svg` from the product repo, the Laravel "L" whose foot ends in an
  edge arrow. Copied byte for byte into `public/`. Reason: the report is about that
  project, and a second mark would compete with it.
- **Motif**: the census cell. One small square, repeated, is the unit of measurement for
  everything on this site (the coverage grid, the legend, the section rules, the inline
  status keys). Reason: the project's central claim is a census of 118 constructs, and a
  repeated square is that census in its smallest form.
- **Personality**: an instrument readout, not a landing page. It states the verdict, then
  the number behind it, then the file the number came from. It never congratulates the
  reader and never sells.

## Palette

Status colours come from the product's brand file and keep their meaning there.

| token | hex | role | reason |
|---|---|---|---|
| `laravel` | `#FF2D20` | the PHP side; used only in the mark | it is the product's own source colour |
| `workers` | `#F38020` | the edge; the accent and the focus ring | it is the product's own edge colour |
| `shore` | `#1FA37C` | verdict: compiles | the brand file assigns it to a clean run |
| `signal` | `#E0A126` | verdict: documented build-level decision | the brand file assigns it to named gaps |
| `block` | `#D14343` | verdict: fails loud | the brand file assigns it to a refusal |
| `ink` | `#0E1412` | text and dark ground | the brand's text colour |
| `paper` | `#F5F2EA` | light ground | the brand's light ground |

The three status colours are the brand hues, but each is *rendered* from a
`light-dark()` pair rather than the brand hex directly:

| verdict | light | dark | why |
|---|---|---|---|
| compiles | `#0f7f60` | `#2fbc93` | the brand's `#1FA37C` reaches only 2.6:1 on paper, which fails 4.5:1 even at the 26px the stat values use |
| documented | `#9a6b00` | `#e0a126` (the brand hex) | `#E0A126` reaches 1.7:1 on paper; the dark value is the brand's own |
| fails loud | `#a92f2f` | `#e06a6a` | `#D14343` reaches 3.3:1 on paper and 2.9:1 on ink, so neither theme can use it raw |

Measured on the built site, the rendered values land at 4.19:1 to 6.59:1 against
their ground in light and 5.52:1 to 7.96:1 in dark, all above the 3:1 large-text
floor and, for cell fills, the 3:1 non-text floor. The brand's own hex stays in
the README table above because that is where it is the source of truth; the site
is where it has to be legible.

Two core colours (`laravel`, `workers`) plus one accent. The accent is `workers`, used for
the single most important non-verdict marker on a page (the current nav rule, the focused
cell outline's neighbour). Neutrals (`ink`, `paper`, and their two derived greys) are
excluded from the count. `shore` / `signal` / `block` are status, never decoration: every
use of them is paired with the verdict word in a label or the legend, so colour is never
the only signal.

No third brand colour. No gradient as a surface; the mark's own gradient stays inside the
mark.

## Typography

- **Prose**: the system sans stack (`system-ui, -apple-system, Segoe UI, Roboto, ...`).
  Reason: the product ships no webfont and the brand file says none is needed; matching it
  keeps the report honest about its own weight and adds no network request.
- **Numbers and identifiers**: the system mono stack (`ui-monospace, SFMono-Regular,
  Menlo, Consolas, monospace`). Reason: the census cells, file:line citations and verdict
  counts are compared column-wise, and tabular figures have to line up. Mono is used for
  data only, never for headings or body copy.
- **Scale**: fluid, `clamp()` per step, five steps. Mobile gets a smaller step rather than
  the desktop scale squeezed. No uppercase display labels.

## Mood

Calm, exact, slightly cold. Whitespace is structural: it separates a claim from its
evidence. Nothing floats: elements sit flat on the ground, and the only elevation cue is a
hairline border. The page should feel like a printed instrument sheet that happens to be
interactive.

## Dials

`Dial: ENERGY 2 / RHYTHM 3 / MOTION 1`

- **ENERGY 2**: the first screen states the verdict at a readable size with the census
  grid directly under it. It does not shout, and there is no hero image or animated
  background.
- **RHYTHM 3**: sections visibly differ. The census grid is dense and multi-row; prose
  sections are a narrow measure; the coverage table is wide; the ledger runs as a
  two-column list. No section is a repeat of another's internal layout.
- **MOTION 1**: hover, focus and active states only. No entrance animation, no parallax,
  no scroll reveal, no looping pulse. The only movement is state feedback: a
  `prefers-reduced-motion: reduce` block collapses every duration to zero and removes
  smooth scrolling, and no rule relies on animation to carry meaning.

## Composition rules for this site

1. **Every number carries its source.** A number is rendered next to the file it came
   from, and every count on the site is produced by `scripts/extract-lw.mjs`, never typed.
   Reason: the audited project's own rule is that a hand-typed count is a bug.
2. **Verdict before number, number before prose.** Reason: a reader deciding on adoption
   needs the split first, the evidence second, the argument last.
3. **No section that only fills a template.** No testimonials, no pricing, no "trusted
   by", no FAQ, no call to action that has nothing to link to. Reason: there is no such
   content here.
4. **Tables are the primary medium for lists of facts**, not cards. Reason: the content is
   comparable rows, and cards would hide the comparison.
5. **Interactive elements earn their place**: the census grid is a real filter and a real
   detail view, the theme toggle really switches themes. Everything else is a link.

## Open question for the owner

The third bucket (`documented`, 7 of 118) is described by the audited repo as "build-level
decisions the compiler cannot judge". If you have a word you prefer for it in your own
docs, say so and this file changes with it.
