// Copyright 2026 PeopleWare N.V.
// SPDX-License-Identifier: Apache-2.0
import { z } from "zod";

export const SearchTermSchema = z
  .string()
  .refine((value) => value === value.trim(), { message: "Must be trimmed" })
  .min(1)
  .meta({
    id: "SearchTerm",
    description:
      "free text on which the resource can be found (trimmed, not empty)",
    examples: ["Mari", "Jos", "0123456789"],
  });
export type SearchTerm = z.infer<typeof SearchTermSchema>;
