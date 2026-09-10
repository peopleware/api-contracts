// Copyright 2026 PeopleWare N.V.
// SPDX-License-Identifier: Apache-2.0
import { readFileSync } from "node:fs";
const { version } = JSON.parse(readFileSync("package.json", "utf8"));
if (process.env.RELEASE_TAG !== "v" + version)
  throw new Error("RELEASE_TAG must exactly match v" + version);

await import("./check-changelog.mjs");
