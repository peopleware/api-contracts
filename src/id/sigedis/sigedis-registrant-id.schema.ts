// Copyright 2026 PeopleWare N.V.
// SPDX-License-Identifier: Apache-2.0
import { z } from "zod";

export const SigedisRegistrantIdSchema = z
  .string()
  .min(1)
  .max(60)
  .refine((value) => value === value.trim(), { message: "Must be trimmed" })
  .regex(new RegExp("^[-A-Za-z0-9./]{1,60}$", ""))
  .meta({
    id: "SigedisRegistrantId",
    description:
      "Unchangeable identification of a retirement regulation for communication with Sigedis, unique\nfor an OFP.\n\nSee `db2p_v3.11.8/Declaration/db2pBaseComponents_v3.xsd#FreeIdentificator`.",
    examples: ["cunning-plan/covenant"],
  });
export type SigedisRegistrantId = z.infer<typeof SigedisRegistrantIdSchema>;
