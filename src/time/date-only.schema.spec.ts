// Copyright 2026 PeopleWare N.V.
// SPDX-License-Identifier: Apache-2.0
import { expect, test } from "vitest";
import { DateOnlySchema } from "./date-only.schema.js";
test.each(["2024-02-29", "2000-02-29", "2026-09-08"])("accepts %s", (value) =>
  expect(DateOnlySchema.parse(value)).toBe(value),
);
test.each([
  "",
  "2023-02-29",
  "1900-02-29",
  "2024-04-31",
  "2024-00-01",
  "2024-13-01",
  "2024-01-00",
  "2024-1-01",
  "2024-01-01T00:00:00Z",
  " 2024-01-01",
  "2024-01-01\n",
  null,
])("rejects %j", (value) =>
  expect(DateOnlySchema.safeParse(value).success).toBe(false),
);
