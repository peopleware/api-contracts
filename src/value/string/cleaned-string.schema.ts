// Copyright 2026 PeopleWare N.V.
// SPDX-License-Identifier: Apache-2.0
import { z } from "zod";

export const CleanedStringSchema = z
  .string()
  .min(1)
  .regex(new RegExp("^[a-zA-Z$_][a-zA-Z0-9$_]*$", ""))
  .meta({
    id: "CleanedString",
    description:
      "Trimmed, not empty, cannot start with a digit, and only contain letters, `'$'`, or underscore.",
    examples: ["Anna"],
  });
export type CleanedString = z.infer<typeof CleanedStringSchema>;
