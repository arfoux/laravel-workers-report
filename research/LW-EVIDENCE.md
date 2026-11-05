I have enough evidence. Producing the final report now.

# laravel-workers — Evidence Report: Laravel Support Numbers, Matrices, Gaps, Verdicts

Repo: `C:/Users/HP/Documents/vscode/laravel-workers` (read-only audit, 2026-11-06). Every number below carries `file:line`. Where a number is *computed*, the generating script is named. `[INFERENCE]` marks my own derivation, never a repo claim.

---

## 1. Lead numbers

| # | Number (exact wording) | file:line | Where computed / source |
|---|---|---|---|
| L1 | `constructs   47 compile · 64 fail loud · 7 documented   (118 audited)` | `README.md:36` | **Generated**: `tools/docs-counts.mjs:41` from `tools/constructs.json` (`expect==='ok'|'fail'|null`); written between `<!-- readme-counts:start -->`/`:end`; gate `docs-counts.mjs --check` |
| L2 | `facades      47/47 classified (100%)` | `README.md:37` | `tools/docs-counts.mjs:44-47` — counts ids starting `facade_` vs `meta.facade_total` |
| L3 | `blade corpus 55/55 byte-identical vs PHP 8.3` | `README.md:38` | `tools/docs-counts.mjs:50` — length of `compiler/tests/corpus/cases.json` (file is 387 lines ≈ 55 case objects `[INFERENCE]`) |
| L4 | `docs         105/105 pages with a verdict` | `README.md:39` | `tools/docs-counts.mjs:53-57` — rows in `MAP.md` §C; **hard-coded expectation also at `tools/docs-check.mjs:31` (`EXPECTED = 105`)** |
| L5 | `118 constructs: 47 compile, 64 fail loud, 7 documented at the build level.` | `COMPILED.md:749` | **Generated**: `tools/construct-audit.mjs` (`npm run audit:constructs`), `<!-- construct-audit:start/end -->` |
| L6 | `The Laravel 13 facades: 47 of 47 classified (6 compile, 41 fail loud) — the facade coverage is 100%` | `COMPILED.md:749` | `tools/construct-audit.mjs` ← `tools/constructs.json` |
| L7 | `constructs   113 (43 compile, 63 fail loud, 7 build-level)` + `facade 47/47 = 100%` | `docs/AUDIT-2026-10-27.md:16` | **STALE — dated measurement, never regenerated** (see §6) |
| L8 | `npm test 800/800 (Node) + 800/800 (Bun)` | `docs/AUDIT-2026-10-27.md:15` | Dated audit table (2026-10-27) |
| L9 | `npm run test:corpus 51/51` | `docs/AUDIT-2026-10-27.md:17` | Dated audit table |
| L10 | `npm run check:docs … 105/105` | `docs/AUDIT-2026-10-27.md:18` | Dated audit table |
| L11 | `Test counts | npm test 890/890 · corpus 51/51 · docs-check 105/105` | `MAP.md:429` | `MAP.md` §B "Current state" — **hand-typed, differs from L8/L9** (see §6) |
| L12 | `npm test 765/765; gate.mjs PASS` | `docs/AUDIT-REAL-APPS.md:30` | Dated running log (older than L8) |
| L13 | `npm test 1080 tests / 1037 pass / 0 fail / 43 skip` | `notes/PLAYBOOK.local.md:187` | Baseline recorded in G.5 recipe |
| L14 | `81 berkas / 29.227 baris tes vs 86.977 baris source` | `notes/PLAYBOOK.local.md:252` | G.8 self-assessment (2026-11-02) |
| L15 | `line 83,35 % · branch 81,93 % · func 79,45 %` (kernel test coverage, 629 tests) | `notes/PLAYBOOK.local.md:255-256` | `node --experimental-test-coverage`, measured 2026-11-02; **not wired to CI** (S12) |
| L16 | `Duplikasi keseluruhan: ~10,6% (… 86.977 baris, 2026-11-02)` | `notes/PLAYBOOK.local.md:164` | 12-line-window heuristic, upper bound |
| L17 | `handler measured 1–6 ms → normal pages fit` | `COMPILED.md:62` | `npm run gate:cpu` (`tools/cpu-gate.mjs`), probe worker `lw-cpu-probe` |
| L18 | `cpu p50 5 ms / p95 41 ms / max 62 ms`, wall p95 44 ms | `COMPILED.md:49` and `MAP.md:46` | `npm run gate:cpu`, 200 requests / 4 connections |
| L19 | `measured p95 ≤ 5 ms CPU on the reference machine` | `package.json:4` (description) | **Implied from** `kernel/tests/budget.test.mjs` — wall-clock Node, **excludes D1/KV** (see §6, S9) |
| L20 | `compiled    → router → controller → D1 (p95 ≤ 5 ms, see budget gate)` | `README.md:55` | Same contested claim; flagged by S9 |
| L21 | `p95 ≤ 5 ms (encrypter ≤ 30)` / `kernel/tests/budget.test.mjs — p95 ≤ 5 ms hot, ≤ 30 ms for the encrypter` | `docs/AUDIT-2026-10-27.md:20`, `README.md:651` | `kernel/tests/budget.test.mjs` |
| L22 | `Laravel-wasm worker burst 12/18 OK, CPU 1008–2018 ms` | `MAP.md:44` and `:309` | Probe |
| L23 | `Native JS handler (ports) 1–6 ms CPU, 26/26 OK` | `MAP.md:45` and `:310` | Probe |
| L24 | `Static asset response  0 worker invocations` | `MAP.md:49` | verified behaviorally |
| L25 | `Static page latency ~0.83s incl. network wall` | `MAP.md:50` | smoke |
| L26 | `Enforcement … 25/25 exceededCpu` | `MAP.md:48`, `COMPILED.md:56` | `npm run gate:cpu` |
| L27 | `kill at cpu=2020 ms`, `killed at ~2.02–2.31 s CPU` | `COMPILED.md:62`, `:53` | `npm run gate:cpu` |
| L28 | `bcryptjs cost6=22 / cost8=43 / cost10=93–104 / cost12=679 ms CPU` | `COMPILED.md:63` | measured in workerd |
| L29 | `build cache … 199 files / ~3.0 MB … ≈1.3 s vs ≈35 s` | `README.md:415`, `:426`; `docs/AUDIT-REAL-APPS.md:83-86` | `tools/build-cache.mjs` |
| L30 | `exactly 5 Laravel boots` on the 43-route fixture | `README.md:404-406`; `docs/AUDIT-REAL-APPS.md:100` | Instrumented via `PHP_INI_SCAN_DIR` + `auto_prepend_file` |
| L31 | `a boot measured 2815 / 3064 / 5101 ms` (cold) | `docs/AUDIT-REAL-APPS.md:60` | measured, 3 runs |
| L32 | `composer install … ~379 s cold` | `README.md:362`; `docs/SWEEP-FINDINGS.md` A1 | stated |
| L33 | Vendor cache sizes `42MB / 104MB / 133MB / 756MB` | `docs/SWEEP-FINDINGS.md` (table F2) | observed |
| L34 | `verdict: runs on the edge` badge | `README.md:6` | static shields badge |
| L35 | `shadow: 54/56 byte-identical, 1 shape-verified, 1 documented divergence` (M69/M70) | `COMPILED.md:509` | `shadow/run.mjs` |
| L36 | `construct app 17/19 byte-identical (2 documented divergences), fresh app 9/10 (1), 0 unexplained` | `MAP.md:428` | shadow harness (M24) |
| L37 | `105 pages … 15 ✅ · 59 🟡 · 5 🔴 … 26 ⛔` | `MAP.md:551` | MAP §C tally (**contradicted by COMPILED, see §6**) |
| L38 | `105 pages … 15 ✅ … 46 🟡 … 26 ⛔ … 13 planned … 5 🔴` | `COMPILED.md:488-489` | COMPILED §8b (**contradicts L37**) |
| L39 | `81 tokens × 5 rules (405 verdict cells) is 0 divergent` | `COMPILED.md:313-314` | differential vs vendor |
| L40 | `211 verdict+message-count differential cases … 0 diff`, `20 timezone cases (0 diff)`, `npm test 1026 tests / 0 fail` | `MAP.md:354` | measured 2026-10-21 |
| L41 | `validation-messages-check … "OK (111 messages match the framework copy)"` | `notes/PLAYBOOK.local.md:218`, `:169(G.4)` | `tools/validation-messages-check.mjs --require` |
| L42 | `Laravel (source of truth) 13.37.0 (nearFind), 11.34.2 (blogkit)` | `README.md:113` | stated requirement row |
| L43 | `PHP 8.3.30 (ZTS x64, Windows)`, oracle 8.3.30 | `README.md:114`; `docs/AUDIT-2026-10-27.md:6` | stated |
| L44 | `Node 22.18.0`, `Bun 1.4.0`, `npm 10.9.3` | `README.md:117-119`; `docs/AUDIT-2026-10-27.md:6` | stated |
| L45 | `wrangler 4.151.1 (fixture app … live mode 2/3 smoke … HTTP 200) / 3.114.13 (repo)` | `README.md:120` | stated; matches live smoke claim in `docs/READINESS.md:deployment` |
| L46 | `284 commit` at tag v0.4.5 | `docs/AUDIT-2026-10-27.md:6` | dated audit |
| L47 | `Tarball … ~2.4 MB` | `docs/AUDIT-2026-10-27.md:28` | `npm pack --dry-run` |
| L48 | `RELEASE … branch feat/0.4.9-release = 6 commit di atas main (main = 5cbce6a 0.4.8)`; `package.json` version `0.4.9` | `notes/PLAYBOOK.local.md:371`; `package.json:3` | stated |
| L49 | `0 GitHub issue` on `arfoux/laravel-workers` — all `#NNN` refs are internal audit IDs | `notes/PLAYBOOK.local.md:405` | `gh issue list --state all` |
| L50 | `3 stars`; `13 topics` (audit) / `16 topics` (CHANGELOG) | `docs/AUDIT-2026-10-27.md:24`; `CHANGELOG.md:9` | **internal contradiction, see §6** |

