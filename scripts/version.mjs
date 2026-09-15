// Copyright 2026 PeopleWare N.V.
// SPDX-License-Identifier: Apache-2.0
import { spawnSync } from "node:child_process";
import { readFileSync, writeFileSync } from "node:fs";

const { version } = JSON.parse(readFileSync("package.json", "utf8"));
const changelogPath = "CHANGELOG.md";
let changelog = readFileSync(changelogPath, "utf8");

const unreleasedHeading = /^##[ \t]+Unreleased(?=[ \t]*(?:\r?$))/gm;
const unreleasedHeadings = [...changelog.matchAll(unreleasedHeading)];
const escapedVersion = version.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const versionHeading = new RegExp(
  `^##[ \\t]+${escapedVersion}(?:[ \\t]|\\r?$)`,
  "m",
);

if (unreleasedHeadings.length > 1) {
  console.error(
    "\x1b[31m" +
      "❌ Error: CHANGELOG.md contains multiple ## Unreleased sections." +
      "\x1b[0m",
  );
  process.exit(1);
}

if (unreleasedHeadings.length === 1 && versionHeading.test(changelog)) {
  console.error(
    "\x1b[31m" +
      `❌ Error: CHANGELOG.md already contains a ## ${version} section; cannot promote ## Unreleased.` +
      "\x1b[0m",
  );
  process.exit(1);
}

if (unreleasedHeadings.length === 1) {
  changelog = changelog.replace(unreleasedHeading, `## ${version}`);
  writeFileSync(changelogPath, changelog);
  const stageResult = spawnSync("git", ["add", "--", changelogPath], {
    encoding: "utf8",
  });
  if (stageResult.error || stageResult.status !== 0) {
    if (stageResult.stdout) process.stdout.write(stageResult.stdout);
    if (stageResult.stderr) process.stderr.write(stageResult.stderr);
    if (stageResult.error) console.error(stageResult.error.message);
    console.error(
      "\x1b[31m" +
        "❌ Error: could not stage the promoted CHANGELOG.md." +
        "\x1b[0m",
    );
    process.exit(stageResult.status || 1);
  }
  console.log(
    "\x1b[32m" +
      `✅ Success: promoted ## Unreleased to ## ${version} and staged CHANGELOG.md.` +
      "\x1b[0m",
  );
} else {
  console.log(
    "No ## Unreleased section found; checking the existing version section.",
  );
}

await import("./check-changelog.mjs");
