// Copyright 2026 PeopleWare N.V.
// SPDX-License-Identifier: Apache-2.0
import { expect, test } from "vitest";
import { z } from "zod";
import { aliasGroups, schemas } from "./all-schemas.js";

const schemaTests = schemas.map((schema) => {
  const name = schema.meta()?.title ?? schema.meta()?.id;
  return [name, schema] as const;
});
test.each(schemaTests)("JSON Schema metadata for %s", (_name, schema) => {
  expect(z.toJSONSchema(schema, { target: "draft-2020-12" })).toMatchSnapshot(
    schema.meta()?.id,
  );
  for (const example of schema.meta()?.examples ?? [])
    expect(schema.safeParse(example).success).toBe(true);
});

const aliasTests = aliasGroups
  .filter(({ exports }) => exports.length > 1)
  .map(({ exports, names }) => [names, exports] as const);
test.each(aliasTests)(
  "Aliases share canonical instance: %s",
  (_names, exports) => {
    const canonical = exports[0]?.[1];
    if (!canonical) throw new Error("Alias group has no canonical schema");
    for (const [, alias] of exports.slice(1)) expect(alias).toBe(canonical);
  },
);
