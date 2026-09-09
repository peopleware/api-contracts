// Copyright 2026 PeopleWare N.V.
// SPDX-License-Identifier: Apache-2.0
import { mkdir, readdir, writeFile } from "node:fs/promises";
import { URL } from "node:url";
import { stringify } from "yaml";
import { z } from "zod";

const dist = new URL("../dist/", import.meta.url);
const output = new URL("schemas/", dist);
const schemas = new Map();

// Discover built category entrypoints so new exports are included automatically.
for (const entry of await readdir(dist, { withFileTypes: true })) {
  if (!entry.isDirectory() || entry.name === "schemas") continue;
  const exports = await import(new URL(`${entry.name}/index.js`, dist).href);
  for (const schema of Object.values(exports)) {
    if (!(schema instanceof z.ZodType)) continue;
    const id = schema.meta()?.id;
    if (!id || !/^[A-Za-z][A-Za-z0-9_-]*$/.test(id)) {
      throw new Error(`Invalid schema component ID in ${entry.name}: ${id}`);
    }
    if (schemas.has(id) && schemas.get(id) !== schema) {
      throw new Error(`Duplicate schema component ID: ${id}`);
    }
    schemas.set(id, schema);
  }
}

await mkdir(output, { recursive: true });
for (const [id, schema] of schemas) {
  await writeFile(
    new URL(`${id}.yaml`, output),
    "# Copyright 2026 PeopleWare N.V.\n# SPDX-License-Identifier: Apache-2.0\n" +
      stringify(z.toJSONSchema(schema, { target: "draft-2020-12" })),
  );
}
