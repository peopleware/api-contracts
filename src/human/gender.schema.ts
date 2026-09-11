// Copyright 2026 PeopleWare N.V.
// SPDX-License-Identifier: Apache-2.0
import { z } from "zod";

export const GenderSchema = z
  .union([z.literal("F"), z.literal("M"), z.literal("X")])
  .meta({ id: "Gender", examples: ["F", "M", "X"] });
export type Gender = z.infer<typeof GenderSchema>;
