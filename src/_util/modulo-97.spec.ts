// Copyright 2026 PeopleWare N.V.
// SPDX-License-Identifier: Apache-2.0
import { expect, test } from "vitest";
import fc from "fast-check";
import { modulo97, hasBelgianChecksum } from "./modulo-97.js";

test("matches exact integer arithmetic even beyond Number precision", () => {
  fc.assert(
    fc.property(fc.bigInt({ min: 0n, max: 10n ** 80n }), (value) => {
      expect(modulo97(String(value))).toBe(Number(value % 97n));
    }),
  );
});

test("handles leading zeros", () => {
  expect(modulo97("00097")).toBe(0);
});

test("handles leading zeros and checksum 97", () => {
  expect(hasBelgianChecksum("00000000097")).toBe(true);
  expect(hasBelgianChecksum("00000000000")).toBe(false);
});
