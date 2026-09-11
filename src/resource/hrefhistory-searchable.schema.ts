// Copyright 2026 PeopleWare N.V.
// SPDX-License-Identifier: Apache-2.0
import { z } from "zod";

export const HREFHistorySearchableSchema = z
  .object({ history: z.string().min(1), searchDocument: z.string().min(1) })
  .passthrough()
  .meta({
    id: "HREFHistorySearchable",
    description: "HATEOAS links. These are relative URIs.",
    examples: [
      {
        history: "1567889875/history",
        searchDocument: "1567889875/search-document",
      },
    ],
  });
export type HREFHistorySearchable = z.infer<typeof HREFHistorySearchableSchema>;