---

## 2. Per-area breakdown — support matrices

**Yes, four matrices exist.** All bucket rows by Laravel area, but they use **different vocabularies** — this matters for the report site.

### 2a. `MAP.md` §5 "Feature map (the padanan table)" — `MAP.md:140-234`
Rows are **modules** (not docs pages), grouped into seven lettered areas:
`A. Routing & HTTP (MAP.md:148)` · `B. Views (:163)` · `C. App code (:173)` · `D. Data (:184)` · `E. State & security (:199)` · `F. Platform services (:208)` · `G. Frontend / DX (:222)`.
**Bucket vocabulary** (`MAP.md:9-13`): `✅ fits` · `🟡 Soft tolerance — works with a documented trade-off` · `🔴 Hard — platform wall → needs a defined padanan` · `⛔ N/A at edge`. Per-row columns: `Laravel | Edge equivalent | Class | Notes / padanan | Plan`.

### 2b. `MAP.md` Appendix C "Coverage index — every Laravel 13.x docs page × verdict" — `MAP.md:438-551`
Rows are the **105 Laravel docs pages**. **Bucket vocabulary** (`MAP.md:440`): `✅ fits · 🟡 soft (trade documented) · 🔴 hard → padanan required · ⛔ N/A at edge (local-only/meta) · ph2/ph3 = planned phase`. Fully quotable rows by area: e.g. `eloquent | 🟡 | schema-driven ORM subset` (`MAP.md:473`), `queues`/`scheduling` in F, etc.

