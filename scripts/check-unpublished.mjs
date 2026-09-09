// Copyright 2026 PeopleWare N.V.
// SPDX-License-Identifier: Apache-2.0
import { readFileSync } from "node:fs";
const { name, version } = JSON.parse(readFileSync("package.json", "utf8"));
const response = await fetch(
  "https://registry.npmjs.org/" +
    encodeURIComponent(name) +
    "/" +
    encodeURIComponent(version),
  { signal: AbortSignal.timeout(30000) },
);
if (response.ok)
  throw new Error(name + "@" + version + " already exists in npm");
if (response.status !== 404)
  throw new Error(
    "Cannot verify npm version availability: HTTP " + response.status,
  );
console.log(name + "@" + version + " is available");
