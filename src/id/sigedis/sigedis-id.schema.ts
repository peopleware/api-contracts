// Copyright 2026 PeopleWare N.V.
// SPDX-License-Identifier: Apache-2.0
import { z } from "zod";

export const SigedisIdSchema = z
  .string()
  .refine((value) => value === value.trim(), { message: "Must be trimmed" })
  .length(24)
  .regex(new RegExp("^\\d{24}$", ""))
  .meta({
    id: "SigedisId",
    description:
      "Belgian identification number of retirement _regulations_, attributed by Sigedis ([nl](https://sigedis.be/nl),\n[fr](https://sigedis.be/fr)).\n\nThere is no formatting in this representation. In human communication, the Sigedis id is represented as 6 groups of 4\ndigits (total 24), separated by `'-'` (/^(\\d{4}-){5}\\d{4}$/, e.g. `'1234-5678-9012-3456-7890-1234'`).\n\n_Regulation_ is a deliberately vague term. A sector retirement contract is a _regulation_, and is attributed a Sigedis\nid. For a MIPS retirement contract, the _participations in the contract of each separate employer_ are considered\nseparate _regulations_ that are attributed each their own Sigedis id. Retirement contracts for a single employer each\nare separate _regulations_, and have a separate unique Sigdis id.\n\nSigedis ids are not known yet when a regulation is created, and thus cannot function as business key. After creation of\na _regulation_ it is _declared_ with Sigedis, and we receive a Sigedis id in response.\n\nSigedis ids are unique. Sigedis ids do not change over the life of a regulation.",
    examples: ["123456789012345678901234"],
  });
export type SigedisId = z.infer<typeof SigedisIdSchema>;
