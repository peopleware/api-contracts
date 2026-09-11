// Copyright 2026 PeopleWare N.V.
// SPDX-License-Identifier: Apache-2.0
import { z } from "zod";

export const LocationSchema = z.string().meta({
  id: "Location",
  title: "location",
  description:
    "relative URI for the newly created (201) or requested (3xx) resource can be found",
  examples: ["../../some/other/location"],
});
export type Location = z.infer<typeof LocationSchema>;