### 2c. `docs/READINESS.md` — "Full Coverage Table (105 pages)" — `docs/READINESS.md:14-117`
Reader-facing projection of 2b with a **four-value prose vocabulary** (`docs/READINESS.md:5-12`): **`RUNS ON THE EDGE`** · **`RUNS WITH DECLARED GAPS`** · **`NEEDS PADANAN (PORT)`** · **`NOT APPLICABLE AT EDGE`**. This is the file to quote for per-area sentences (it words Eloquent, Validation, Queues, Mail, Storage, Events, Auth, Blade, Routing… row-per-page). Runtime verdicts after a build (`docs/READINESS.md:129-136`): **`RUNS ON THE EDGE`** / **`RUNS WITH DECLARED GAPS`** / **`DOES NOT RUN`**.

### 2d. `README.md` "Compiles today" — `README.md:486-508`
Rows are **feature groups** majoring on Eloquent/Blade/Auth/Validation/Storage/Mail/Events/Queues with a **`Proof`** column, plus a companion "Fails loud (use a port instead)" table at `README.md:510-521`. Columns: `Area | What's supported | Proof`.

### 2e. Construct-count buckets (per-construct, not per-module)
`COMPILED.md:749` / `README.md:36`: **`compile` · `fail loud` · `documented` (build level)** over 118 audited constructs; and **`✅ compiles` · `⛔ fails loud (LW002/003)` · `— documented (build level)`** per row in the generated table (`COMPILED.md:744-748`).

