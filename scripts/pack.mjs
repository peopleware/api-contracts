// Copyright 2026 PeopleWare N.V.
// SPDX-License-Identifier: Apache-2.0
import { execFileSync } from "node:child_process";
import { mkdirSync, readFileSync, readdirSync } from "node:fs";
const npm = process.platform === "win32" ? "npm.cmd" : "npm";
mkdirSync("artifacts", { recursive: true });
const result = JSON.parse(
  execFileSync(npm, ["pack", "--json", "--pack-destination", "artifacts"], {
    encoding: "utf8",
    shell: process.platform === "win32",
  }),
)[0];
const { name, version } = JSON.parse(readFileSync("package.json", "utf8"));
if (result.name !== name || result.version !== version)
  throw new Error("Unexpected package identity");
const paths = result.files.map((file) => file.path);
const requiredPaths = [
  "LICENSE",
  "NOTICE",
  "README.md",
  "package.json",
  ...["string", "time", "be"].flatMap((category) =>
    ["js", "cjs", "d.ts", "d.cts"].map(
      (extension) => "dist/" + category + "/index." + extension,
    ),
  ),
  ...readdirSync("dist/schemas")
    .filter((file) => file.endsWith(".yaml"))
    .map((file) => "dist/schemas/" + file),
];
for (const path of paths) {
  if (
    !requiredPaths.includes(path) &&
    !/^dist\/schemas\/[^/]+\.yaml$/.test(path)
  )
    throw new Error("Unexpected archive file: " + path);
}
for (const required of requiredPaths) {
  if (!paths.includes(required))
    throw new Error("Missing archive file: " + required);
}
console.log(JSON.stringify(result, null, 2));
