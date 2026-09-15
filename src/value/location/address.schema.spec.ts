// Copyright 2026 PeopleWare N.V.
// SPDX-License-Identifier: Apache-2.0
import { expect, test } from "vitest";
import { AddressSchema } from "./address.schema.js";

const validAddress = {
  street: "Duwijckstraat",
  houseNumber: "17",
  box: null,
  zipCode: "2500",
  city: "Lier",
  country: "BE",
};

test.each(["street", "houseNumber", "box", "zipCode", "city"])(
  "rejects empty or untrimmed %s values",
  (field) => {
    expect(
      AddressSchema.safeParse({ ...validAddress, [field]: " " }).success,
    ).toBe(false);
    expect(
      AddressSchema.safeParse({ ...validAddress, [field]: " value" }).success,
    ).toBe(false);
    expect(
      AddressSchema.safeParse({ ...validAddress, [field]: "value " }).success,
    ).toBe(false);
  },
);

test.each(["street", "houseNumber", "box", "zipCode", "city"])(
  "accepts null %s values",
  (field) => {
    expect(
      AddressSchema.safeParse({ ...validAddress, [field]: null }).success,
    ).toBe(true);
  },
);
