// Copyright 2026 PeopleWare N.V.
// SPDX-License-Identifier: Apache-2.0
import { expectTypeOf, test } from "vitest";
import type { Accept } from "../src/http/parameters/index.js";
import type { Location } from "../src/http/headers/index.js";
import type {
  CacheControlNoCache,
  CacheControlPrivateImmutable,
} from "../src/http/caching/index.js";
import type { Iban } from "../src/identity/banking/index.js";
import type {
  BelgianEnterpriseNumber,
  BelgianIban,
  BelgianSocialSecurityNumber,
  BelgianVatNumber,
  CbeNumber,
  CrnNumber,
  Inss,
  Insz,
  KboNumber,
  Niss,
} from "../src/identity/be/index.js";
import type { AccountId, Mode, UUID } from "../src/identity/generic/index.js";
import type { Gender } from "../src/identity/person/index.js";
import type { Status } from "../src/resource/health/index.js";
import type { ToOneFromChi } from "../src/resource/relations/index.js";
import type { SearchTerm } from "../src/resource/search/index.js";
import type { StructureVersion } from "../src/resource/versioning/index.js";
import type { Country } from "../src/value/location/index.js";
import type { CurrencyCode } from "../src/value/money/index.js";
import type {
  CanonicalURI,
  CanonicalURIWithKnowledgeTime,
  CleanedString,
  Language,
  RelativeURI,
  TelephoneNumber,
  TrimmedString,
} from "../src/value/string/index.js";
import type {
  DateOnly,
  DateTime,
  ISODateToSecond,
  Month,
  Quarter,
  Year,
} from "../src/value/time/index.js";

test("aliases are identical; primitive domain values are distinct brands", () => {
  // value/*
  expectTypeOf<string>().not.toExtend<CanonicalURI>();
  expectTypeOf<string>().not.toExtend<CanonicalURIWithKnowledgeTime>();
  expectTypeOf<string>().not.toExtend<CleanedString>();
  expectTypeOf<string>().not.toExtend<Country>();
  expectTypeOf<string>().not.toExtend<CurrencyCode>();
  expectTypeOf<string>().not.toExtend<DateOnly>();
  expectTypeOf<string>().not.toExtend<DateTime>();
  expectTypeOf<string>().not.toExtend<ISODateToSecond>();
  expectTypeOf<string>().not.toExtend<Language>();
  expectTypeOf<string>().not.toExtend<Month>();
  expectTypeOf<string>().not.toExtend<Quarter>();
  expectTypeOf<string>().not.toExtend<RelativeURI>();
  expectTypeOf<string>().not.toExtend<TelephoneNumber>();
  expectTypeOf<string>().not.toExtend<TrimmedString>();
  expectTypeOf<string>().not.toExtend<Year>();

  // identity/*
  expectTypeOf<string>().not.toExtend<AccountId>();
  expectTypeOf<string>().not.toExtend<Mode>();
  expectTypeOf<string>().not.toExtend<UUID>();
  expectTypeOf<string>().not.toExtend<Gender>();
  expectTypeOf<string>().not.toExtend<Iban>();
  expectTypeOf<string>().not.toExtend<BelgianIban>();
  expectTypeOf<string>().not.toExtend<BelgianEnterpriseNumber>();
  expectTypeOf<string>().not.toExtend<BelgianVatNumber>();
  expectTypeOf<string>().not.toExtend<BelgianSocialSecurityNumber>();
  expectTypeOf<Iban>().not.toExtend<BelgianIban>();
  expectTypeOf<Iban>().not.toExtend<BelgianVatNumber>();
  expectTypeOf<Iban>().not.toExtend<BelgianEnterpriseNumber>();
  expectTypeOf<Iban>().not.toExtend<BelgianSocialSecurityNumber>();
  expectTypeOf<BelgianIban>().not.toExtend<BelgianVatNumber>();
  expectTypeOf<BelgianIban>().not.toExtend<BelgianEnterpriseNumber>();
  expectTypeOf<BelgianIban>().not.toExtend<BelgianSocialSecurityNumber>();
  expectTypeOf<BelgianVatNumber>().not.toExtend<BelgianEnterpriseNumber>();
  expectTypeOf<BelgianVatNumber>().not.toExtend<BelgianSocialSecurityNumber>();
  expectTypeOf<BelgianEnterpriseNumber>().not.toExtend<BelgianSocialSecurityNumber>();
  expectTypeOf<Niss>().toEqualTypeOf<BelgianSocialSecurityNumber>();
  expectTypeOf<Insz>().toEqualTypeOf<Niss>();
  expectTypeOf<Inss>().toEqualTypeOf<Insz>();
  expectTypeOf<KboNumber>().toEqualTypeOf<BelgianEnterpriseNumber>();
  expectTypeOf<CbeNumber>().toEqualTypeOf<KboNumber>();
  expectTypeOf<CrnNumber>().toEqualTypeOf<CbeNumber>();

  // resource/*
  expectTypeOf<string>().not.toExtend<Status>();
  expectTypeOf<string>().not.toExtend<SearchTerm>();
  expectTypeOf<string>().not.toExtend<ToOneFromChi>();
  expectTypeOf<number>().not.toExtend<StructureVersion>();

  // http/*
  expectTypeOf<string>().not.toExtend<Accept>();
  expectTypeOf<string>().not.toExtend<Location>();
  expectTypeOf<string>().not.toExtend<CacheControlNoCache>();
  expectTypeOf<string>().not.toExtend<CacheControlPrivateImmutable>();
});
