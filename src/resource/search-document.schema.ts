// Copyright 2026 PeopleWare N.V.
// SPDX-License-Identifier: Apache-2.0
import { z } from "zod";

export const SearchDocumentSchema = z
  .object({
    structureVersion: z.number().int().min(1),
    exact: z
      .array(
        z
          .string()
          .refine((value) => value === value.trim(), {
            message: "Must be trimmed",
          })
          .min(1),
      )
      .refine((value) => new Set(value).size === value.length, {
        message: "Array items must be unique",
      }),
    fuzzy: z
      .array(
        z
          .string()
          .refine((value) => value === value.trim(), {
            message: "Must be trimmed",
          })
          .min(1),
      )
      .refine((value) => new Set(value).size === value.length, {
        message: "Array items must be unique",
      }),
    content: z
      .object({
        structureVersion: z.number().int().min(1),
        href: z.string().min(1),
        discriminator: z
          .string()
          .refine((value) => value === value.trim(), {
            message: "Must be trimmed",
          })
          .min(1)
          .regex(new RegExp("^([-a-z0-9]+)\\/([-a-z0-9/]+)$", "")),
      })
      .passthrough(),
  })
  .passthrough()
  .meta({
    id: "SearchDocument",
    description:
      "Wrapper around the search result (which is returned to the client when the resource is found), with\ninformation for a search index.\n\nIt contains strings for which the resource this is a search document for can be found by, and the `content` that is to\nbe sent to the client. The resource this is a search document for can be found with an exact match on the strings in\n`exact`, and by a fuzzy search on the strings in `fuzzy`. Some strings might appear in both.\n\n`fuzzy` or `exact` may be empty, but not both.\n\nSearch results can be limited to selected types with an exact match on `content.discriminator`. The found resource\ncan be retrieved in the indexed version at `content.href`.",
    examples: [
      {
        structureVersion: 1,
        exact: ["0123456789", "9876543210"],
        fuzzy: ["find me", "if you can", "9876543210"],
        content: {
          structureVersion: 1,
          discriminator: "service-name/type-name",
          href: "/service-name/service_version/type-name/type_unique_identifier?at=2021-01-19T17:14:18.482Z",
        },
      },
    ],
  });
export type SearchDocument = z.infer<typeof SearchDocumentSchema>;
