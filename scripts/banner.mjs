// Copyright 2026 PeopleWare N.V.
// SPDX-License-Identifier: Apache-2.0
import { readdir, readFile, writeFile } from "node:fs/promises";
const banner =
  "/*! Copyright 2026 PeopleWare N.V.\n * SPDX-License-Identifier: Apache-2.0 */\n";
for (const file of await readdir("dist", { recursive: true })) {
  if (!/\.(?:js|cjs|ts|cts)$/.test(file)) continue;
  const path = "dist/" + file;
  const text = await readFile(path, "utf8");
  if (!text.startsWith(banner.trim())) await writeFile(path, banner + text);
}
