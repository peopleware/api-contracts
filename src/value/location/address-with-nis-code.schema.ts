// Copyright 2026 PeopleWare N.V.
// SPDX-License-Identifier: Apache-2.0
import { z } from "zod";

import { TrimmedStringSchema } from "../string/trimmed-string.schema.js";

export const AddressWithNisCodeSchema = z
  .object({
    street: TrimmedStringSchema.nullable(),
    houseNumber: TrimmedStringSchema.nullable(),
    box: TrimmedStringSchema.nullable(),
    zipCode: TrimmedStringSchema.nullable(),
    city: TrimmedStringSchema.nullable(),
    countryNisCode: z.number().int().min(100).max(999).nullable(),
  })
  .passthrough()
  .meta({
    id: "AddressWithNisCode",
    description:
      "The `countryNisCode` refers to the current Belgian NIS country codes published by [Statbel](https://statbel.fgov.be/nl/over-statbel/methodologie/classificaties/landencodes).",
    examples: [
      {
        street: "Duwijckstraat",
        houseNumber: "17",
        box: null,
        zipCode: "2500",
        city: "Lier",
        countryNisCode: 150,
      },
    ],
  });
export type AddressWithNisCode = z.infer<typeof AddressWithNisCodeSchema>;
