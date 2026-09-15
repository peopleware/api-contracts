// Copyright 2026 PeopleWare N.V.
// SPDX-License-Identifier: Apache-2.0
import { z } from "zod";
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

const exportedSchemas = modules
  .flatMap((module) => Object.entries(module))
  .filter(
    (entry): entry is [string, z.ZodType] => entry[1] instanceof z.ZodType,
  );

export const schemas = [
  ...new Map(
    exportedSchemas.map(([, schema]) => [schema.meta()?.id, schema] as const),
  ).values(),
];

const aliasesBySchema = new Map<z.ZodType, [string, z.ZodType][]>();
for (const [name, schema] of exportedSchemas) {
  const exports = aliasesBySchema.get(schema) ?? [];
  exports.push([name, schema]);
  aliasesBySchema.set(schema, exports);
}

export const aliasGroups = [...aliasesBySchema].map(([schema, exports]) => ({
  schema,
  exports,
  names: exports.map(([name]) => name).join(", "),
}));
