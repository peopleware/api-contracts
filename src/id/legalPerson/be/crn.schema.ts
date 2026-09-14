// Copyright 2026 PeopleWare N.V.
// SPDX-License-Identifier: Apache-2.0
import { z } from "zod";

export const CRNSchema = z
  .string()
  .refine((value) => value === value.trim(), { message: "Must be trimmed" })
  .regex(new RegExp("^[01]\\d{9}$", ""))
  .meta({
    id: "CRN",
    description:
      "Company Registration Number: Belgian identification of organizations.\n\nThe [_company registration\nnumber_](https://economie.fgov.be/en/themes/enterprises/crossroads-bank-enterprises/registration-crossroads-bank) (nl:\n[_ondernemingsnummer_](https://economie.fgov.be/nl/themas/ondernemingen/kruispuntbank-van/inschrijving-de-kruispuntbank),\nfr: [_numéro\nd’entreprise_](https://economie.fgov.be/fr/themes/entreprises/banque-carrefour-des/inscription-la-banque), de:\n[_Unternehmensnummer_](https://economie.fgov.be/de/themen/unternehmen/zentrale-datenbank-der/eintragung-die-zdu)) of\nan organization is handed out by the Belgian government, and uniquely identifies an organization. It is impossible,\ne.g., to legally do business in Belgium, or employ people, if the organization does not have a company registration\nnumber. The company registration number is also used as Belgian VAT identifier (“VAT Number”).\n\nThe company registration number of an organization never changes. If you encounter an organization with a different\ncompany registration number, it legally is a different organization. If you encounter an organization with the same\ncompany registration number, it legally is the same organization, although its name, address, etcetera, might have\nchanged.\n\nBecause this identifier is in practice handed out by the Belgian [_Crossroads Bank for\nEnterprises_](https://economie.fgov.be/en/themes/enterprises/crossroads-bank-enterprises) (CBE) (nl: [_Kruispuntbank\nvan Ondernemingen_](https://economie.fgov.be/nl/themas/ondernemingen/kruispuntbank-van) (KBO), fr: [_Banque-Carrefour\ndes Entreprises_](https://economie.fgov.be/fr/themes/entreprises/banque-carrefour-des) (BCE),\n de: [Zentrale Datenbank der Unternehmen](https://economie.fgov.be/de/themen/unternehmen/zentrale-datenbank-der)\n(ZDU)), it is often referred to as “CBE number” / “KBO nummer” / “numéro BCE” / “ZDU nummer”.\n\nThere is no formatting in this representation.\n\nA company registration number starts with `0` or `1` and consists of 8 numbers, followed by a modulo 97 checksum\n(10 numbers in total).",
    examples: ["0453834195", "1453834119", "1234567401"],
  });
export type CRN = z.infer<typeof CRNSchema>;
