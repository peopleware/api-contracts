// Copyright 2026 PeopleWare N.V.
// SPDX-License-Identifier: Apache-2.0
import { z } from "zod";

export const PersistentSchema = z
  .object({
    id: z.number().int().nullable().optional(),
  })
  .passthrough()
  .meta({
    id: "Persistent",
    description:
      "Persistence metadata for a resource with a nullable Int64 identity.",
    examples: [{ id: 42 }, { id: null }],
  });
export type Persistent = z.infer<typeof PersistentSchema>;
