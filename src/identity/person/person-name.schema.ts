// Copyright 2026 PeopleWare N.V.
// SPDX-License-Identifier: Apache-2.0
import { z } from "zod";

export const PersonNameSchema = z
  .object({
    firstName: z.string().nullable(),
    lastName: z.string(),
    fullName: z.string().nullable(),
  })
  .passthrough()
  .meta({
    id: "PersonName",
    description: "A person's first name, last name, and full name.",
    examples: [
      {
        firstName: "Ada",
        lastName: "Lovelace",
        fullName: "Ada Lovelace",
      },
    ],
  });
export type PersonName = z.infer<typeof PersonNameSchema>;
