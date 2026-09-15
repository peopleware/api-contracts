// Copyright 2026 PeopleWare N.V.
// SPDX-License-Identifier: Apache-2.0
import { z } from "zod";
import { hasBelgianChecksum } from "../../_util/modulo-97.js";

export const BelgianSocialSecurityNumberSchema = z
  .string()
  .length(11)
  .regex(/^[0-9]{11}$/)
  .refine(
    (value) => hasBelgianChecksum(value) || hasBelgianChecksum(`2${value}`),
    "Invalid Belgian social security number checksum",
  )
  .brand<"BelgianSocialSecurityNumber">()
  .meta({
    id: "BelgianSocialSecurityNumber",
    title: "Belgian social security number",
    description: [
      "Canonical 11-digit Belgian social security number (INSS; INSZ, NISS or ENSS), including national registration and BIS numbers. BIS numbers encode an adjusted birth month (increased by 20 or 40). The representation contains digits only.",
      "An INSS identifies a person for Belgian social security purposes and may change over time; this is the value applicable since `createdAt`. Under Belgian labour law, every person who works in Belgium has an INSS.",
      "Validation applies the modulo-97 checksum rules for pre-2000 and post-1999 numbers. It does not validate the birth date, gender or registry membership. Checksum validation requires runtime validation.",
    ].join("\n\n"),
    examples: [
      "00000000097",
      "86081203314",
      "04031800277",
      "86281203357",
      "05291705534",
    ],
  });
export type BelgianSocialSecurityNumber = z.infer<
  typeof BelgianSocialSecurityNumberSchema
>;
export const NissSchema = BelgianSocialSecurityNumberSchema;
export type Niss = BelgianSocialSecurityNumber;
export const InszSchema = BelgianSocialSecurityNumberSchema;
export type Insz = BelgianSocialSecurityNumber;
export const InssSchema = BelgianSocialSecurityNumberSchema;
export type Inss = BelgianSocialSecurityNumber;
