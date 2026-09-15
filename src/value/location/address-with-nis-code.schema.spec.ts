// Copyright 2026 PeopleWare N.V.
// SPDX-License-Identifier: Apache-2.0
import { expect, test } from "vitest";
import { AddressWithNisCodeSchema } from "./address-with-nis-code.schema.js";

const validAddress = {
  street: "Duwijckstraat",
  houseNumber: "17",
  box: null,
  zipCode: "2500",
  city: "Lier",
  countryNisCode: 150,
};

test.each(["street", "houseNumber", "box", "zipCode", "city"])(
  "rejects empty or untrimmed %s values",
  (field) => {
    expect(
      AddressWithNisCodeSchema.safeParse({ ...validAddress, [field]: " " })
        .success,
    ).toBe(false);
    expect(
      AddressWithNisCodeSchema.safeParse({ ...validAddress, [field]: " value" })
        .success,
    ).toBe(false);
    expect(
      AddressWithNisCodeSchema.safeParse({ ...validAddress, [field]: "value " })
        .success,
    ).toBe(false);
  },
);

test.each(["street", "houseNumber", "box", "zipCode", "city"])(
  "accepts null %s values",
  (field) => {
    expect(
      AddressWithNisCodeSchema.safeParse({ ...validAddress, [field]: null })
        .success,
    ).toBe(true);
  },
);
