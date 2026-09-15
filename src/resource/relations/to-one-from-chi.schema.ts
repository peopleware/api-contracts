// Copyright 2026 PeopleWare N.V.
// SPDX-License-Identifier: Apache-2.0
import { z } from "zod";

export const ToOneFromChiSchema = z
  .string()
  .min(1)
  .brand<"ToOneFromChi">()
  .meta({
    id: "ToOneFromChi",
    description:
      "relative URI at which the associated resource can be retrieved, with `at` equal to the `createdAt` of this resource",
    examples: ["../../../associated/1549873215?at=2022-08-18T14:57:39.732Z"],
  });
export type ToOneFromChi = z.infer<typeof ToOneFromChiSchema>;
