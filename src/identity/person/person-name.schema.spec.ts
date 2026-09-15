// Copyright 2026 PeopleWare N.V.
// SPDX-License-Identifier: Apache-2.0
import { expect, test } from "vitest";
import { PersonNameSchema } from "./person-name.schema.js";

const validPersonName = {
  firstName: "Ada",
  lastName: "Lovelace",
  fullName: "Ada Lovelace",
};

test("accepts a valid person name", () => {
  expect(PersonNameSchema.parse(validPersonName)).toStrictEqual(
    validPersonName,
  );
});

test("accepts nullable firstName and fullName", () => {
  expect(
    PersonNameSchema.safeParse({
      ...validPersonName,
      firstName: null,
      fullName: null,
    }).success,
  ).toBe(true);
});

test("requires lastName", () => {
  expect(
    PersonNameSchema.safeParse({
      firstName: null,
      fullName: null,
    }).success,
  ).toBe(false);
});
