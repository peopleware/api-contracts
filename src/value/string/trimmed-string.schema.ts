// Copyright 2026 PeopleWare N.V.
// SPDX-License-Identifier: Apache-2.0
import { z } from "zod";

export const TrimmedStringSchema = z
  .string()
  .min(1)
  .regex(/^\S(?:[\s\S]*\S)?$(?![\s\S])/u)
  .meta({
    id: "TrimmedString",
    title: "Trimmed string",
    description:
      "Non-empty string without leading or trailing whitespace. Input is never transformed.",
    examples: ["Hello world"],
  });
export type TrimmedString = z.infer<typeof TrimmedStringSchema>;
