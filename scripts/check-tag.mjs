// Copyright 2026 PeopleWare N.V.
// SPDX-License-Identifier: Apache-2.0
import { readFileSync } from "node:fs";
const { version } = JSON.parse(readFileSync("package.json", "utf8"));
if (process.env.RELEASE_TAG !== "v" + version)
  throw new Error("RELEASE_TAG must exactly match v" + version);

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
if (!section)
  throw new Error("CHANGELOG.md must contain a ## " + version + " section");

const description = section
  .split(/\r?\n/)
  .slice(1)
  .filter((line) => !/^\s*#/.test(line))
  .join("\n")
  .trim();
if (!description)
  throw new Error("CHANGELOG.md must describe the changes for " + version);
