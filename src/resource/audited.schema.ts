// Copyright 2026 PeopleWare N.V.
// SPDX-License-Identifier: Apache-2.0
import { z } from "zod";

export const AuditedSchema = z
  .object({
    createdAt: z
      .string()
      .regex(
        new RegExp(
          "^\\d{4}-(0[1-9]|1[0-2])-((0[1-9]|[1-2]\\d)|30|31)T(0\\d|1\\d|2[0-3]):([0-5]\\d):([0-5]\\d)\\.\\d{3,}Z$",
          "",
        ),
      ),
    createdBy: z.string().optional(),
  })
  .passthrough()
  .meta({
    id: "Audited",
    examples: [
      { createdAt: "2020-01-23T15:22:39.212Z", createdBy: "y7_56b.953WP9" },
      {
        createdAt: "2020-01-23T15:22:39.21254888Z",
        createdBy: "y7_56b.953WP9",
      },
    ],
  });
export type Audited = z.infer<typeof AuditedSchema>;
