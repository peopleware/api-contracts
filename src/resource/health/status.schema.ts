// Copyright 2026 PeopleWare N.V.
// SPDX-License-Identifier: Apache-2.0
import { z } from "zod";

export const StatusSchema = z
  .union([
    z.literal("OK"),
    z.literal("WARNING"),
    z.literal("ERROR"),
    z.literal("UNREACHABLE"),
  ])
  .meta({
    id: "Status",
    description:
      "\n- OK: 200 — the service is running within specifications\n- WARNING: 270 — the service is running, but some requirements are not fulfilled\n- ERROR: 470 — the service is running, but some crucial specifications are not fulfilled, and operation is not guaranteed\n- UNREACHABLE: 500 — the service is not running or not available",
    examples: ["OK", "WARNING", "ERROR", "UNREACHABLE"],
  });
export type Status = z.infer<typeof StatusSchema>;
