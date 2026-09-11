// Copyright 2026 PeopleWare N.V.
// SPDX-License-Identifier: Apache-2.0
import { z } from "zod";

export const DayDateIntervalSchema = z
  .object({
    start: z
      .string()
      .regex(
        new RegExp("^\\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2]\\d|30|31)$", ""),
      ),
    end: z
      .string()
      .regex(new RegExp("^\\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2]\\d|30|31)$", ""))
      .optional(),
  })
  .meta({
    id: "DayDateInterval",
    description:
      'Half-right-open time interval `[start, end[` of day dates. `start ≤ end`. If there is no\n`end`, this means the interval stretches until the heath death of the universe. Usually this means that interval is\nbelieved to be still ongoing with the knowledge represented.\n\nPlease use [Allen\'s Interval Algebra](https://en.wikipedia.org/wiki/Allen%27s_interval_algebra) ("[Maintaining\nKnowledge about Temporal Intervals](http://cse.unl.edu/~choueiry/Documents/Allen-CACM1983.pdf)") to reason about time\nintervals.\n\nThis is a fuzzy description of a time interval, given timezones. This is stored, communicated, and visualized as-is,\nand interpreted locally.',
    examples: [
      { start: "1996-12-21", end: "2011-08-23" },
      { start: "2022-08-26" },
    ],
  });
export type DayDateInterval = z.infer<typeof DayDateIntervalSchema>;
