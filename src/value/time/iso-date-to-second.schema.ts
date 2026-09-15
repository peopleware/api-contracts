// Copyright 2026 PeopleWare N.V.
// SPDX-License-Identifier: Apache-2.0
import { z } from "zod";

export const ISODateToSecondSchema = z
  .string()
  .refine((value) => value === value.trim(), { message: "Must be trimmed" })
  .regex(
    /^\d{4}-((0[13578]|10|12)-(0[1-9]|[1-2]\d|30|31)|02-(0[1-9]|1\d|2[0-9])|(0[469]|11)-(0[1-9]|[1-2]\d|30))T([01]\d|2[0-3])(:[0-5]\d){2}Z$/,
  )
  .brand<"ISODateToSecond">()
  .meta({
    id: "ISODateToSecond",
    examples: [
      "2012-01-01T18:21:06Z",
      "2012-02-29T18:21:06Z",
      "2012-12-31T23:59:59Z",
    ],
  });
export type ISODateToSecond = z.infer<typeof ISODateToSecondSchema>;
