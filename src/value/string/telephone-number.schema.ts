// Copyright 2026 PeopleWare N.V.
// SPDX-License-Identifier: Apache-2.0
import { z } from "zod";

/**
 * Accepts canonical E.164 numbers and Belgian local numbers without separators.
 * E.164 numbers contain 2 to 15 digits after `+`; local numbers contain 9 or
 * 10 digits and start with `0`.
 */
export const TelephoneNumberSchema = z
  .string()
  .regex(/^(?:\+[1-9][0-9]{1,14}|0[0-9]{8,9})$/u)
  .brand<"TelephoneNumber">()
  .meta({
    id: "TelephoneNumber",
    title: "Telephone number",
    description:
      "Telephone number in canonical E.164 format (+ followed by 2 to 15 digits) or as a 9- or 10-digit local number beginning with 0. Input is never transformed.",
    examples: ["+32479394232", "033858885", "0479394232"],
  });
export type TelephoneNumber = z.infer<typeof TelephoneNumberSchema>;
