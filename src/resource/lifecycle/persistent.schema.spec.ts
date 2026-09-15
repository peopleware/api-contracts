// Copyright 2026 PeopleWare N.V.
// SPDX-License-Identifier: Apache-2.0
import { expect, test } from "vitest";
import { PersistentSchema } from "./persistent.schema.js";

test.each([42, 0, -1, null])("accepts a nullable long identity: %s", (id) => {
  expect(PersistentSchema.safeParse({ id }).success).toBe(true);
});

test("accepts an omitted identity", () => {
  expect(PersistentSchema.safeParse({}).success).toBe(true);
});

test.each(["42", 42.5, true, {}])(
  "rejects a non-integer identity: %s",
  (id) => {
    expect(PersistentSchema.safeParse({ id }).success).toBe(false);
  },
);
