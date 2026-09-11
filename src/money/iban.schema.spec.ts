// Copyright 2026 PeopleWare N.V.
// SPDX-License-Identifier: Apache-2.0
import { expect, test } from "vitest";
import fc from "fast-check";
import { z } from "zod";
import { IbanSchema as schema } from "./iban.schema.js";

function withChecksum(country: string, bban: string): string {
  const digits = (bban + country + "00").replace(/[A-Z]/g, (letter) =>
    String(letter.charCodeAt(0) - 55),
  );
  return country + String(98n - (BigInt(digits) % 97n)).padStart(2, "0") + bban;
}

test.each([
  "BE68539007547034",
  "DE89370400440532013000",
  "GB82WEST12345698765432",
  "FR1420041010050500013M02606",
  "NL91ABNA0417164300",
  "NO9386011117947",
  "MT84MALT011000012345MTLCAST001S",
])("accepts canonical %s unchanged", (value) => {
  expect(schema.parse(value)).toBe(value);
});

test.each([
  "",
  " ",
  null,
  123,
  {},
  "be68539007547034",
  "GB82west12345698765432",
  " BE68539007547034",
  "BE68539007547034 ",
  "BE68539007547034\n",
  "BE68 5390 0754 7034",
  "BE68.539007547034",
  "BE6853900754703",
  "BE685390075470340",
  "BE69539007547034",
  "BEAA539007547034",
  "BE68５39007547034",
  "BE68\u0000539007547034",
  "GB82WÉST12345698765432",
  "A".repeat(35),
  withChecksum("ZZ", "123456789012"),
  withChecksum("NL", "12340417164300"),
  withChecksum("BE", "A39007547034"),
])("rejects malformed or invalid %j", (value) => {
  expect(schema.safeParse(value).success).toBe(false);
});

test("validates generated alphanumeric accounts and detects digit mutations", () => {
  fc.assert(
    fc.property(
      fc.array(fc.constantFrom(..."0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ"), {
        minLength: 11,
        maxLength: 11,
      }),
      (characters) => {
        const value = withChecksum(
          "FR",
          "2004101005" + characters.join("") + "06",
        );
        expect(schema.parse(value)).toBe(value);
        for (const index of [2, 3, 4, 5, 25, 26]) {
          const changed =
            value.slice(0, index) +
            String((Number(value[index]) + 1) % 10) +
            value.slice(index + 1);
          expect(schema.safeParse(changed).success).toBe(false);
        }
      },
    ),
  );
});

test("exports country structure but leaves checksums to runtime validation", () => {
  const json = z.toJSONSchema(schema);
  const pattern = new RegExp(json.$defs!.Iban!.pattern as string);
  expect(pattern.test("BE69539007547034")).toBe(true);
  expect(pattern.test(withChecksum("NL", "12340417164300"))).toBe(false);
  expect(pattern.test("BE68539007547034\n")).toBe(false);
});

// Independent fixtures transcribed from the supplied C# country table.
test.each([
  ["AL", "11111111AAAAAAAAAAAAAAAA", 28],
  ["AD", "11111111AAAAAAAAAAAA", 24],
  ["AT", "1111111111111111", 20],
  ["AZ", "AAAA11111111111111111111", 28],
  ["BH", "AAAAAAAAAAAAAAAAAA", 22],
  ["BY", "AAAA11111111111111111111", 28],
  ["BE", "111111111111", 16],
  ["BA", "1111111111111111", 20],
  ["BR", "11111111111111111111111AA", 29],
  ["BG", "AAAA111111AAAAAAAA", 22],
  ["CR", "111111111111111111", 22],
  ["HR", "11111111111111111", 21],
  ["CY", "11111111AAAAAAAAAAAAAAAA", 28],
  ["CZ", "11111111111111111111", 24],
  ["DK", "11111111111111", 18],
  ["DO", "AAAA11111111111111111111", 28],
  ["TL", "1111111111111111111", 23],
  ["EE", "1111111111111111", 20],
  ["FO", "11111111111111", 18],
  ["FI", "11111111111111", 18],
  ["FR", "1111111111AAAAAAAAAAA11", 27],
  ["GE", "AA1111111111111111", 22],
  ["DE", "111111111111111111", 22],
  ["GI", "AAAAAAAAAAAAAAAAAAA", 23],
  ["GR", "1111111AAAAAAAAAAAAAAAA", 27],
  ["GL", "11111111111111", 18],
  ["GT", "AAAAAAAAAAAAAAAAAAAAAAAA", 28],
  ["HU", "111111111111111111111111", 28],
  ["IS", "1111111111111111111111", 26],
  ["IE", "AAAA11111111111111", 22],
  ["IL", "1111111111111111111", 23],
  ["IT", "A1111111111AAAAAAAAAAAA", 27],
  ["JO", "AAAA1111111111111111111111", 30],
  ["KZ", "111AAAAAAAAAAAAA", 20],
  ["XK", "1111111111111111", 20],
  ["KW", "AAAAAAAAAAAAAAAAAAAAAAAAAA", 30],
  ["LV", "AAAAAAAAAAAAAAAAA", 21],
  ["LB", "1111AAAAAAAAAAAAAAAAAAAA", 28],
  ["LI", "11111AAAAAAAAAAAA", 21],
  ["LT", "1111111111111111", 20],
  ["LU", "111AAAAAAAAAAAAA", 20],
  ["MK", "111AAAAAAAAAA11", 19],
  ["MT", "AAAA11111AAAAAAAAAAAAAAAAAA", 31],
  ["MR", "11111111111111111111111", 27],
  ["MU", "AAAA1111111111111111111AAA", 30],
  ["MC", "1111111111AAAAAAAAAAA11", 27],
  ["MD", "AAAAAAAAAAAAAAAAAAAA", 24],
  ["ME", "111111111111111111", 22],
  ["NL", "AAAA1111111111", 18],
  ["NO", "11111111111", 15],
  ["PK", "AAAA1111111111111111", 24],
  ["PS", "AAAA111111111111111111111", 29],
  ["PL", "111111111111111111111111", 28],
  ["PT", "111111111111111111111", 25],
  ["QA", "AAAAAAAAAAAAAAAAAAAAAAAAA", 29],
  ["RO", "AAAAAAAAAAAAAAAAAAAA", 24],
  ["SM", "A1111111111AAAAAAAAAAAA", 27],
  ["SA", "11AAAAAAAAAAAAAAAAAA", 24],
  ["RS", "111111111111111111", 22],
  ["SK", "11111111111111111111", 24],
  ["SI", "111111111111111", 19],
  ["ES", "11111111111111111111", 24],
  ["SE", "11111111111111111111", 24],
  ["CH", "11111AAAAAAAAAAAA", 21],
  ["TN", "11111111111111111111", 24],
  ["TR", "11111AAAAAAAAAAAAAAAAA", 26],
  ["AE", "1111111111111111111", 23],
  ["GB", "AAAA11111111111111", 22],
  ["VG", "AAAA1111111111111111", 24],
] as const)(
  "validates %s country format and exact length",
  (country, bban, length) => {
    const value = withChecksum(country, bban);
    expect(value).toHaveLength(length);
    expect(schema.parse(value)).toBe(value);
    expect(schema.safeParse(withChecksum(country, bban + "1")).success).toBe(
      false,
    );
    expect(schema.safeParse(withChecksum(country, bban.slice(1))).success).toBe(
      false,
    );
  },
);
