// Copyright 2026 PeopleWare N.V.
// SPDX-License-Identifier: Apache-2.0
import { expect, test } from "vitest";
import { CreatedInErrorSchema } from "./created-in-error.schema.js";

test("rejects untrimmed creator names", () => {
  expect(
    CreatedInErrorSchema.safeParse({
      structureVersion: 1,
      createdAt: "2022-08-18T14:57:39.732Z",
      createdBy: "system ",
      createdInError: true,
    }).success,
  ).toBe(false);
});
