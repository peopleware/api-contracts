// Copyright 2026 PeopleWare N.V.
// SPDX-License-Identifier: Apache-2.0
import { z } from "zod";
import { modulo97 } from "../_util/modulo-97.js";
import { ibanCountryPatterns } from "./_util/iban-country-patterns.js";

const pattern = new RegExp(
  `^(?:${Object.entries(ibanCountryPatterns)
    .map(([country, bban]) => `${country}[0-9]{2}${bban.source}`)
    .join("|")})(?![\\s\\S])`,
);

export const IbanSchema = z
  .string()
  .min(14)
  .max(34)
  .regex(pattern)
  .refine((value) => {
    const rearranged = value.slice(4) + value.slice(0, 4);
    const digits = rearranged.replace(/[A-Z]/g, (letter) =>
      String(letter.charCodeAt(0) - 55),
    );
    return modulo97(digits) === 1;
  }, "Invalid IBAN checksum")
  .brand<"Iban">()
  .meta({
    id: "Iban",
    title: "International IBAN",
    description:
      "Canonical uppercase IBAN without separators, using the 69 country formats from PPWCode.Util.Validation.IV.IBAN and ISO 7064 MOD 97-10 checksum validation. Does not establish account existence. Checksum requires runtime validation.",
    examples: [
      "BE68539007547034",
      "DE89370400440532013000",
      "GB82WEST12345698765432",
    ],
  });
export type Iban = z.infer<typeof IbanSchema>;
