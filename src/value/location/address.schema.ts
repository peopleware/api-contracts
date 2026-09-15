// Copyright 2026 PeopleWare N.V.
// SPDX-License-Identifier: Apache-2.0
import { z } from "zod";

import { CountrySchema } from "./country.schema.js";
import { TrimmedStringSchema } from "../string/trimmed-string.schema.js";

export const AddressSchema = z
  .object({
    street: TrimmedStringSchema.nullable(),
    houseNumber: TrimmedStringSchema.nullable(),
    box: TrimmedStringSchema.nullable(),
    zipCode: TrimmedStringSchema.nullable(),
    city: TrimmedStringSchema.nullable(),
    country: CountrySchema.nullable(),
  })
  .passthrough()
  .meta({
    id: "Address",
    examples: [
      {
        street: "Duwijckstraat",
        houseNumber: "17",
        box: null,
        zipCode: "2500",
        city: "Lier",
        country: "BE",
      },
    ],
  });
export type Address = z.infer<typeof AddressSchema>;
