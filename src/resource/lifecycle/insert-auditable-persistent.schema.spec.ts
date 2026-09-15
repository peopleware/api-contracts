// Copyright 2026 PeopleWare N.V.
// SPDX-License-Identifier: Apache-2.0
import { expect, test } from "vitest";
import { InsertAuditablePersistentSchema } from "./insert-auditable-persistent.schema.js";

test("extends InsertAuditableSchema with persistence metadata", () => {
  expect(
    InsertAuditablePersistentSchema.safeParse({
      id: 42,
      createdBy: "system",
      createdAt: "2026-01-23T15:22:39.212Z",
    }).success,
  ).toBe(true);
  expect(InsertAuditablePersistentSchema.safeParse({}).success).toBe(true);
});
