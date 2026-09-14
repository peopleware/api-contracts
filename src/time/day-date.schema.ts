// Copyright 2026 PeopleWare N.V.
// SPDX-License-Identifier: Apache-2.0
import { z } from "zod";

export const DayDateSchema = z
  .string()
  .regex(new RegExp("^\\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2]\\d|30|31)$", ""))
  .meta({
    id: "DayDate",
    description:
      "A day in the history of the world.\n\n\nThis is a fuzzy description of a time interval, given timezones. This is stored, communicated, and visualized as-is,\nand interpreted locally.\n\n\nUses the ISO-8601 representation.",
    examples: ["2020-01-23", "1999-01-01"],
  });
export type DayDate = z.infer<typeof DayDateSchema>;
