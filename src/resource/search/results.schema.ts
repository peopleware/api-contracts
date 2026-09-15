// Copyright 2026 PeopleWare N.V.
// SPDX-License-Identifier: Apache-2.0
import { z } from "zod";

export const MixedSearchResultsSchema = z
  .object({
    discriminator: z
      .string()
      .refine((value) => value === value.trim(), { message: "Must be trimmed" })
      .min(1)
      .regex(new RegExp("^([-a-z0-9]+)\\/([-a-z0-9/]+)$", "")),
    href: z.string().min(1),
    structureVersion: z.number().int().min(1),
  })
  .passthrough()
  .meta({
    id: "MixedSearchResults",
    description:
      "The resource's search document with the most up-to-date information, i.e., up-to-date up until, but not including,\n`x-date`.\n\nThis is a contract between this service and clients of the search service. Specific properties are added for different\n`discriminators`. When returned by the search service, the property `href` is added. This is the canonical URI of\nthe found resource, including an `at` query parameter, that refers to the precise version of the found resource that\nwas indexed.",
    examples: [
      {
        structureVersion: 2,
        discriminator: "my-service/some-resource",
        href: "/my-service/v6/some-resource/564845?at=2021-01-19T17:14:18.482558Z",
      },
    ],
  });
export type MixedSearchResults = z.infer<typeof MixedSearchResultsSchema>;

export const ResultsSchema = z
  .array(
    z
      .object({
        discriminator: z
          .string()
          .refine((value) => value === value.trim(), {
            message: "Must be trimmed",
          })
          .min(1)
          .regex(new RegExp("^([-a-z0-9]+)\\/([-a-z0-9/]+)$", "")),
        href: z.string().min(1),
        structureVersion: z.number().int().min(1),
      })
      .passthrough(),
  )
  .max(100)
  .refine((value) => new Set(value).size === value.length, {
    message: "Array items must be unique",
  })
  .meta({
    id: "Results",
    description:
      "List of items that match the search, ordered by relevance. The list has `per_page` or fewer items.\n\nItems identify the type of resource they represent (`discriminator`), a link to the indexed version of the found\nresource (`href`), and information for humans to recognize the found resource. The entries can have different\n`structureVersions`, even for the same `discriminator`. The precise structure of each entry, beyond the base\nproperties, is a contract between the service in which the resource resides and clients of the search service. This is\nopaque to the search service, which acts as intermediate.\n\nThe list has the requested number of items, except for the first and last page. The `href.first` page can be empty,\nor have fewer elements than `per_page`. The `href.last` page can have fewer reference in the response than\n`per_page`, but cannot be empty. Other pages have exactly the `per_page` as number of items.",
    examples: [
      [
        {
          structureVersion: 1,
          discriminator: "companies/company",
          href: "/companies/v1/company/5646897945?at=2021-01-19T17:14:18.482Z",
          crn: "5646897945",
          name: { nl: "Het Bedrijf", fr: "La Compagnie" },
        },
        {
          structureVersion: 2,
          discriminator: "persons/person",
          href: "/persons/v1/person/6908390?at=2021-01-19T17:14:18.482Z",
          inss: "96110505648",
          firstName: "Anna",
          lastName: "Van Deuren",
        },
      ],
      [],
    ],
  });
export type Results = z.infer<typeof ResultsSchema>;
