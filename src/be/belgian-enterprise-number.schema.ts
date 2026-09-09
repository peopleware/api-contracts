// Copyright 2026 PeopleWare N.V.
// SPDX-License-Identifier: Apache-2.0
import { z } from "zod";
import { hasBelgianChecksum } from "./internal/modulo-97.js";

export const BelgianEnterpriseNumberSchema = z
  .string()
  .length(10)
  .regex(/^[01][0-9]{9}$/)
  .refine(hasBelgianChecksum, "Invalid Belgian enterprise number checksum")
  .brand<"BelgianEnterpriseNumber">()
  .meta({
    id: "BelgianEnterpriseNumber",
    title: "Belgian enterprise number",
    description:
      "Canonical 10-digit KBO/CBE starting with 0 or 1. Checksum requires runtime validation; registry membership is not checked.",
    examples: ["0123456749"],
  });
export type BelgianEnterpriseNumber = z.infer<
  typeof BelgianEnterpriseNumberSchema
>;
export const KboNumberSchema = BelgianEnterpriseNumberSchema;
export type KboNumber = BelgianEnterpriseNumber;
export const CbeNumberSchema = BelgianEnterpriseNumberSchema;
export type CbeNumber = BelgianEnterpriseNumber;
