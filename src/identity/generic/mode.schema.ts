// Copyright 2026 PeopleWare N.V.
// SPDX-License-Identifier: Apache-2.0
import { z } from "zod";

export const ModeSchema = z
  .string()
  .regex(
    /^production|simulation|automated-test-[\da-fA-F]{8}-[\da-fA-F]{4}-[\da-fA-F]{4}-[\da-fA-F]{4}-[\da-fA-F]{12}|qa-\d+|acceptance-\d+|migration-\d{4}-((0[13578]|10|12)-(0[1-9]|[1-2]\d|30|31)|02-(0[1-9]|1\d|2[0-9])|(0[469]|11)-(0[1-9]|[1-2]\d|30))T([01]\d|2[0-3])(:[0-5]\d){2}Z|demo|dev-experiment$/,
  )
  .meta({
    id: "Mode",
    examples: [
      "production",
      "simulation",
      "automated-test-701927f0-171e-4199-bff8-bb54e15b8481",
      "qa-4",
      "acceptance-6",
      "migration-2012-02-29T18:21:06Z",
      "demo",
      "dev-experiment",
    ],
  });
export type Mode = z.infer<typeof ModeSchema>;
