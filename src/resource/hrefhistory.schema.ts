// Copyright 2026 PeopleWare N.V.
// SPDX-License-Identifier: Apache-2.0
import { z } from "zod";

export const HREFHistorySchema = z
  .object({ history: z.string().min(1) })
  .passthrough()
  .meta({
    id: "HREFHistory",
    description: "HATEOAS links. These are relative URIs.",
    examples: [{ history: "1567889875/history" }],
  });
export type HREFHistory = z.infer<typeof HREFHistorySchema>;
