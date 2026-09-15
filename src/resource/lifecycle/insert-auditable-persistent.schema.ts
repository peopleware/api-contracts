// Copyright 2026 PeopleWare N.V.
// SPDX-License-Identifier: Apache-2.0
import { z } from "zod";

import { PersistentSchema } from "./persistent.schema.js";
import { InsertAuditableSchema } from "./insert-auditable.schema.js";

export const InsertAuditablePersistentSchema = InsertAuditableSchema.extend(
  PersistentSchema.shape,
).meta({
  id: "InsertAuditablePersistent",
  description:
    "Persistence and creation-audit metadata for a resource with a nullable Int64 identity.",
  examples: [
    {
      id: 42,
      createdBy: "system",
      createdAt: "2026-01-23T15:22:39.212Z",
    },
    { id: null, createdBy: null, createdAt: null },
  ],
});
export type InsertAuditablePersistent = z.infer<
  typeof InsertAuditablePersistentSchema
>;
