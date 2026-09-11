// Copyright 2026 PeopleWare N.V.
// SPDX-License-Identifier: Apache-2.0
import { z } from "zod";
import { hasBelgianChecksum } from "../_util/modulo-97.js";

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
    description:
      "Canonical 11-digit INSZ/NISS, including BIS numbers. Validates pre-2000 or post-1999 modulo-97; does not validate birth date, gender or registry membership. Checksum requires runtime validation.",
    examples: ["00000000097"],
  });
export type BelgianSocialSecurityNumber = z.infer<
  typeof BelgianSocialSecurityNumberSchema
>;
export const NissSchema = BelgianSocialSecurityNumberSchema;
export type Niss = BelgianSocialSecurityNumber;
export const InszSchema = BelgianSocialSecurityNumberSchema;
export type Insz = BelgianSocialSecurityNumber;
