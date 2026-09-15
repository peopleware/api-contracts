// Copyright 2026 PeopleWare N.V.
// SPDX-License-Identifier: Apache-2.0
import { z } from "zod";

import { TrimmedStringSchema } from "../../value/string/trimmed-string.schema.js";
import { DateTimeSchema } from "../../value/time/date-time.schema.js";
import { InsertAuditableSchema } from "./insert-auditable.schema.js";

export const AuditableSchema = InsertAuditableSchema.extend({
  lastModifiedBy: TrimmedStringSchema.nullable().optional(),
  lastModifiedAt: DateTimeSchema.nullable().optional(),
}).meta({
  id: "Auditable",
  description: "Creation-audit and modification-audit metadata for a resource.",
  examples: [
    {
      createdBy: "system",
      createdAt: "2026-01-23T15:22:39.212Z",
      lastModifiedBy: "admin",
      lastModifiedAt: "2026-02-01T10:11:12.123Z",
    },
    {
      createdBy: null,
      createdAt: null,
      lastModifiedBy: null,
      lastModifiedAt: null,
    },
  ],
});
export type Auditable = z.infer<typeof AuditableSchema>;
