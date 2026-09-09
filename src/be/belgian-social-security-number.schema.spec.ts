// Copyright 2026 PeopleWare N.V.
// SPDX-License-Identifier: Apache-2.0
import { expect, test } from "vitest";
import fc from "fast-check";
import { BelgianSocialSecurityNumberSchema as schema } from "./belgian-social-security-number.schema.js";
test("accepts the canonical example", () =>
  expect(schema.parse("00000000097")).toBe("00000000097"));
test.each([
  "",
  " ",
  "00000000097 ",
  "00000000097\n",
  "X00000000097",
  "0000000097",
  "000000000970",
  "0000.0000097",
  null,
  123,
])("rejects malformed %j", (value) =>
  expect(schema.safeParse(value).success).toBe(false),
);
test("accepts generated checksums and rejects single digit mutations", () => {
  fc.assert(
    fc.property(
      fc.integer({ min: 0, max: 999999999 }),
      fc.boolean(),
      (seed, post2000) => {
        const body = String(seed).padStart(9, "0");
        const check = String(
          97n - (BigInt((post2000 ? "2" : "") + body) % 97n),
        ).padStart(2, "0");
        const value = body + check;
        expect(schema.parse(value)).toBe(value);
        for (let index = 0; index < value.length; index++) {
          const changed =
            value.slice(0, index) +
            String((Number(value[index]) + 1) % 10) +
            value.slice(index + 1);
          // An altered NISS can legitimately match the other century checksum.
          const validOtherCentury = [
            BigInt(changed.slice(0, 9)),
            BigInt("2" + changed.slice(0, 9)),
          ].some((body) => 97n - (body % 97n) === BigInt(changed.slice(9)));
          expect(schema.safeParse(changed).success).toBe(validOtherCentury);
        }
      },
    ),
  );
});
