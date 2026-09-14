// Copyright 2026 PeopleWare N.V.
// SPDX-License-Identifier: Apache-2.0
import { z } from "zod";

export const HealthSchema = z
  .object({
    status: z.union([
      z.literal("OK"),
      z.literal("WARNING"),
      z.literal("ERROR"),
      z.literal("UNREACHABLE"),
    ]),
  })
  .passthrough()
  .meta({
    id: "Health",
    examples: [
      { status: "OK" },
      { status: "WARNING" },
      { status: "ERROR" },
      { status: "UNREACHABLE" },
    ],
  });
export type Health = z.infer<typeof HealthSchema>;
