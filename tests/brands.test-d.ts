// Copyright 2026 PeopleWare N.V.
// SPDX-License-Identifier: Apache-2.0
import { expectTypeOf, test } from "vitest";
import type { Iban } from "../src/money/index.js";
import type {
  BelgianSocialSecurityNumber,
  Niss,
  Insz,
  BelgianEnterpriseNumber,
  KboNumber,
  CbeNumber,
  BelgianVatNumber,
  BelgianIban,
} from "../src/be/index.js";
import type { TrimmedString } from "../src/string/index.js";
import type { DateOnly } from "../src/time/index.js";
test("aliases are identical; identifiers are distinct brands", () => {
  expectTypeOf<string>().not.toExtend<Iban>();
  expectTypeOf<Iban>().not.toExtend<BelgianIban>();
  expectTypeOf<BelgianIban>().not.toExtend<Iban>();
  expectTypeOf<Iban>().not.toExtend<BelgianVatNumber>();
  expectTypeOf<Iban>().not.toExtend<BelgianEnterpriseNumber>();
  expectTypeOf<Iban>().not.toExtend<BelgianSocialSecurityNumber>();
  expectTypeOf<Niss>().toEqualTypeOf<BelgianSocialSecurityNumber>();
  expectTypeOf<Insz>().toEqualTypeOf<Niss>();
  expectTypeOf<KboNumber>().toEqualTypeOf<BelgianEnterpriseNumber>();
  expectTypeOf<CbeNumber>().toEqualTypeOf<KboNumber>();
  expectTypeOf<TrimmedString>().toEqualTypeOf<string>();
  expectTypeOf<DateOnly>().toEqualTypeOf<string>();
  expectTypeOf<string>().not.toExtend<BelgianIban>();
  expectTypeOf<string>().not.toExtend<BelgianSocialSecurityNumber>();
  expectTypeOf<string>().not.toExtend<BelgianEnterpriseNumber>();
  expectTypeOf<string>().not.toExtend<BelgianVatNumber>();
  expectTypeOf<BelgianIban>().not.toExtend<BelgianVatNumber>();
  expectTypeOf<BelgianIban>().not.toExtend<BelgianEnterpriseNumber>();
  expectTypeOf<BelgianIban>().not.toExtend<BelgianSocialSecurityNumber>();
  expectTypeOf<BelgianVatNumber>().not.toExtend<BelgianEnterpriseNumber>();
  expectTypeOf<BelgianVatNumber>().not.toExtend<BelgianSocialSecurityNumber>();
  expectTypeOf<BelgianEnterpriseNumber>().not.toExtend<BelgianSocialSecurityNumber>();
});
