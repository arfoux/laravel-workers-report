// @ts-check
import { defineConfig } from 'astro/config';

// The report is fully static: every number is extracted at build time, so no
// server runtime and no adapter is needed. Cloudflare Workers serves the output
// as Static Assets (zero invocations, see wrangler.jsonc).
export default defineConfig({
  output: 'static',
  build: { format: 'directory' },
  devToolbar: { enabled: false },
});
