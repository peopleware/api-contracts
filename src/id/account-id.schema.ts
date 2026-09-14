// Copyright 2026 PeopleWare N.V.
// SPDX-License-Identifier: Apache-2.0
import { z } from "zod";

export const AccountIdSchema = z.string().meta({
  id: "AccountId",
  description:
    "Opaque id of an account.\n\n\nFor manual interactions, the account refers to one specific natural person. The above implies that we have to be able\nto know from the value of this field as precise as possible to which organisation that natural person belongs. When we\nautomatically proces data input files, we need to make sure that we use a different account per data source, and not\none general account representing the overal import process.",
  examples: ["y7_56b.953WP9"],
});
export type AccountId = z.infer<typeof AccountIdSchema>;
