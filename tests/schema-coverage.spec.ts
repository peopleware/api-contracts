// Copyright 2026 PeopleWare N.V.
// SPDX-License-Identifier: Apache-2.0
import { expect, test } from "vitest";
import * as banking from "../src/identity/banking/index.js";
import * as belgian from "../src/identity/be/index.js";
import * as generic from "../src/identity/generic/index.js";
import * as person from "../src/identity/person/index.js";
import * as caching from "../src/http/caching/index.js";
import * as headers from "../src/http/headers/index.js";
import * as parameters from "../src/http/parameters/index.js";
import * as health from "../src/resource/health/index.js";
import * as lifecycle from "../src/resource/lifecycle/index.js";
import * as relations from "../src/resource/relations/index.js";
import * as search from "../src/resource/search/index.js";
import * as versioning from "../src/resource/versioning/index.js";
import * as location from "../src/value/location/index.js";
import * as money from "../src/value/money/index.js";
import * as number from "../src/value/number/index.js";
import * as string from "../src/value/string/index.js";
import * as time from "../src/value/time/index.js";

// Import every public category barrel so adding a schema to a barrel also makes
// it part of this repository-wide example validation test.
const modules = [
  banking,
  belgian,
  generic,
  person,
  caching,
  headers,
  parameters,
  health,
  lifecycle,
  relations,
  search,
  versioning,
  location,
  money,
  number,
  string,
  time,
] as const;

// Barrels export both schemas and TypeScript-only symbols. Keep only runtime
// schema values by checking for the Zod methods used below.
const schemas = modules.flatMap((module) =>
  Object.values(module).filter(
    (
      value,
    ): value is {
      meta: () => { examples?: unknown[] } | undefined;
      parse: (value: unknown) => unknown;
    } =>
      typeof value === "object" &&
      value !== null &&
      "parse" in value &&
      "meta" in value,
  ),
);

// Every schema example is a contract fixture: it must remain parseable without
// transformation. This catches stale or contradictory examples alongside the
// schema definitions themselves.
test.each(schemas)(
  "accepts every example for the exported %s schema",
  (schema) => {
    const examples = schema.meta()?.examples ?? [];
    expect(examples.length).toBeGreaterThan(0);
    for (const example of examples)
      expect(schema.parse(example)).toStrictEqual(example);
  },
);
