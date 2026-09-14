// Copyright 2026 PeopleWare N.V.
// SPDX-License-Identifier: Apache-2.0
import { z } from "zod";

export const SearchDocumentBaseSchema = z
  .object({
    structureVersion: z.number().int().min(1),
    href: z.string().min(1),
    discriminator: z
      .string()
      .refine((value) => value === value.trim(), { message: "Must be trimmed" })
      .min(1)
      .regex(new RegExp("^([-a-z0-9]+)\\/([-a-z0-9/]+)$", "")),
  })
  .passthrough()
  .meta({
    id: "SearchDocumentBase",
    description:
      "The resource's search document with the most up-to-date information, i.e., up-to-date up until, but not including, `x-date`.",
    examples: [
      {
        structureVersion: 1,
        discriminator: "service-name/type-name",
        href: "/service-name/service_version/type-name/type_unique_identifier?at=2021-01-19T17:14:18.482Z",
      },
    ],
  });
export type SearchDocumentBase = z.infer<typeof SearchDocumentBaseSchema>;
