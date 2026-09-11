// Copyright 2026 PeopleWare N.V.
// SPDX-License-Identifier: Apache-2.0
import { z } from "zod";

export const UUIDSchema = z
  .string()
  .meta({ id: "UUID", examples: ["611e148e-734d-4fe6-ae9b-b3b61d66cd27"] });
export type UUID = z.infer<typeof UUIDSchema>;
