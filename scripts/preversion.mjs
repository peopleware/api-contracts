// Copyright 2026 PeopleWare N.V.
// SPDX-License-Identifier: Apache-2.0
import { spawnSync } from "node:child_process";

if (!process.env.npm_execpath) {
  console.error('\x1b[31m' + "Error: Run this script through npm run preversion." + '\x1b[0m');
  process.exit(1);
}

console.log("Running quality checks...");
const result = spawnSync(
  process.execPath,
  [process.env.npm_execpath, "run", "verify:quality"],
  { encoding: "utf8", maxBuffer: 10 * 1024 * 1024 },
);

if (result.error || result.status !== 0) {
  if (result.stdout) process.stdout.write(result.stdout);
  if (result.stderr) process.stderr.write(result.stderr);
  if (result.error) console.error(result.error.message);
  console.error('\x1b[31m' + "❌ Quality checks failed. Version bump stopped." + '\x1b[0m');
  process.exit(result.status || 1);
}

console.log('\x1b[32m' + "✅ Quality checks passed." + '\x1b[0m');
