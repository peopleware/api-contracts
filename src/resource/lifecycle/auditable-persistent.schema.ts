// Copyright 2026 PeopleWare N.V.
// SPDX-License-Identifier: Apache-2.0
import { z } from "zod";

import { PersistentSchema } from "./persistent.schema.js";
import { AuditableSchema } from "./auditable.schema.js";

export const AuditablePersistentSchema = AuditableSchema.extend(
  PersistentSchema.shape,
).meta({
  id: "AuditablePersistent",
  description:
    "Persistence, creation-audit, and modification-audit metadata for a resource with a nullable Int64 identity.",
  examples: [
    {
      id: 42,
      createdBy: "system",
      createdAt: "2026-01-23T15:22:39.212Z",
      lastModifiedBy: "admin",
      lastModifiedAt: "2026-02-01T10:11:12.123Z",
    },
    {
      id: null,
      createdBy: null,
      createdAt: null,
      lastModifiedBy: null,
      lastModifiedAt: null,
    },
  ],
});
export type AuditablePersistent = z.infer<typeof AuditablePersistentSchema>;
