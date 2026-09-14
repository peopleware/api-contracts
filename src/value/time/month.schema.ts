// Copyright 2026 PeopleWare N.V.
// SPDX-License-Identifier: Apache-2.0
import { z } from "zod";

export const MonthSchema = z
  .string()
  .regex(new RegExp("^\\d{4}-(0[1-9]|1[0-2])$", ""))
  .meta({
    id: "Month",
    description:
      "A month in the history of the universe.\n\nThis is a fuzzy description of a time interval, given timezones. This is stored, communicated, and visualized as-is,\nand interpreted locally.\n\nUses the ISO-8601 representation.",
    examples: ["2020-01", "1999-01"],
  });
export type Month = z.infer<typeof MonthSchema>;
