// Copyright 2026 PeopleWare N.V.
// SPDX-License-Identifier: Apache-2.0
import { z } from "zod";

export const LanguageSchema = z
  .string()
  .regex(new RegExp("^[a-z]{2}(-[A-Z]{2})?$", ""))
  .meta({
    id: "Language",
    description:
      "Language to be used in communication with the subject. The value is expressed according to\n[BCP 47](https://tools.ietf.org/html/bcp47), using an [ISO 639-1 alpha-2](https://en.wikipedia.org/wiki/ISO_639-1)\nlanguage code, optionally localised with the [ISO 3166 1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2)\n2-letter country code. See [Language localisation](https://en.wikipedia.org/wiki/Language_localisation).",
    examples: ["fr-BE", "nl"],
  });
export type Language = z.infer<typeof LanguageSchema>;
