// Copyright 2026 PeopleWare N.V.
// SPDX-License-Identifier: Apache-2.0
import { z } from "zod";

import { TrimmedStringSchema } from "../../value/string/trimmed-string.schema.js";
import { DateTimeSchema } from "../../value/time/date-time.schema.js";

export const InsertAuditableSchema = z
  .object({
    createdBy: TrimmedStringSchema.nullable().optional(),
    createdAt: DateTimeSchema.nullable().optional(),
  })
  .passthrough()
  .meta({
    id: "InsertAuditable",
    description: "Creation-audit metadata for a resource.",
    examples: [
      {
        createdBy: "system",
        createdAt: "2026-01-23T15:22:39.212Z",
      },
      { createdBy: null, createdAt: null },
    ],
  });
export type InsertAuditable = z.infer<typeof InsertAuditableSchema>;
