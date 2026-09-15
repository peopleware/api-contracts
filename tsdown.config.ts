// Copyright 2026 PeopleWare N.V.
// SPDX-License-Identifier: Apache-2.0
import { defineConfig } from "tsdown";
export default defineConfig({
  entry: {
    "*": "src/**/index.ts",
  },
  format: ["esm", "cjs"],
  target: "es2022",
  platform: "browser",
  dts: true,
  clean: true,
  sourcemap: false,
  deps: { neverBundle: ["zod"] },
});
