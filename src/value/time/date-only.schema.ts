// Copyright 2026 PeopleWare N.V.
// SPDX-License-Identifier: Apache-2.0
import { z } from "zod";

export const DateOnlySchema = z.iso.date().meta({
  id: "DateOnly",
  title: "Date only",
  description:
    "A calendar-valid day in the history of the world, using the ISO-8601 canonical YYYY-MM-DD format, without time or timezone. This is stored, communicated, and visualized as-is, and interpreted locally.",
  examples: ["2024-02-29", "2020-01-23", "1999-01-01"],
});
export type DateOnly = z.infer<typeof DateOnlySchema>;

export const DayDateSchema = DateOnlySchema;
export type DayDate = DateOnly;
