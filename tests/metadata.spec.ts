// Copyright 2026 PeopleWare N.V.
// SPDX-License-Identifier: Apache-2.0
import { expect, test } from "vitest";
import { z } from "zod";
import { IbanSchema } from "../src/money/index.js";
import * as be from "../src/be/index.js";
import {
  TelephoneNumberSchema,
  TrimmedStringSchema,
} from "../src/string/index.js";
import { DateOnlySchema } from "../src/time/index.js";
const schemas = [
  IbanSchema,
  TrimmedStringSchema,
  TelephoneNumberSchema,
  DateOnlySchema,
  be.BelgianSocialSecurityNumberSchema,
  be.BelgianEnterpriseNumberSchema,
  be.BelgianVatNumberSchema,
  be.BelgianIbanSchema,
];
test.each(schemas)("JSON Schema metadata for $description", (schema) => {
  expect(z.toJSONSchema(schema, { target: "draft-2020-12" })).toMatchSnapshot(
    schema.meta()?.id,
  );
  for (const example of schema.meta()?.examples ?? [])
    expect(schema.safeParse(example).success).toBe(true);
});
test("aliases share canonical instances", () => {
  expect(be.NissSchema).toBe(be.BelgianSocialSecurityNumberSchema);
  expect(be.InszSchema).toBe(be.NissSchema);
  expect(be.KboNumberSchema).toBe(be.BelgianEnterpriseNumberSchema);
  expect(be.CbeNumberSchema).toBe(be.KboNumberSchema);
});
