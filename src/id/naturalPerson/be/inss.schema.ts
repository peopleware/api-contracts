// Copyright 2026 PeopleWare N.V.
// SPDX-License-Identifier: Apache-2.0
import { z } from "zod";

export const INSSSchema = z
  .string()
  .regex(new RegExp("^\\d{11}$", ""))
  .meta({
    id: "INSS",
    description:
      "The Belgian INSS (en: Identification Number Social Security / nl: INSZ — Identificatienummer Sociale Zekerheid / fr:\nNISS — Numéro d'Identification Sécurité Sociale / de: ENSS — Erkennungsnummer der Sozialen Sicherheit) of the person\nsince `createdAt`. This is either the national registration number or the BIS-number. There is no formatting in this\nrepresentation.\n\n\nDue to Belgian labour law, every person who works in Belgium has an INSS.\n\n\nNote that the INSS of a person can change over time, but only 1 value is applicable at any time. This is the INSS\nthat we assume to be applicable for this person since `createdAt`.",
    examples: ["86081203314", "04031800277"],
  });
export type INSS = z.infer<typeof INSSSchema>;
