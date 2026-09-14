// Copyright 2026 PeopleWare N.V.
// SPDX-License-Identifier: Apache-2.0
import { z } from "zod";

export const SearchDocumentContentBase2Schema = z
  .object({
    structureVersion: z.literal(2),
    discriminator: z
      .string()
      .refine((value) => value === value.trim(), { message: "Must be trimmed" })
      .min(1)
      .regex(new RegExp("^([-a-z0-9]+)\\/([-a-z0-9/]+)$", "")),
  })
  .passthrough()
  .meta({
    id: "SearchDocumentContentBase2",
    description:
      "The resource's search document with the most up-to-date information, i.e., up-to-date up until, but not including,\n`x-date`.\n\nThis is a contract between this service and clients of the search service. Specific properties are added for different\n`discriminators`. When returned by the search service, the property `href` is added. This is the canonical URI of\nthe found resource, including an `at` query parameter, that refers to the precise version of the found resource that\nwas indexed.",
    examples: [
      { structureVersion: 2, discriminator: "my-service/some-resource" },
    ],
  });
export type SearchDocumentContentBase2 = z.infer<
  typeof SearchDocumentContentBase2Schema
>;

export const SearchResultBase2Schema = z
  .object({
    structureVersion: z.literal(2),
    discriminator: z
      .string()
      .refine((value) => value === value.trim(), { message: "Must be trimmed" })
      .min(1)
      .regex(new RegExp("^([-a-z0-9]+)\\/([-a-z0-9/]+)$", "")),
    href: z.string().min(1),
  })
  .passthrough()
  .meta({
    id: "SearchResultBase2",
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
export type SearchResultBase2 = z.infer<typeof SearchResultBase2Schema>;
