// Copyright 2026 PeopleWare N.V.
// SPDX-License-Identifier: Apache-2.0
import { z } from "zod";
import { ibanCountryPatterns } from "./_util/iban-country-patterns.js";

const pattern = new RegExp(
  `^(?:${Object.entries(ibanCountryPatterns)
    .map(([country, bban]) => `${country}[0-9]{2}${bban.source}`)
    .join("|")})(?![\\s\\S])`,
);

export const IbanSchema = z
  .iban()
  // z.iban() intentionally omits per-country BBAN rules; retain them here to
  // preserve this schema's stricter validation. See Zod's implementation rationale:
  // https://github.com/colinhacks/zod/issues/6565
  .regex(pattern)
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
