// Copyright 2026 PeopleWare N.V.
// SPDX-License-Identifier: Apache-2.0
import { z } from "zod";
import { hasBelgianChecksum } from "../../_util/modulo-97.js";

export const BelgianEnterpriseNumberSchema = z
  .string()
  .length(10)
  .regex(/^[01][0-9]{9}$/)
  .refine(hasBelgianChecksum, "Invalid Belgian enterprise number checksum")
  .brand<"BelgianEnterpriseNumber">()
  .meta({
    id: "BelgianEnterpriseNumber",
    title: "Belgian enterprise number",
    description: [
      "Canonical 10-digit Belgian enterprise number (KBO/CBE), also known as a company registration number (CRN). It uniquely identifies an organization and is also used as the Belgian VAT identifier.",
      "The number is issued by the Belgian government through the [Crossroads Bank for Enterprises](https://economie.fgov.be/en/themes/enterprises/crossroads-bank-enterprises) (CBE; KBO, BCE or ZDU). It never changes; a different number identifies a different legal organization. The representation contains digits only.",
      "It starts with `0` or `1` and consists of 8 digits followed by a modulo-97 checksum. Validation checks the structure and checksum, but not registry membership. Checksum validation requires runtime validation.",
    ].join("\n\n"),
    examples: ["0123456749", "0453834195", "1453834119", "1234567401"],
  });
export type BelgianEnterpriseNumber = z.infer<
  typeof BelgianEnterpriseNumberSchema
>;
export const KboNumberSchema = BelgianEnterpriseNumberSchema;
export type KboNumber = BelgianEnterpriseNumber;
export const CbeNumberSchema = BelgianEnterpriseNumberSchema;
export type CbeNumber = BelgianEnterpriseNumber;
export const CrnNumberSchema = BelgianEnterpriseNumberSchema;
export type CrnNumber = BelgianEnterpriseNumber;
