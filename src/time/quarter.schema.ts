// Copyright 2026 PeopleWare N.V.
// SPDX-License-Identifier: Apache-2.0
import { z } from "zod";

export const QuarterSchema = z
  .string()
  .regex(new RegExp("^\\d{4}-(2[1-4])$", ""))
  .meta({
    id: "Quarter",
    description:
      "A quarter in the history of the universe.\n\nThis is a fuzzy description of a time interval, given timezones. This is stored, communicated, and visualized as-is,\nand interpreted locally.\n\nUses the ISO 8601-2:2019 (EDTF) quarter representation, independent of hemisphere. This representation uses the ISO\nmonth representation > 12.\n\n- `21`: Q1\n- `22`: Q2\n- `23`: Q3\n- `24`: Q4",
    examples: ["2020-21", "1999-22", "2023-23", "2022-24"],
  });
export type Quarter = z.infer<typeof QuarterSchema>;
