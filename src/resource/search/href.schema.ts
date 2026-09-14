// Copyright 2026 PeopleWare N.V.
// SPDX-License-Identifier: Apache-2.0
import { z } from "zod";

export const HREFSchema = z
  .object({
    first: z.string().min(1),
    previous: z.string().min(1).optional(),
    next: z.string().min(1).optional(),
    last: z.string().min(1),
  })
  .passthrough()
  .meta({
    id: "HREF",
    description: "Links to other pages of the search result.",
    examples: [
      {
        first: "search?searchTerm=find%20me&page=1&per_page=27",
        previous: "search?searchTerm=find%20me&page=3&per_page=27",
        next: "search?searchTerm=find%20me&page=5&per_page=27",
        last: "search?searchTerm=find%20me&page=22&per_page=27",
      },
    ],
  });
export type HREF = z.infer<typeof HREFSchema>;
