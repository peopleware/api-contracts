// Copyright 2026 PeopleWare N.V.
// SPDX-License-Identifier: Apache-2.0
import { writeFile } from "node:fs/promises";
import { URL } from "node:url";
import { stringify } from "yaml";
import { z } from "zod";
import { createDocument } from "zod-openapi";
import {
  BelgianEnterpriseNumberSchema,
  BelgianSocialSecurityNumberSchema,
  BelgianVatNumberSchema,
  BelgianIbanSchema,
} from "@ppwcode/api-contracts/be";
import { TrimmedStringSchema } from "@ppwcode/api-contracts/string";
import { DateOnlySchema } from "@ppwcode/api-contracts/time";

const document = createDocument({
  openapi: "3.1.0",
  info: { title: "Contracts", version: "1.0.0" },
  paths: {
    "/example": {
      get: {
        responses: {
          200: {
            description: "Example",
            content: {
              "application/json": {
                schema: z.object({
                  name: TrimmedStringSchema,
                  date: DateOnlySchema,
                  enterprise: BelgianEnterpriseNumberSchema,
                  niss: BelgianSocialSecurityNumberSchema,
                  vat: BelgianVatNumberSchema,
                  iban: BelgianIbanSchema,
                }),
              },
            },
          },
        },
      },
    },
  },
});

await writeFile(
  new URL("../dist/openapi-example.yaml", import.meta.url),
  "# Copyright 2026 PeopleWare N.V.\n# SPDX-License-Identifier: Apache-2.0\n" +
    stringify(document),
);
