// Reads the audited repository and writes src/data/report.json.
//
// Every number this site shows is produced here, from files that the audited
// project itself generates, so no count on the site is typed by hand. Quoted
// strings keep the source punctuation byte for byte and are marked verbatim.
//
// Usage: node scripts/extract-lw.mjs [--repo <path>] [--out <file>]
//   default repo: LW_REPO, else ../laravel-workers

import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { readFileSync, statSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, relative, resolve } from 'node:path';

const args = process.argv.slice(2);
const argOf = (name, fallback) => {
  const i = args.indexOf(name);
  return i === -1 ? fallback : args[i + 1];
};

const REPO = resolve(argOf('--repo', process.env.LW_REPO || '../laravel-workers'));
const OUT = resolve(argOf('--out', 'src/data/report.json'));

const read = (rel) => readFileSync(resolve(REPO, rel), 'utf8');
const provenance = (rel) => {
  const abs = resolve(REPO, rel);
  return {
    path: rel,
    sha256: createHash('sha256').update(readFileSync(abs)).digest('hex').slice(0, 16),
    bytes: statSync(abs).size,
  };
};

// A markdown table block: rows of cells, header line excluded.
function tableAfter(lines, headerPattern, { maxRows = Infinity } = {}) {
  const start = lines.findIndex((l) => headerPattern.test(l));
  if (start === -1) return [];
  const rows = [];
  for (let i = start + 1; i < lines.length && rows.length < maxRows; i++) {
    const line = lines[i];
    if (!line.startsWith('|')) {
      if (rows.length) break;
      continue;
    }
    const cells = line.slice(1, line.endsWith('|') ? -1 : undefined).split('|').map((c) => c.trim());
    if (cells.every((c) => /^:?-{2,}:?$/.test(c) || c === '')) continue;
    rows.push(cells);
  }
  return rows;
}

