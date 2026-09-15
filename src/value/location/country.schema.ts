// Copyright 2026 PeopleWare N.V.
// SPDX-License-Identifier: Apache-2.0
import { z } from "zod";

export const CountrySchema = z
  .string()
  .regex(new RegExp("^[A-Z]{2}$", ""))
  .meta({
    id: "Country",
    description:
      "[ISO 3166 1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) 2-letter country code",
    examples: ["BE"],
  });
export type Country = z.infer<typeof CountrySchema>;
