// Copyright 2026 PeopleWare N.V.
// SPDX-License-Identifier: Apache-2.0
import { readdir, writeFile } from "node:fs/promises";
import { URL } from "node:url";
import { stringify } from "yaml";
import { z } from "zod";
import { createDocument } from "zod-openapi";

const dist = new URL("../dist/", import.meta.url);

async function findEntrypoints(directory) {
  const result = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    if (entry.isDirectory() && entry.name !== "schemas") {
      result.push(
        ...(await findEntrypoints(new URL(`${entry.name}/`, directory))),
      );
    } else if (entry.isFile() && entry.name === "index.js") {
      result.push(new URL(entry.name, directory));
    }
  }
  return result;
}

const schemas = new Map();
for (const entrypoint of await findEntrypoints(dist)) {
  const exports = await import(entrypoint.href);
  for (const schema of Object.values(exports)) {
    if (!(schema instanceof z.ZodType)) continue;
    const id = schema.meta()?.id;
    if (!id || !/^[A-Za-z][A-Za-z0-9_-]*$/.test(id)) {
      throw new Error(
        `Invalid schema component ID in ${entrypoint.pathname}: ${id}`,
      );
    }
    if (schemas.has(id) && schemas.get(id) !== schema) {
      throw new Error(`Duplicate schema component ID: ${id}`);
    }
    schemas.set(id, schema);
  }
}

const document = createDocument({
  openapi: "3.1.0",
  info: { title: "Contracts", version: "1.0.0" },
  components: { schemas: Object.fromEntries(schemas) },
  paths: {
    "/example": {
      get: {
        responses: {
          200: {
            description: "Example",
            content: {
              "application/json": {
                schema: z.object({}),
              },
            },
          },
        },
      },
    },
  },
});

await writeFile(
  new URL("../dist/openapi-example.yaml", import.meta.url),
  "# Copyright 2026 PeopleWare N.V.\n# SPDX-License-Identifier: Apache-2.0\n" +
    stringify(document),
);
