// Copyright 2026 PeopleWare N.V.
// SPDX-License-Identifier: Apache-2.0
import { z } from "zod";

export const SigedisRegistrantRegulationIdentificationSchema = z
  .object({
    registrant: z
      .string()
      .refine((value) => value === value.trim(), { message: "Must be trimmed" })
      .regex(new RegExp("^[01]\\d{9}$", "")),
    registrantId: z
      .string()
      .min(1)
      .max(60)
      .refine((value) => value === value.trim(), { message: "Must be trimmed" })
      .regex(new RegExp("^[-A-Za-z0-9./]{1,60}$", "")),
  })
  .passthrough()
  .meta({
    id: "SigedisRegistrantRegulationIdentification",
    description:
      "Unchangeable internal identification of a _regulation_ for communication with Sigedis.\n\nThis consists of the CRN of the OFP that governs the contract as `registrant`, and the `registrantId`,\nwhich is an identification of the contract unique within the OFP.\n\n_Regulation_ is a deliberately vague term. A sector contract is a _regulation_. For a MIPS contract, the _participations\nin the contract of each separate employer_ are considered separate _regulations_. Retirement contracts for a single\nemployer each are separate _regulations_.\n\nSigedis registrant regulation identifications have to be unique, and cannot change over the life of a regulation.\n\nRegulations are attributed a _Sigedis id_ by Sigedis, but this attribution is done after creation of a regulation,\nand its declaration with Sigedis. The Sigedis id therefor cannot be used as a business key. This value can, since the\norganization that manages the regulation can define it freely when the regulation is created. Once the Sigedis id is\nattributed, it can be used as identification in communication with Sigedis, but this value will continue to function in\nthat role as well.",
    examples: [
      { registrant: "1453834119", registrantId: "cunning-plan/covenant" },
    ],
  });
export type SigedisRegistrantRegulationIdentification = z.infer<
  typeof SigedisRegistrantRegulationIdentificationSchema
>;
