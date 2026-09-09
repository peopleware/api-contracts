// Copyright 2026 PeopleWare N.V.
// SPDX-License-Identifier: Apache-2.0
import { expect, test } from "vitest";
import fc from "fast-check";
import { BelgianEnterpriseNumberSchema as schema } from "./belgian-enterprise-number.schema.js";
test("accepts the canonical example", () =>
  expect(schema.parse("0123456749")).toBe("0123456749"));
test.each([
  "",
  " ",
  "0123456749 ",
  "0123456749\n",
  "X0123456749",
  "123456749",
  "01234567490",
  "0123.456749",
  "2123456789",
  null,
  123,
])("rejects malformed %j", (value) =>
  expect(schema.safeParse(value).success).toBe(false),
);
test("accepts generated checksums and rejects single digit mutations", () => {
  fc.assert(
    fc.property(fc.integer({ min: 0, max: 19999999 }), (seed) => {
      const body = String(seed).padStart(8, "0");
      const check = String(97n - (BigInt(body) % 97n)).padStart(2, "0");
      const value = body + check;
      expect(schema.parse(value)).toBe(value);
      for (let index = 0; index < value.length; index++) {
        const changed =
          value.slice(0, index) +
          String((Number(value[index]) + 1) % 10) +
          value.slice(index + 1);
        expect(schema.safeParse(changed).success).toBe(false);
      }
    }),
  );
});
