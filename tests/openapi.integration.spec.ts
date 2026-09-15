// Copyright 2026 PeopleWare N.V.
// SPDX-License-Identifier: Apache-2.0
import { expect, test } from "vitest";
import { readFileSync, readdirSync } from "node:fs";
import { createRequire } from "node:module";
import { parse } from "yaml";
import { createDocument } from "zod-openapi";
import { z } from "zod";
import { schemas } from "./all-schemas.js";

const schemaProperties = Object.fromEntries(
  schemas.map((schema) => [schema.meta()!.id!, schema]),
);
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
                    schema: z.object(schemaProperties),
                  },
                },
              },
            },
          },
        },
      },
    });
    expect(document.openapi).toBe(openapi);
    expect(Object.keys(document.components?.schemas ?? {}).sort()).toEqual(
      schemas.map((schema) => schema.meta()!.id!).sort(),
    );
    expect(document).toMatchSnapshot();
    if (openapi === "3.1.0") {
      const path = "@ppwcode/api-contracts/openapi-example.yaml";
      const resolved = createRequire(import.meta.url).resolve(path);
      expect(new URL(import.meta.resolve(path))).toEqual(
        new URL("../dist/openapi-example.yaml", import.meta.url),
      );
      expect(parse(readFileSync(resolved, "utf8")).openapi).toBe("3.1.0");
    }
  },
);

test("includes every packaged schema in the OpenAPI example", () => {
  const packagedSchemaIds = readdirSync(
    new URL("../dist/schemas/", import.meta.url),
  )
    .filter((file) => file.endsWith(".yaml"))
    .map((file) => file.slice(0, -".yaml".length))
    .sort();
  const openapiExample = parse(
    readFileSync(
      new URL("../dist/openapi-example.yaml", import.meta.url),
      "utf8",
    ),
  );

  expect(Object.keys(openapiExample.components?.schemas ?? {}).sort()).toEqual(
    packagedSchemaIds,
  );
});