---

## 3. Gaps — what is NOT supported, in the repo's own words

The repo groups gaps by **verdict bucket** rather than by severity; the only severity-like grouping is the P1/P2/P3/INFO audit ledger (§4). Quotable gap statements:

| Area | Repo's exact words | file:line |
|---|---|---|
| Whole classes of feature (hard walls) | `🔴 **Hard** — platform wall → needs a defined *padanan* (alternative) or the escape hatch` | `MAP.md:12` |
| Broadcasting / WS | `broadcasting | 🔴 | SSE/polling padanan; WS via DO/external` | `MAP.md:459` |
| Images | `images | 🔴 | no GD/Imagick → CF Images or build-time` | `MAP.md:492` |
| Processes / Reverb / Redis (+ DateInterval) | `broadcasting/processes/reverb (each needs a runtime the edge does not have: a websocket subscriber, a child process, a fan-out server)` | `COMPILED.md:509` |
| Blade components | `Blade `<x-...>` components | compile to `$__env->...` — only the layouts compile | hand-written `ports/*.mjs`` | `README.md:514` |
| Queue dispatch | `Queue::push(SomeJob::class) | the job would never run at the edge — no queue handler, the binding carries JSON not a PHP job` | `README.md:516` |
| Cache tags | `Cache::tags() | the D1 `database` store has no tags` | `README.md:518` |
| CORS config | `CORS config | the `Access-Control-*` headers would be missing` | `README.md:519` |
| Non-declared config group | `the compiled code reads an app config group … the build refuses the `config('<key>')` it cannot answer` | `README.md:520` |
| Self-registered guard driver | `a non-session `auth.guards.*` driver the app registers itself (`Auth::extend`)` | `README.md:521` |
| try/catch | `A `try/catch/finally` statement | ⛔ fails loud (`LW002`) … Rewrite without try/catch, or port the route.` | `COMPILED.md:748` |
| Relation-as-property | `A relation (or an accessor) read as a property is not compiled: the build stops (LW003).` | `COMPILED.md:682` |
| File content-type / finfo | `The content type is read from the file's bytes (finfo): the edge cannot sniff the content like PHP does` | `COMPILED.md:676` |
| FormRequest hooks | `A FormRequest that overrides `validator()`` + `prepareForValidation()` unsupported | `COMPILED.md` row (M62f); `MAP.md:179` |
| Folio | `folio | ⛔ | NOT ported (0 code); Laravel Folio page routing unsupported` | `MAP.md:487` |
| Local-only/meta pages (26 pages) | `⛔ N/A at edge (local-only/meta)` — e.g. `artisan`, `dusk`, `sail`, `valet`, `telescope`, `horizon`, `homestead` | `MAP.md:440`, `:450-527` (`docs/READINESS.md:16-117`) |
| Timezone divergence (known) | `the compiled rung answers the dates in UTC … while Laravel uses `config('app.timezone')` — an app with a non-UTC timezone gets different dates` | `MAP.md:494` / `docs/READINESS.md:62` (localization row) |
| Storage tiers | `free plan first … → R2 kalau app butuh … → paid plan hanya kalau free path memang tak cukup` | `MAP.md:483` (`docs/READINESS.md` filesystem row) |
| Never-a-runtime stance | `Not a Laravel runtime, not PHP-in-Worker` | `MAP.md:6`; `README.md:30` |

Additionally, the D1 blob store's hard cap is declared as a real gap: `the D1 blob store (the free path) caps an object at 1.5 MB — the compiled side fails loud where the local disk has no limit (a platform limit, not a Laravel rule)` (`shadow/scenarios/lw-constructs-app.mjs:605-607`, `expect: 'diverges'`).

---

## 4. Verdicts — over-built vs correctly complex (PLAYBOOK G.0–G.9 / S1–S19)

There is **no verdict on "over-built" outside `notes/PLAYBOOK.local.md`**; the other verdict artifacts are runtime verdicts (§2c, `action/verdict/main.mjs`, `docs/verdict.svg` = a **brand mark**, not a verdict row: `docs/verdict.svg:1`, described at `docs/BRAND.md:23`). `docs/AUDIT-2026-10-27.md:9-12` gives a dated "Verdict: Utuh. 0 temuan HIGH/MEDIUM" (whole, no HIGH/MEDIUM findings) — quoted in §6.

Ledger, quoted verbatim from `notes/PLAYBOOK.local.md` (G.3, `:140-165`; G.10 `:283-…`). Statuses as of the file's last edit.

- **G.0 goal (verbatim user)** — `notes/PLAYBOOK.local.md:104-117`: quote begins `"menurutmu di repo/projek ini dan segala yang kamu lakukan di sini termasuk ngepush, audit, test, dan semua yang dilakukan adakah saran yang mungkin kayak ini tuh ga harus seribet ini …"`; contract clause 3: `Tujuan **bukan** mengecilkan repo, tapi memisahkan *kompleksitas yang dibenarkan* dari *kerumitan nyasar*` (`:115-116`).
- **G.1 two-phase evidence rule** — `:119-126`: `A. Sapu akar/struktur … **SELESAI + terverifikasi**`; `B. Sapu baris-per-baris kode … **BELUM** — sisa ≈29.900 baris`.
- **G.2 "do not touch" (justified complexity)** — `:128-139`, table rows incl. `boot→build-time … MAP.md:15`, `fail-loud LW002/LW003/LW999 … COMPILED.md §9`, `oracle PHP 8.3 … spesifikasi, bukan hiasan`, `tools/cpu-gate.mjs … satu-satunya sumber jujur`.

Ledger rows (`# | area | saran | risiko | status`; `notes/PLAYBOOK.local.md:142-163`):

| ID | status (verbatim) | lives at |
|---|---|---|
| S1 | `OPEN` — replace 84-path `package.json:test` with `node --test`; requires S2 first | `:144` |
| S2 | `OPEN (koreksi)` — **do not delete** the 3 non-`test()` parity harnesses | `:145` |
| S3 | `OPEN` — delete empty `ci-logs/` | `:146` |
| S4 | `OPEN` — add `concurrency:` to CI workflows | `:147` |
| S5 | `OPEN` — single `verify` job in `publish.yml` | `:148` |
| S6 | `OPEN` — compute coverage rows from `MAP.md`, drop `EXPECTED = 105` | `:149` |
| S7 | `OPEN` — move 3 archive docs to `docs/archive/` | `:150` |
| S8 | `OPEN` — add `npm run test:fast` (<30 s) | `:151` |
| S9 | `OPEN` — **correct the "p95 ≤ 5 ms" stuck to D1** | `:152` |
| S10 | `OPEN` — factor out oracle PHP bootstrap prelude (138 identical 12-line windows) | `:153` |
| S11 | `OPEN` — `encrypter.mjs` ↔ `hash.mjs` 11 identical windows | `:154` |
| S12 | `OPEN` — no line-coverage tool at all; add `--experimental-test-coverage` | `:155` |
| S13 | `OPEN (klarifikasi)` — shadow "100% coverage" = scenario-step coverage, NOT code coverage | `:156` |
| S14 | `**DONE (2026-11-03)**` — vendor resolver `LW_VENDOR_DIR` (P2 bug) | `:157` |
| S15 | `**DONE (2026-11-03)**` — shadow stdout/JSON + ghost-view lexer (P3) | `:158` |
| S16 | `**DONE (2026-11-03)**` — wire dead `vendor-dir.test.mjs` into CI | `:160` |
| S17 | `**DONE (2026-11-03)**` — guard port (`Auth::extend`) + `ports/` in build cache (#692) | `:161` |
| S18 | `**bug P1**` — vendor-lite cache-miss ReferenceError (fixed, commit `030a07b`) | `:162`, `:378-379` |
| S19 | `OPEN` — vendor-lite `downloadFile()` no fetch timeout (P3) | `:163` |

G.4 corrections ledger (do-not-re-raise) — `notes/PLAYBOOK.local.md:166-178`, verbatim verdicts include `"CI tidak punya `timeout-minutes`" | **SALAH** — ada`, `"sebagian tes di luar `npm test`" | **SALAH** — ke-81 `.test.mjs` semuanya terdaftar`, and `"klaim cakupan 100%" (36.148 baris / 138 berkas) | **KOREKSI** — klaim itu BOLONG … cakupan berkas sumber **kini benar 142/142**`.

G.10 fix-map (severity classes) — `notes/PLAYBOOK.local.md:283-345`: four classes, quote: `**secara teknis semua bisa**, tapi hanya sebagian yang **seharusnya**`; **Kelas A — DEFECT** rows carry `P1/P2/P3` + `file:line` (e.g. `308 | P1 | tulis metadata composer … tools/vendor-lite.mjs`); **Kelas B** = `dokumentasikan, jangan ubah inti runtime`; **Kelas C — BY DESIGN (JANGAN di-fix)`**.
G.8 self-assessment of the repo's own process — `:233-274`: `sebaran severity **P1≈10 · P2≈72 · P3≈224 · INFO≈93**`; `Repo **sudah** punya instrumen mekanis yang lebih murah & lebih kuat …`.
G.12/G.13 vendor-lite sweep — `:366-408`.

---

## 5. Freshness

MTimes are from a directory listing on 2026-11-06; "claims" = date inside the file.

| Source | mtime | Claimed date / note |
|---|---|---|
| `README.md` | 4h ago | generated block; no internal date |
| `MAP.md` | 1d ago | `Status: v1.1` (`MAP.md:4`); evidence log runs to 2026-11-02 (`MAP.md:343`) |
| `COMPILED.md` | 1d ago | updates to 2026-11-02 (`COMPILED.md:509`) |
| `docs/READINESS.md` | 1w ago | no date; "derived from `MAP.md` §C" (`docs/READINESS.md` footer) |
| `docs/SWEEP-FINDINGS.md` | 1w ago | `Tanggal: 2026-10-24`; header says **superseded** |
| `docs/AUDIT-2026-10-27.md` | 1w ago | `2026-10-27`, tag v0.4.5 |
| `docs/AUDIT-REAL-APPS.md` | 1w ago | undated running log; open findings pending 6 projects |
| `docs/verdict.svg` | 21h ago | brand mark, not dated |
| `notes/PLAYBOOK.local.md` | 1d ago | entries to `2026-11-04` (G.13) |
| `.cache/welcome.compiled.json` | 2w ago | compiled-Blade dump of `C:\…\nearFind\resources\views/welcome.blade.php` |
| `package.json` | 13h ago | `version 0.4.9` (`package.json:3`) |
| `CHANGELOG.md` | 4h ago | "Unreleased" section on top; latest entries 2026-11-xx |
| `compiler/tests/` | 1d ago | 33 entries incl. `corpus/` |
| `shadow/scenarios/` | 2w ago | `fresh-app.mjs`, `lw-constructs-app.mjs` |
| `kernel/tests/` | 1d ago | 44 entries |
| `.github/workflows/` | 6h ago | `app-check.yml`, `app-deploy.yml`, `publish.yml`, `ci.yml` |
| `MAP.md:429` "Current state" line | — | `npm test 890/890` — matches no other artifact's date |

---

## 6. Contradictions / stale numbers

| # | Contradiction | Evidence | Verdict |
|---|---|---|---|
| C1 | **Construct counts disagree**: `118 constructs: 47 compile, 64 fail loud, 7 documented` (`README.md:36`, `COMPILED.md:749`) vs `constructs 113 (43 compile, 63 fail loud, 7 build-level)` (`docs/AUDIT-2026-10-27.md:16`) **and** `(113 … )` in `docs/AUDIT-2026-10-27.md` F9 note `README angka basi (768→800, kernel 502→526, test:all fiktif)`. | comp. | **AUDIT-2026-10-27 is STALE** — it predates the README/COMPILED regeneration; publish 118/47/64/7. |
| C2 | **Test counts disagree three ways**: `800/800` (`docs/AUDIT-2026-10-27.md:15`), `765/765` (`docs/AUDIT-REAL-APPS.md:30`), `890/890` (`MAP.md:429`), `1080 tests / 1037 pass / 43 skip` (`notes/PLAYBOOK.local.md:187`), `1026 tests` (`MAP.md:354`), `629 tests` coverage run (`notes/PLAYBOOK.local.md:255`). | comp. | No single live count; the README deliberately omits a test total (only generated block allowed — `tools/docs-counts.mjs:74-84`). **Quote none of these as current**; only `README.md:36-39` is regenerated-and-gated. |
| C3 | **Docs-page tally disagrees**: `15 ✅ · 59 🟡 · 5 🔴 · 26 ⛔` (`MAP.md:551`) vs `15 ✅ (it fits), 46 🟡, 26 ⛔, 13 planned (🟡 ph2/ph3) and 5 🔴` (`COMPILED.md:488-489`). | comp. | MAP separates **59 🟡 incl. planned**; COMPILED splits **46 🟡 + 13 planned**. Same 105 pages, two podiums. `tools/docs-check.mjs:31` only enforces the *row count* (105), not the bucket split → **no gate catches this**. Related: `MAP.md:551` says it was reclassified `11 ✅→🟡 subset/overclaim + 1 ✅→⛔ not ported`. |
| C4 | **Facade compile/fail split**: `(6 compile, 41 fail loud)` (`COMPILED.md:749`) vs `5 compile, 42 fail loud` (`MAP.md:351`, dated 2026-10-21). | comp. | COMPILED.md is the generated current one. |
| C5 | **"p95 ≤ 5 ms" stuck to D1** — `README.md:55` + `package.json:4` vs `cpu p50 5 / p95 41` platform measurement (`COMPILED.md:49`, `MAP.md:46`). OPEN ledger item S9 (`notes/PLAYBOOK.local.md:152`) says the 5 ms is a wall-clock Node number from `budget.test.mjs` that **excludes D1/KV**. | comp. + ledger | **STALE/inaccurate claim — publish the correction or the S9 wording.** |
| C6 | **README "Compiles today" Eloquent row omits `firstOrCreate`** listed in `MAP.md`/`docs/READINESS.md`. | `README.md:493` vs `MAP.md:493` | Minor wording drift, not a number. |
| C7 | **GitHub topic count**: `13 topics` (`docs/AUDIT-2026-10-27.md:24`) vs `16 topics` (`CHANGELOG.md:9`). | comp. | Dated drift; not a support number. |
| C8 | **"Composer none"** (README requirements, `README.md:116`) vs `composer install (~379 s cold)` still the measured baseline in README's replacement table (`README.md:362`) and `docs/SWEEP-FINDINGS.md` A1. | comp. | Allowed (`composer is kept only where PHPUnit (require-dev) runs`, `CHANGELOG.md`) but a reader will trip on the two side by side. |
| C9 | **Shadow coverage ambiguity**: `54/56 byte-identical … 0 unexplained` (`COMPILED.md:509`) vs `17/19 … fresh app 9/10` (`MAP.md:428`) vs the ledger's S13 caution that shadow "%" is **scenario-step** coverage, not code coverage (`notes/PLAYBOOK.local.md:156`, `shadow/run.mjs:730`). | comp. + ledger | Three different denominators; S13 warns not to read them as code-test evidence. |
| C10 | **Line coverage vs "100%" claim**: repo self-declares 83.35% line coverage (`notes/PLAYBOOK.local.md:256`) while `MAP.md:143`/`COMPILED.md:487-490` speak of a "100%" **coverage guarantee** that only means "every page has a verdict + every route handled". | comp. + ledger (G.4 koreksi) | G.4 (`:174`) already corrected a "100% coverage" claim as BOLONG; do not re-publish "100%" unqualified. |
| C11 | **`docs/SWEEP-FINDINGS.md` self-declares superseded** (header `READ FIRST — superseded`, "Treat the table in `PRIORITIZED BACKLOG` below as historical, not current") while its P0/P1 table still reads "open". | file header | **Do not cite its backlog as current.** |
| C12 | **`EXPECTED = 105` hard-coded in two places** (`tools/docs-check.mjs:31`, README block `README.md:39` via `tools/docs-counts.mjs:53-57`) — S6 (`notes/PLAYBOOK.local.md:149`) flags it as against the repo's own "never hand-type" rule (`README.md:45`, `docs/PROCESS.md:160-164`). | comp. | Not a numeric contradiction; a known duplication. |
| C13 | `docs/AUDIT-REAL-APPS.md` closes with `Open findings from the multi-project sweep — pending — six projects in flight` **including the same projects** whose failures `docs/SWEEP-FINDINGS.md` (24 Oct) already resolved. | `docs/AUDIT-REAL-APPS.md:133-135` vs `docs/SWEEP-FINDINGS.md` update | Stale pending list. |
| C14 | `notes/PLAYBOOK.local.md:124` says Phase B remainder `≈29.900 baris`; `:363` says `tools/*.mjs (44 berkas lagi, ~10376 baris)`. | comp. | Two different remainder figures in one file; both "not done". |

---

## 7. Answered / not found

**Present and citable:** construct matrix (118, generated), facades (47/47), Blade corpus (55/55), docs pages (105/105), CPU measurements (`gate:cpu`), bcrypt timings, build-cache timing, 5-boot count, D1/Free-plan limits table (`COMPILED.md:61-71`), per-area verdicts in four surfaces, full G.0–G.13 suggestion ledger with statuses, four dated audits.

**Asked for but NOT found (do not invent):**
1. A **numeric percentage of "Laravel features that compile"**. The repo only offers bucket *counts* (47/64/7 constructs; 15/59/5/26 pages) — never a single "% of Laravel supported".
2. A **live, single canonical pass-rate** for the test suite. Six different totals exist (C2); no generated/gated number.
3. **Per-route or per-module line-coverage percentages** — only one kernel-wide figure (83.35 % line, 2026-11-02, `notes/PLAYBOOK.local.md:256`) and it is explicitly **not wired to CI** (S12).
4. **Bundle size** of the shipped worker/`dist` ESM — the only size numbers are the npm tarball `~2.4 MB` (`docs/AUDIT-2026-10-27.md:28`) and vendor cache sizes (`docs/SWEEP-FINDINGS.md` F2). No `dist/` byte size found.
5. A **per-area severity ranking of gaps** (P1/P2/P3) at the *feature* level — severities exist only in the audit/ledger for *code findings*, not for Eloquent-vs-Broadcasting gaps.
6. **`docs/AUDIT-2026-10-27.md` F9's original README numbers** (`768→800`, `kernel 502→526`, `test:all fiktif`) — the old values appear only as a diff note; the old README itself is not in the tree.
7. Any **machine-readable export** (JSON) of the support matrix. `.cache/welcome.compiled.json` is only a compiled-Blade dump of one view (`welcome.blade.php`), not a coverage artifact.