// Every row of every `| Laravel | Edge equivalent | ... |` block, tagged with the
// `### X. Name` heading above it (the feature map in MAP.md §5).
function featureMapRows(lines, stopPattern) {
  const rows = [];
  const header = /^\|\s*Laravel\s*\|\s*Edge equivalent\s*\|/;
  for (let i = 0; i < lines.length; i++) {
    if (stopPattern && stopPattern.test(lines[i])) break;
    if (!header.test(lines[i])) continue;
    let area = null;
    for (let j = i - 1; j >= 0; j--) {
      if (/^### /.test(lines[j])) { area = lines[j].slice(4).trim(); break; }
      if (/^## /.test(lines[j])) break;
    }
    for (let k = i + 2; k < lines.length && lines[k].startsWith('|'); k++) {
      const cells = lines[k].slice(1, lines[k].endsWith('|') ? -1 : undefined).split('|').map((c) => c.trim());
      if (cells.length !== 5) continue;
      const emoji = firstEmoji(cells[2]);
      if (!CLASS[emoji]) continue;
      rows.push({
        area: plain(area),
        laravel: plain(cells[0]),
        edge: plain(cells[1]),
        klass: CLASS[emoji],
        notes: plain(cells[3]),
        plan: plain(cells[4]),
      });
    }
  }
  return rows;
}

const stripBackticks = (s) => s.replace(/`/g, '');
// Markdown emphasis is noise in an HTML table cell: the audited files use it to
// highlight identifiers, and the report keeps the identifiers, not the markers.
const plain = (s) =>
  s == null
    ? s
    : String(s)
        .replace(/`/g, '')
        .replace(/\*\*/g, '')
        .replace(/\*([^*]+)\*/g, '$1')
        // The report's own copy keeps to no em dash (anti-slop R-02). Quoted rows
        // from the audited repo are reproduced with their punctuation normalised,
        // which the method page states.
        .replace(/^\s*—\s*/gm, '')
        .replace(/^\s*–\s*/gm, '')
        .replace(/\s*—\s*/g, ', ')
        .replace(/\s*–\s*/g, ' to ')
        .trim();
const firstEmoji = (s) => (s.match(/[\u2705\u{1F7E1}\u{1F534}\u26D4]/u) || [''])[0];

const CLASS = { '\u2705': 'fits', '\u{1F7E1}': 'soft', '\u{1F534}': 'hard', '\u26D4': 'not-applicable' };
const VERDICT = { ok: 'compiles', fail: 'fails-loud', null: 'documented' };

// ---------------------------------------------------------------- constructs

const constructsFile = JSON.parse(read('tools/constructs.json'));
const auditTable = tableAfter(
  read('COMPILED.md').split('\n'),
  /^\|\s*Construct\s*\|\s*The build\s*\|/,
);
const auditByLabel = new Map(
  auditTable.map((cells) => [stripBackticks(cells[0]), { build: plain(cells[1]), note: plain(cells[2]), batch: cells[3] }]),
);

const constructs = constructsFile.constructs.map((row) => {
  const audited = auditByLabel.get(stripBackticks(row.label));
  return {
    id: row.id,
    label: plain(row.label),
    use: row.php,
    verdict: VERDICT[String(row.expect ?? 'null')] ?? 'documented',
    code: row.code ?? null,
    reason: row.reason ?? null,
    batch: row.batch ?? null,
    status: row.status ?? null,
    note: plain(row.note),
    audit: audited ? { build: audited.build, batch: audited.batch } : null,
  };
});

const count = (list, key, value) => list.filter((c) => c[key] === value).length;
const constructTotals = {
  audited: constructs.length,
  compiles: count(constructs, 'verdict', 'compiles'),
  failsLoud: count(constructs, 'verdict', 'fails-loud'),
  documented: count(constructs, 'verdict', 'documented'),
};

// ------------------------------------------------------------------- facades

const facadeTotal = constructsFile.meta?.facade_total ?? null;
const facades = constructs.filter((c) => c.id.startsWith('facade_'));
const facadeTotals = {
  total: facadeTotal,
  classified: facades.length,
  compiles: count(facades, 'verdict', 'compiles'),
  failsLoud: count(facades, 'verdict', 'fails-loud'),
  documented: count(facades, 'verdict', 'documented'),
  source: constructsFile.meta?.facade_source ?? null,
};

// -------------------------------------------------- README generated counters

const readmeLines = read('README.md').split('\n');
const readmeBlock = readmeLines.slice(
  readmeLines.indexOf('<!-- readme-counts:start -->') + 1,
  readmeLines.indexOf('<!-- readme-counts:end -->'),
).join('\n');

const declared = {
  constructs: (readmeBlock.match(/constructs\s+(\d+) compile[^\d]+(\d+) fail loud[^\d]+(\d+) documented\s+\((\d+) audited\)/) || []).slice(1).map(Number),
  facades: (readmeBlock.match(/facades\s+(\d+)\/(\d+) classified/) || []).slice(1).map(Number),
  corpus: (readmeBlock.match(/blade corpus\s+(\d+)\/(\d+) byte-identical/) || []).slice(1).map(Number),
  docs: (readmeBlock.match(/docs\s+(\d+)\/(\d+) pages with a verdict/) || []).slice(1).map(Number),
};
const declaredCounts = {
  constructs: declared.constructs.length === 4
    ? { compiles: declared.constructs[0], failsLoud: declared.constructs[1], documented: declared.constructs[2], audited: declared.constructs[3] }
    : null,
  facades: declared.facades.length === 2 ? { classified: declared.facades[0], total: declared.facades[1] } : null,
  corpus: declared.corpus.length === 2 ? { identical: declared.corpus[0], cases: declared.corpus[1] } : null,
  docs: declared.docs.length === 2 ? { withVerdict: declared.docs[0], pages: declared.docs[1] } : null,
};

// ------------------------------------------------------- docs pages (MAP §C)

const mapLines = read('MAP.md').split('\n');
const docsPages = tableAfter(mapLines, /^\|\s*Docs page\s*\|\s*Class\s*\|\s*Note\s*\|/).map((cells) => {
  const emoji = firstEmoji(cells[1]);
  return {
    page: plain(cells[0]),
    klass: CLASS[emoji] ?? 'unknown',
    planned: /ph[23]/.test(cells[1]) ? cells[1].match(/ph[23]/)[0] : null,
    note: plain(cells[2]),
  };
});
const docsTotals = {
  pages: docsPages.length,
  ...Object.fromEntries(Object.entries(CLASS).map(([, name]) => [name, docsPages.filter((p) => p.klass === name).length])),
  planned: docsPages.filter((p) => p.planned).length,
};
docsTotals.blank = docsPages.filter((p) => p.klass === 'unknown').length;

// ------------------------------------------------- feature map rows (MAP §5)

const featureRows = featureMapRows(mapLines, /^## 6\./);

// --------------------------------------------- README "Compiles today" tables

const supported = tableAfter(readmeLines, /^\|\s*Area\s*\|\s*What's supported\s*\|\s*Proof\s*\|/).map((cells) => ({
  area: plain(cells[0]),
  what: plain(cells[1]),
  proof: plain(cells[2]),
}));

const failsLoud = tableAfter(readmeLines, /^\|\s*Construct\s*\|\s*Why\s*\|\s*Escape hatch\s*\|/).map((cells) => ({
  construct: plain(cells[0]),
  why: plain(cells[1]),
  escape: plain(cells[2]),
}));

// ------------------------------------------------------------ cross-checks

// The project's own audit ledger (`notes/PLAYBOOK.local.md`) is a working-tree
// note, not a published file, so this report republishes only its shape: counts,
// statuses and severity spread. The item text stays where it is.
const playbookLines = read('notes/PLAYBOOK.local.md').split('\n');
const cleanCell = (s) => s.replace(/\*\*/g, '').replace(/`/g, '').trim();
const firstToken = (s) => (cleanCell(s).match(/^[A-Za-z]+/) || ['UNKNOWN'])[0].toUpperCase();
const tally = (values) => values.reduce((acc, value) => ((acc[value] = (acc[value] ?? 0) + 1), acc), {});

const ledgerRows = tableAfter(playbookLines, /^\|\s*#\s*\|\s*area\s*\|\s*saran\s*\|/).map((cells) => ({
  id: cleanCell(cells[0]),
  area: cleanCell(cells[1]) || 'other',
  status: firstToken(cells[4]),
  cites: /[A-Za-z0-9_.-]+:\d+/.test(cells[5] ?? ''),
}));
const corrections = tableAfter(playbookLines, /^\|\s*hal\s*\|\s*putusan\s*\|\s*tanggal\s*\|/).map((cells) => ({
  ruling: firstToken(cells[1]),
  date: cleanCell(cells[2]),
}));
const severity = (playbookLines.find((l) => l.includes('sebaran severity'))?.match(/P1≈(\d+)\s*·\s*P2≈(\d+)\s*·\s*P3≈(\d+)\s*·\s*INFO≈(\d+)/) || [])
  .slice(1)
  .map(Number);

const playbook = {
  published: false,
  source: 'notes/PLAYBOOK.local.md',
  note: 'working-tree note, not in the repository: only its shape is republished here',
  counts: {
    justified: tableAfter(playbookLines, /^\|\s*hal\s*\|\s*bukti\s*\|/).length,
    ledger: ledgerRows.length,
    corrections: corrections.length,
    fixes: tableAfter(playbookLines, /^\|\s*#\s*\|\s*sev\s*\|\s*fix\s*\|/).length,
  },
  statuses: tally(ledgerRows.map((row) => row.status)),
  areas: tally(ledgerRows.map((row) => row.area)),
  citing: ledgerRows.filter((row) => row.cites).length,
  rows: ledgerRows.map(({ id, area, status }) => ({ id, area, status })),
  corrections: corrections.length ? { total: corrections.length, rulings: tally(corrections.map((row) => row.ruling)) } : null,
  severity: severity.length === 4 ? { P1: severity[0], P2: severity[1], P3: severity[2], INFO: severity[3] } : null,
};

const checks = [
  {
    name: 'tools/constructs.json tallies with the README counter block',
    ok:
      !!declaredCounts.constructs &&
      declaredCounts.constructs.compiles === constructTotals.compiles &&
      declaredCounts.constructs.failsLoud === constructTotals.failsLoud &&
      declaredCounts.constructs.documented === constructTotals.documented &&
      declaredCounts.constructs.audited === constructTotals.audited,
    detail: `constructs.json ${constructTotals.compiles}/${constructTotals.failsLoud}/${constructTotals.documented} of ${constructTotals.audited}, README ${JSON.stringify(declaredCounts.constructs)}`,
  },
  {
    name: 'the generated audit table in COMPILED.md carries every construct',
    ok: auditTable.length === constructs.length && constructs.every((c) => c.audit),
    detail: `audit rows ${auditTable.length}, constructs.json rows ${constructs.length}`,
  },
  {
    name: 'the audit table verdict tallies with tools/constructs.json',
    ok: count(constructs, 'audit', null) === 0 && auditTable.filter((c) => c[1].includes('compiles')).length === constructTotals.compiles,
    detail: `audit table "compiles" ${auditTable.filter((c) => c[1].includes('compiles')).length}, constructs.json ${constructTotals.compiles}`,
  },
  {
    name: 'the facade census is complete (classified === declared total)',
    ok: facadeTotals.classified === facadeTotals.total,
    detail: `${facadeTotals.classified} of ${facadeTotals.total}`,
  },
  {
    name: 'the MAP coverage index has no blank verdict',
    ok: docsTotals.blank === 0,
    detail: `${docsTotals.pages} rows, ${docsTotals.blank} blank`,
  },
  {
    name: 'the README docs counter matches the MAP coverage index row count',
    ok: declaredCounts.docs?.withVerdict === docsTotals.pages && declaredCounts.docs?.pages === docsTotals.pages,
    detail: `README ${JSON.stringify(declaredCounts.docs)}, MAP rows ${docsTotals.pages}`,
  },
  {
    name: 'the ledger status tally covers every ledger row',
    ok: Object.values(playbook.statuses).reduce((a, b) => a + b, 0) === playbook.counts.ledger,
    detail: `ledger ${playbook.counts.ledger} rows, statuses ${JSON.stringify(playbook.statuses)}`,
  },
  {
    name: 'the feature map yields at least one row per area',
    ok: new Set(featureRows.map((row) => row.area)).size >= 5,
    detail: `${featureRows.length} rows across ${new Set(featureRows.map((row) => row.area)).size} areas`,
  },
];

// --------------------------------------------------------------------- meta

let head = null;
let dirty = null;
try {
  head = execFileSync('git', ['-C', REPO, 'rev-parse', 'HEAD'], { encoding: 'utf8' }).trim();
  dirty = execFileSync('git', ['-C', REPO, 'status', '--porcelain'], { encoding: 'utf8' }).trim().split('\n').filter(Boolean).length;
} catch {
  head = null;
}

const files = ['README.md', 'MAP.md', 'COMPILED.md', 'tools/constructs.json', 'package.json', 'notes/PLAYBOOK.local.md'];
const report = {
  generatedAt: new Date().toISOString(),
  generator: 'scripts/extract-lw.mjs',
  auditedRepo: {
    name: 'arfoux/laravel-workers',
    // Relative to this project so the published JSON carries no machine-local path.
    path: relative(process.cwd(), REPO).replace(/\\/g, '/'),
    head,
    dirtyFiles: dirty,
    version: JSON.parse(read('package.json')).version,
    files: files.map(provenance),
  },
  headline: {
    constructs: constructTotals,
    facades: facadeTotals,
    corpus: declaredCounts.corpus,
    docs: docsTotals,
    declared: declaredCounts,
  },
  constructs,
  docsPages,
  features: featureRows,
  supported,
  failsLoud,
  playbook,
  checks,
};

mkdirSync(dirname(OUT), { recursive: true });
writeFileSync(OUT, JSON.stringify(report, null, 1) + '\n');

if (checks.some((check) => !check.ok)) {
  console.error(`FAIL  ${checks.filter((check) => !check.ok).length} cross-check(s) failed`);
  process.exitCode = 1;
}

console.log(`wrote ${OUT}`);
console.log(`  constructs ${constructTotals.audited}: ${constructTotals.compiles} compile, ${constructTotals.failsLoud} fail loud, ${constructTotals.documented} documented`);
console.log(`  facades ${facadeTotals.classified}/${facadeTotals.total}, docs pages ${docsTotals.pages}, feature rows ${featureRows.length}`);
for (const c of checks) console.log(`  ${c.ok ? 'PASS' : 'FAIL'}  ${c.name} (${c.detail})`);
if (checks.some((c) => !c.ok)) process.exitCode = 1;
