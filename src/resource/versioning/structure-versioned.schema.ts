// Copyright 2026 PeopleWare N.V.
// SPDX-License-Identifier: Apache-2.0
import { z } from "zod";

export const StructureVersionedSchema = z
  .object({ structureVersion: z.number().int().min(1) })
  .passthrough()
  .meta({ id: "StructureVersioned", examples: [{ structureVersion: 1 }] });
export type StructureVersioned = z.infer<typeof StructureVersionedSchema>;
