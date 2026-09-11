// Copyright 2026 PeopleWare N.V.
// SPDX-License-Identifier: Apache-2.0
import { z } from "zod";

export const DateTimeSchema = z
  .string()
  .regex(
    new RegExp(
      "^\\d{4}-(0[1-9]|1[0-2])-((0[1-9]|[1-2]\\d)|30|31)T(0\\d|1\\d|2[0-3]):([0-5]\\d):([0-5]\\d)\\.\\d{3,}Z$",
      "",
    ),
  )
  .meta({
    id: "DateTime",
    description:
      "Moment in time, as ISO-8601 expressed in UTC ('Z'), to ms precision or more precise.",
    examples: ["2020-01-23T15:22:39.212Z", "2020-01-23T15:22:39.21254888Z"],
  });
export type DateTime = z.infer<typeof DateTimeSchema>;
