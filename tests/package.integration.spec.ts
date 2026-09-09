// Copyright 2026 PeopleWare N.V.
// SPDX-License-Identifier: Apache-2.0
import { createRequire } from "node:module";
import { expect, test } from "vitest";

const require = createRequire(import.meta.url);
test.each(["string", "time", "be"])(
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
  "/money",
  "/personalia",
  "/be/internal/modulo-97",
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
