// Copyright 2026 PeopleWare N.V.
// SPDX-License-Identifier: Apache-2.0
import { z } from "zod";
import { hasBelgianChecksum } from "../_util/modulo-97.js";

export const BelgianVatNumberSchema = z
  .string()
  .length(12)
  .regex(/^BE[01][0-9]{9}$/)
  .refine(
    (value) => hasBelgianChecksum(value.slice(2)),
    "Invalid Belgian VAT number checksum",
  )
  .brand<"BelgianVatNumber">()
  .meta({
    id: "BelgianVatNumber",
    title: "Belgian VAT number",
    description:
      "Uppercase BE followed by a structurally valid Belgian enterprise number. Does not establish current VAT registration. Checksum requires runtime validation.",
    examples: ["BE0123456749"],
  });
export type BelgianVatNumber = z.infer<typeof BelgianVatNumberSchema>;
