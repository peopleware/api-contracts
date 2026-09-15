// Copyright 2026 PeopleWare N.V.
// SPDX-License-Identifier: Apache-2.0
import { expect, test } from "vitest";
import { InsertAuditableSchema } from "./insert-auditable.schema.js";

test("accepts nullable and omitted creation-audit properties", () => {
  expect(
    InsertAuditableSchema.safeParse({
      createdBy: null,
      createdAt: null,
    }).success,
  ).toBe(true);
  expect(InsertAuditableSchema.safeParse({}).success).toBe(true);
});

test("rejects malformed creation timestamps", () => {
  expect(
    InsertAuditableSchema.safeParse({ createdAt: "2026-01-23" }).success,
  ).toBe(false);
});

test("rejects untrimmed creator names", () => {
  expect(
    InsertAuditableSchema.safeParse({ createdBy: " system" }).success,
  ).toBe(false);
});
