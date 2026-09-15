// Copyright 2026 PeopleWare N.V.
// SPDX-License-Identifier: Apache-2.0
import { expect, test } from "vitest";
import { AuditablePersistentSchema } from "./auditable-persistent.schema.js";

test("extends AuditableSchema with persistence metadata", () => {
  expect(
    AuditablePersistentSchema.safeParse({
      id: 42,
      createdBy: "system",
      createdAt: "2026-01-23T15:22:39.212Z",
      lastModifiedBy: "admin",
      lastModifiedAt: "2026-02-01T10:11:12.123Z",
    }).success,
  ).toBe(true);
  expect(AuditablePersistentSchema.safeParse({}).success).toBe(true);
});
