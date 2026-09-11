// Copyright 2026 PeopleWare N.V.
// SPDX-License-Identifier: Apache-2.0
import { z } from "zod";

export const CacheControlNoCacheSchema = z.literal("no-store").meta({
  id: "CacheControlNoCache",
  description:
    "Never cache this response, not in the browser, nor in intermediate caches.",
  examples: ["no-store"],
});
export type CacheControlNoCache = z.infer<typeof CacheControlNoCacheSchema>;
