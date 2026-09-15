// Copyright 2026 PeopleWare N.V.
// SPDX-License-Identifier: Apache-2.0
import { z } from "zod";

export const EmailAddressSchema = z
  .email()
  .brand<"EmailAddress">()
  .meta({
    id: "EmailAddress",
    title: "Email address",
    description:
      "Email address accepted by the Zod email validator. Input is never transformed.",
    examples: ["person@example.com"],
  });
export type EmailAddress = z.infer<typeof EmailAddressSchema>;
