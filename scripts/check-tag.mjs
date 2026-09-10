// Copyright 2026 PeopleWare N.V.
// SPDX-License-Identifier: Apache-2.0
import { readFileSync } from "node:fs";
const { version } = JSON.parse(readFileSync("package.json", "utf8"));
if (process.env.RELEASE_TAG !== "v" + version) {
  console.error(
    "\x1b[31m" + `❌ Error: RELEASE_TAG must exactly match v${version}.` + "\x1b[0m",
  );
  process.exit(1);
}

console.log(
  "\x1b[32m" + `✅ Success: RELEASE_TAG exactly matches v${version}.` + "\x1b[0m",
);

await import("./check-changelog.mjs");
