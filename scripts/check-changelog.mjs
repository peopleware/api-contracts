// Copyright 2026 PeopleWare N.V.
// SPDX-License-Identifier: Apache-2.0
import { readFileSync } from "node:fs";
const { version } = JSON.parse(readFileSync("package.json", "utf8"));

/** Check that the changelog contains a section for the current version **/
const changelog = readFileSync("CHANGELOG.md", "utf8").replace(
  /<!--[\s\S]*?-->/g,
  "",
);
const sections = changelog.split(/^##\s+/m).slice(1);
const section = sections.find((section) => {
  const heading = section.split(/\r?\n/, 1)[0];
  return heading === version || heading.startsWith(version + " ");
});
if (!section) {
  console.error(
    '\x1b[31m' + `Error: CHANGELOG.md must contain a ## ${version} section.` + '\x1b[0m',
  );
  process.exit(1);
}

const description = section
  .split(/\r?\n/)
  .slice(1)
  .filter((line) => !/^\s*#/.test(line))
  .join("\n")
  .trim();
if (!description) {
  console.error(
    '\x1b[31m' + `Error: CHANGELOG.md must describe the changes for ${version}.` + '\x1b[0m'
  );
  process.exit(1);
}

console.log('\x1b[32m' + `✅ Success: CHANGELOG.md contains release notes for ${version}.` + '\x1b[0m');
