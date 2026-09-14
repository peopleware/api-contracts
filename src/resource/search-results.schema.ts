// Copyright 2026 PeopleWare N.V.
// SPDX-License-Identifier: Apache-2.0
import { z } from "zod";

export const SearchResultsSchema = z
  .object({
    structureVersion: z.number().int().min(1),
    results: z
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
      }),
    href: z
      .object({
        first: z.string().min(1),
        previous: z.string().min(1).optional(),
        next: z.string().min(1).optional(),
        last: z.string().min(1),
      })
      .passthrough(),
  })
  .passthrough()
  .meta({
    id: "SearchResults",
    examples: [
      {
        structureVersion: 1,
        results: [
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
        href: {
          first: "search?searchTerm=find%20me&page=1&per_page=27",
          previous: "search?searchTerm=find%20me&page=3&per_page=27",
          next: "search?searchTerm=find%20me&page=5&per_page=27",
          last: "search?searchTerm=find%20me&page=22&per_page=27",
        },
      },
      {
        structureVersion: 1,
        results: [],
        href: {
          first: "search?searchTerm=find%20me&page=1&per_page=27",
          last: "search?searchTerm=find%20me&page=1&per_page=27",
        },
      },
    ],
  });
export type SearchResults = z.infer<typeof SearchResultsSchema>;
