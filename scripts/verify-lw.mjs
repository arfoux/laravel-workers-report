// Re-runs the extractor and fails when the committed report no longer matches
// the audited repository, or when one of the extractor's cross-checks is false.
//
// Usage: node scripts/verify-lw.mjs [--repo <path>]

import { execFileSync } from 'node:child_process';
import { readFileSync, rmSync } from 'node:fs';
import { resolve } from 'node:path';

const tmp = resolve('.cache/report.verify.json');
const extra = process.argv.slice(2);
execFileSync(process.execPath, ['scripts/extract-lw.mjs', '--out', tmp, ...extra], { stdio: 'inherit' });

const strip = (file) => {
  const value = JSON.parse(readFileSync(file, 'utf8'));
  delete value.generatedAt;
  return JSON.stringify(value, null, 1);
};

const committed = strip('src/data/report.json');
const fresh = strip(tmp);
rmSync(tmp, { force: true, recursive: false });

if (committed !== fresh) {
  console.error('FAIL  src/data/report.json is stale: rerun npm run extract');
  process.exit(1);
}
console.log('PASS  src/data/report.json matches a fresh extraction');
