// Copyright 2026 PeopleWare N.V.
// SPDX-License-Identifier: Apache-2.0
import { z } from "zod";
import { modulo97 } from "./internal/modulo-97.js";

export const BelgianIbanSchema = z
  .string()
  .length(16)
  .regex(/^BE[0-9]{14}$/)
  .refine(
    (value) => modulo97(`${value.slice(4)}1114${value.slice(2, 4)}`) === 1,
    "Invalid Belgian IBAN checksum",
  )
  .brand<"BelgianIban">()
  .meta({
    id: "BelgianIban",
    title: "Belgian IBAN",
    description:
      "Uppercase BE followed by 14 digits with ISO 13616 modulo-97 validation. Does not establish account existence. Checksum requires runtime validation.",
    examples: ["BE68539007547034"],
  });
export type BelgianIban = z.infer<typeof BelgianIbanSchema>;
