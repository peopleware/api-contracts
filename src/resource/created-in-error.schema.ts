// Copyright 2026 PeopleWare N.V.
// SPDX-License-Identifier: Apache-2.0
import { z } from "zod";

export const CreatedInErrorSchema = z
  .object({
    structureVersion: z.number().int().min(1),
    createdAt: z
      .string()
      .regex(
        new RegExp(
          "^\\d{4}-(0[1-9]|1[0-2])-((0[1-9]|[1-2]\\d)|30|31)T(0\\d|1\\d|2[0-3]):([0-5]\\d):([0-5]\\d)\\.\\d{3,}Z$",
          "",
        ),
      ),
    createdBy: z.string(),
    createdInError: z.literal(true),
  })
  .passthrough()
  .meta({
    id: "CreatedInError",
    description:
      "The resource was created in error. There are no properties, except for the audit properties.",
    examples: [
      {
        structureVersion: 1,
        createdAt: "2022-08-18T14:57:39.732Z",
        createdBy: "klkuij39035",
        createdInError: true,
      },
    ],
  });
export type CreatedInError = z.infer<typeof CreatedInErrorSchema>;
