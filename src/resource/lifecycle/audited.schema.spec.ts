// Copyright 2026 PeopleWare N.V.
// SPDX-License-Identifier: Apache-2.0
import { expect, test } from "vitest";
import { AuditedSchema } from "./audited.schema.js";

test("rejects untrimmed creator names", () => {
  expect(
    AuditedSchema.safeParse({
      createdAt: "2020-01-23T15:22:39.212Z",
      createdBy: " system",
    }).success,
  ).toBe(false);
});
