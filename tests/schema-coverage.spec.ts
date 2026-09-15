// Copyright 2026 PeopleWare N.V.
// SPDX-License-Identifier: Apache-2.0
import { expect, test } from "vitest";
import { schemas } from "./all-schemas.js";

const schemaTests = schemas.map((schema) => {
  const name = schema.meta()?.title ?? schema.meta()?.id;
  return [name, schema] as const;
});

// Every schema example is a contract fixture: it must remain parseable without
// transformation. This catches stale or contradictory examples alongside the
// schema definitions themselves.
test.each(schemaTests)(
  "accepts every example for the exported %s schema",
  (_name, schema) => {
    const examples = schema.meta()?.examples ?? [];
    expect(examples.length).toBeGreaterThan(0);
    for (const example of examples)
      expect(schema.parse(example)).toStrictEqual(example);
  },
);
