// Copyright 2026 PeopleWare N.V.
// SPDX-License-Identifier: Apache-2.0
import { expect, test } from "vitest";
import { AuditableSchema } from "./auditable.schema.js";

test("accepts complete and omitted audit metadata", () => {
  expect(
    AuditableSchema.safeParse({
      createdBy: "system",
      createdAt: "2026-01-23T15:22:39.212Z",
      lastModifiedBy: "admin",
      lastModifiedAt: "2026-02-01T10:11:12.123Z",
    }).success,
  ).toBe(true);
  expect(AuditableSchema.safeParse({}).success).toBe(true);
});

test("rejects malformed modification timestamps", () => {
  expect(
    AuditableSchema.safeParse({ lastModifiedAt: "2026-02-01T10:11:12" })
      .success,
  ).toBe(false);
});

test("rejects untrimmed modifier names", () => {
  expect(AuditableSchema.safeParse({ lastModifiedBy: "admin " }).success).toBe(
    false,
  );
});
