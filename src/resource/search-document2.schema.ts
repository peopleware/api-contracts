// Copyright 2026 PeopleWare N.V.
// SPDX-License-Identifier: Apache-2.0
import { z } from "zod";

export const SearchDocument2Schema = z
  .object({
    structureVersion: z.literal(2),
    toOneAssociations: z
      .array(z.string().min(1))
      .refine((value) => new Set(value).size === value.length, {
        message: "Array items must be unique",
      }),
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
    embedded: z.object({}).passthrough(),
    content: z
      .object({
        structureVersion: z.literal(2),
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
    id: "SearchDocument2",
    description:
      "Returned as `search-document` by a service for a parent resource. A _search index document_ is created\nin the search index based on this information. The search service retrieves the information from the search index.\n\nIt contains strings for which the resource this is a search document for can be found by, and the `content` that is to\nbe sent to the client (more or less). The resource this is a search document for can be found with an exact match on the\nstrings in `exact` or `toOneAssociations`, and by a fuzzy search on the strings in `fuzzy`. Some strings might\nappear in both.\n\n`toOneAssociations`, `exact`, and `fuzzy` may be empty, but not all of them.\n\nSearch results can be limited to selected types with an exact match on `content.discriminator`. The found resource\ncan be retrieved in the indexed version at `href`.",
    examples: [
      {
        structureVersion: 2,
        toOneAssociations: ["/some-service/v1/x/123", "/my-service/v1/y/abc"],
        exact: ["0123456789", "9876543210"],
        fuzzy: ["find me", "if you can", "9876543210"],
        content: {
          structureVersion: 2,
          discriminator: "my-service/some-resource",
          extraData: "extra",
          moreInfo: { aDetail: 2, anotherDetail: true },
          aReference: "/my-service/a/canonical/uri",
        },
        embedded: { x: "/your-service/v1/x/123" },
      },
      {
        structureVersion: 2,
        toOneAssociations: ["/some-service/v1/x/123"],
        exact: [],
        fuzzy: [],
        content: {
          structureVersion: 2,
          discriminator: "my-service/some-resource",
          extraData: "extra",
          moreInfo: { aDetail: 2, anotherDetail: true },
          aReference: "/my-service/a/canonical/uri",
        },
        embedded: { x: "/your-service/v1/x/123" },
      },
      {
        structureVersion: 2,
        toOneAssociations: [],
        exact: ["0123456789"],
        fuzzy: [],
        content: {
          structureVersion: 2,
          discriminator: "my-service/some-resource",
          extraData: "extra",
          moreInfo: { aDetail: 2, anotherDetail: true },
          aReference: "/my-service/a/canonical/uri",
        },
        embedded: { x: "/your-service/v1/x/123" },
      },
      {
        structureVersion: 2,
        toOneAssociations: [],
        exact: [],
        fuzzy: ["find me"],
        content: {
          structureVersion: 2,
          discriminator: "my-service/some-resource",
          extraData: "extra",
          moreInfo: { aDetail: 2, anotherDetail: true },
          aReference: "/my-service/a/canonical/uri",
        },
        embedded: { x: "/your-service/v1/x/123" },
      },
    ],
  });
export type SearchDocument2 = z.infer<typeof SearchDocument2Schema>;
