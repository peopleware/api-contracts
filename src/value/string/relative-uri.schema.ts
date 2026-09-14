// Copyright 2026 PeopleWare N.V.
// SPDX-License-Identifier: Apache-2.0
import { z } from "zod";

export const RelativeURISchema = z
  .string()
  .min(1)
  .meta({
    id: "RelativeURI",
    description: "relative URI",
    examples: ["../some/path", "some/other/path", "./meaningless/dot"],
  });
export type RelativeURI = z.infer<typeof RelativeURISchema>;
