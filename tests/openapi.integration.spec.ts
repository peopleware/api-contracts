// Copyright 2026 PeopleWare N.V.
// SPDX-License-Identifier: Apache-2.0
import { expect, test } from "vitest";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { parse } from "yaml";
import { createDocument } from "zod-openapi";
import { z } from "zod";
import {
  BelgianEnterpriseNumberSchema,
  BelgianSocialSecurityNumberSchema,
  BelgianVatNumberSchema,
  BelgianIbanSchema,
} from "@ppwcode/api-contracts/be";
import { TrimmedStringSchema } from "@ppwcode/api-contracts/string";
import { DateOnlySchema } from "@ppwcode/api-contracts/time";
test.each(["3.1.0", "3.2.0"] as const)(
  "generates OpenAPI %s using packaged schemas",
  (openapi) => {
    const document = createDocument({
      openapi,
      info: { title: "Contracts", version: "1.0.0" },
      paths: {
        "/example": {
          get: {
            responses: {
              "200": {
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
    expect(document.openapi).toBe(openapi);
    expect(Object.keys(document.components?.schemas ?? {}).sort()).toEqual([
      "BelgianEnterpriseNumber",
      "BelgianIban",
      "BelgianSocialSecurityNumber",
      "BelgianVatNumber",
      "DateOnly",
      "TrimmedString",
    ]);
    expect(document).toMatchSnapshot();
    if (openapi === "3.1.0") {
      const path = "@ppwcode/api-contracts/openapi-example.yaml";
      const resolved = createRequire(import.meta.url).resolve(path);
      expect(new URL(import.meta.resolve(path))).toEqual(
        new URL("../dist/openapi-example.yaml", import.meta.url),
      );
      expect(parse(readFileSync(resolved, "utf8"))).toEqual(document);
    }
  },
);
