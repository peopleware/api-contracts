// Copyright 2026 PeopleWare N.V.
// SPDX-License-Identifier: Apache-2.0
/** Decimal digits only; structure is validated by the calling schema. */
export function modulo97(digits: string): number {
  let remainder = 0;
  for (const digit of digits) remainder = (remainder * 10 + Number(digit)) % 97;
  return remainder;
}
export function hasBelgianChecksum(digits: string): boolean {
  return 97 - modulo97(digits.slice(0, -2)) === Number(digits.slice(-2));
}
