// Copyright 2026 PeopleWare N.V.
// SPDX-License-Identifier: Apache-2.0
import { z } from "zod";

export const YearSchema = z
  .string()
  .regex(new RegExp("^\\d{4}$", ""))
  .meta({
    id: "Year",
    description:
      "A year in the history of the universe.\n\nThis is a fuzzy description of a time interval, given timezones. This is stored, communicated, and visualized as-is,\nand interpreted locally.\n\nUses the ISO-8601 representation.",
    examples: ["2020", "1999"],
  });
export type Year = z.infer<typeof YearSchema>;
