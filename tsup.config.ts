// Copyright 2026 PeopleWare N.V.
// SPDX-License-Identifier: Apache-2.0
import { defineConfig } from "tsup";
export default defineConfig({
  entry: {
    "string/index": "src/string/index.ts",
    "time/index": "src/time/index.ts",
    "be/index": "src/be/index.ts",
  },
  format: ["esm", "cjs"],
  target: "es2022",
  platform: "browser",
  dts: {
    // tsup injects baseUrl during declaration generation; TypeScript 6 deprecates it.
    compilerOptions: { ignoreDeprecations: "6.0" },
  },
  clean: true,
  sourcemap: false,
  splitting: false,
  external: ["zod"],
  banner: {
    js: "/*! Copyright 2026 PeopleWare N.V.\n * SPDX-License-Identifier: Apache-2.0 */",
  },
});
