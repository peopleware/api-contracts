// Copyright 2026 PeopleWare N.V.
// SPDX-License-Identifier: Apache-2.0
import { z } from "zod";

export const DateOnlySchema = z.iso.date().meta({
  id: "DateOnly",
  title: "Date only",
  description:
    "Calendar-valid date in canonical YYYY-MM-DD format, without time or timezone.",
  examples: ["2024-02-29"],
});
export type DateOnly = z.infer<typeof DateOnlySchema>;
