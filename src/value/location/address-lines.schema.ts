// Copyright 2026 PeopleWare N.V.
// SPDX-License-Identifier: Apache-2.0
import { z } from "zod";

export const AddressLinesSchema = z
  .object({
    line1: z
      .string()
      .min(1)
      .refine((value) => value === value.trim(), {
        message: "Must be trimmed",
      }),
    line2: z
      .string()
      .min(1)
      .refine((value) => value === value.trim(), { message: "Must be trimmed" })
      .optional(),
    postalCode: z
      .string()
      .min(1)
      .refine((value) => value === value.trim(), {
        message: "Must be trimmed",
      }),
    municipality: z
      .string()
      .min(1)
      .refine((value) => value === value.trim(), {
        message: "Must be trimmed",
      }),
    country: z.string().regex(new RegExp("^[A-Z]{2}$", "")),
  })
  .passthrough()
  .meta({
    id: "AddressLines",
    examples: [
      {
        line1: "Duwijckstraat 17",
        postalCode: "2500",
        municipality: "Lier",
        country: "BE",
      },
      {
        line1: "Duwijckstraat 17",
        postalCode: "2500",
        municipality: "Lier",
        country: "BE",
        line2: "office 234",
      },
    ],
  });
export type AddressLines = z.infer<typeof AddressLinesSchema>;
