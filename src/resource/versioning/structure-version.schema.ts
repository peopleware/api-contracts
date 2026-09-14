// Copyright 2026 PeopleWare N.V.
// SPDX-License-Identifier: Apache-2.0
import { z } from "zod";

export const StructureVersionSchema = z
  .number()
  .int()
  .min(1)
  .meta({
    id: "StructureVersion",
    description: "Version of the data structure of this resource type",
    examples: [1],
  });
export type StructureVersion = z.infer<typeof StructureVersionSchema>;
