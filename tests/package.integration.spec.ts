// Copyright 2026 PeopleWare N.V.
// SPDX-License-Identifier: Apache-2.0
import { createRequire } from "node:module";
import { readFileSync, readdirSync } from "node:fs";
import { expect, test } from "vitest";
import { parse } from "yaml";
import { z } from "zod";

const require = createRequire(import.meta.url);
test("exposes YAML for every canonical schema through package subpaths", async () => {
  const ids = new Set<string>();
  for (const category of ["string", "time", "be", "money"]) {
    const exports = await import(
      /* @vite-ignore */ `@ppwcode/api-contracts/${category}`
    );
    for (const schema of Object.values(exports) as z.ZodType[]) {
      const id = schema.meta()!.id!;
      ids.add(id);
      const path = `@ppwcode/api-contracts/schemas/${id}.yaml`;
      const resolved = require.resolve(path);
      expect(new URL(import.meta.resolve(path))).toEqual(
        new URL(`../dist/schemas/${id}.yaml`, import.meta.url),
      );
      expect(parse(readFileSync(resolved, "utf8"))).toEqual(
        z.toJSONSchema(schema, { target: "draft-2020-12" }),
      );
    }
  }
  expect(
    readdirSync(new URL("../dist/schemas/", import.meta.url)).sort(),
  ).toEqual([...ids].map((id) => `${id}.yaml`).sort());
});

test.each(["string", "time", "be", "money"])(
  "loads %s through ESM and CommonJS",
  async (category) => {
    const esm = await import(
      /* @vite-ignore */ `@ppwcode/api-contracts/${category}`
    );
    const cjs = require(`@ppwcode/api-contracts/${category}`);
    expect(Object.keys(esm).sort()).toEqual(Object.keys(cjs).sort());
    for (const schema of Object.values(cjs) as {
      parse: (value: unknown) => unknown;
      meta: () => { examples: unknown[] };
    }[]) {
      for (const value of schema.meta().examples)
        expect(schema.parse(value)).toBe(value);
    }
  },
);

test("does not export a root entrypoint", () => {
  expect(() => require("@ppwcode/api-contracts")).toThrow(
    expect.objectContaining({ code: "ERR_PACKAGE_PATH_NOT_EXPORTED" }),
  );
});

test.each([
  "/number",
  "/money/_util/iban-country-patterns",
  "/personalia",
  "/_util/modulo-97",
  "/dist/be/index.js",
])("cannot load unbuilt path %s", (path) => {
  expect(() => require(`@ppwcode/api-contracts${path}`)).toThrow(
    expect.objectContaining({ code: "MODULE_NOT_FOUND" }),
  );
});

test("exports package metadata", () => {
  expect(require("@ppwcode/api-contracts/package.json").name).toBe(
    "@ppwcode/api-contracts",
  );
});
