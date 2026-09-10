// Copyright 2026 PeopleWare N.V.
// SPDX-License-Identifier: Apache-2.0
import { spawnSync } from "node:child_process";
import { cpSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { expect, test } from "vitest";

const root = fileURLToPath(new URL("../", import.meta.url));

test.each(["valid", "additional schema", "unexpected file"])(
  "validates the packed archive: %s",
  (scenario) => {
    const cwd = mkdtempSync(join(tmpdir(), "api-contracts-pack-"));
    try {
      for (const path of [
        "dist",
        "LICENSE",
        "NOTICE",
        "README.md",
        "package.json",
      ])
        cpSync(join(root, path), join(cwd, path), { recursive: true });

      if (scenario === "additional schema")
        writeFileSync(
          join(cwd, "dist/schemas/AdditionalSchema.yaml"),
          "type: string\n",
        );
      if (scenario === "unexpected file")
        writeFileSync(
          join(cwd, "dist/schemas/Unexpected.txt"),
          "unexpected: true",
        );

      const result = spawnSync(
        process.execPath,
        [join(root, "scripts/pack.mjs")],
        {
          cwd,
          env: {
            ...Object.fromEntries(
              Object.entries(process.env).filter(
                ([key]) => key.toLowerCase() !== "npm_config_cache",
              ),
            ),
            npm_config_cache: join(cwd, ".npm-cache"),
          },
          encoding: "utf8",
          timeout: 30000,
        },
      );
      expect(result.error).toBeUndefined();
      if (scenario !== "unexpected file") {
        expect(result.status, result.stderr).toBe(0);
        expect(JSON.parse(result.stdout).files).toContainEqual(
          expect.objectContaining({
            path:
              scenario === "additional schema"
                ? "dist/schemas/AdditionalSchema.yaml"
                : "dist/schemas/BelgianEnterpriseNumber.yaml",
          }),
        );
      } else {
        expect(result.status).toBe(1);
        expect(result.stderr).toContain(
          "Unexpected archive file: dist/schemas/Unexpected.txt",
        );
      }
    } finally {
      rmSync(cwd, { recursive: true, force: true });
    }
  },
  30000,
);
