// Copyright 2026 PeopleWare N.V.
// SPDX-License-Identifier: Apache-2.0
import { expect, test } from "vitest";
import fc from "fast-check";
import { BelgianIbanSchema as schema } from "./belgian-iban.schema.js";
test("accepts the canonical example", () =>
  expect(schema.parse("BE68539007547034")).toBe("BE68539007547034"));
test.each([
  "",
  " ",
  "BE68539007547034 ",
  "BE68539007547034\n",
  "be68539007547034",
  "E68539007547034",
  "BE685390075470340",
  "BE68.539007547034",
  "FR68539007547034",
  null,
  123,
])("rejects malformed %j", (value) =>
  expect(schema.safeParse(value).success).toBe(false),
);
test("accepts generated checksums and rejects single digit mutations", () => {
  fc.assert(
    fc.property(fc.integer({ min: 0, max: 999999999999 }), (seed) => {
      const body = String(seed).padStart(12, "0");
      const check = String(98n - (BigInt(body + "111400") % 97n)).padStart(
        2,
        "0",
      );
      const value = "BE" + check + body;
      expect(schema.parse(value)).toBe(value);
      for (let index = 4; index < value.length; index++) {
        const changed =
          value.slice(0, index) +
          String((Number(value[index]) + 1) % 10) +
          value.slice(index + 1);
        expect(schema.safeParse(changed).success).toBe(false);
      }
    }),
  );
});
