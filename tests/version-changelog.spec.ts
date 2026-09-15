// Copyright 2026 PeopleWare N.V.
// SPDX-License-Identifier: Apache-2.0
import { spawnSync } from "node:child_process";
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { expect, test } from "vitest";

const script = fileURLToPath(
  new URL("../scripts/version.mjs", import.meta.url),
);

function runVersionScript(changelog: string) {
  const cwd = mkdtempSync(join(tmpdir(), "api-contracts-version-"));
  writeFileSync(
    join(cwd, "package.json"),
    JSON.stringify({ version: "1.0.0" }),
  );
  writeFileSync(join(cwd, "CHANGELOG.md"), changelog);
  const gitInit = spawnSync("git", ["init", "--quiet"], {
    cwd,
    encoding: "utf8",
  });
  if (gitInit.status !== 0) throw new Error(gitInit.stderr);
  const result = spawnSync(process.execPath, [script], {
    cwd,
    env: process.env,
    encoding: "utf8",
  });
  const updatedChangelog = readFileSync(join(cwd, "CHANGELOG.md"), "utf8");
  const stagedFiles = spawnSync("git", ["diff", "--cached", "--name-only"], {
    cwd,
    encoding: "utf8",
  })
    .stdout.trim()
    .split(/\r?\n/)
    .filter(Boolean);
  rmSync(cwd, { recursive: true, force: true });
  return { result, stagedFiles, updatedChangelog };
}

test("promotes the unreleased section and preserves its release notes", () => {
  const { result, stagedFiles, updatedChangelog } = runVersionScript(
    "# Changelog\r\n\r\n## Unreleased\r\n\r\n### Features\r\n\r\n- New contracts.\r\n\r\n## 0.2.0\r\n",
  );

  expect(result.status).toBe(0);
  expect(updatedChangelog).toContain("## 1.0.0\r\n");
  expect(updatedChangelog).not.toContain("## Unreleased");
  expect(updatedChangelog).toContain("- New contracts.\r\n");
  expect(stagedFiles).toEqual(["CHANGELOG.md"]);
});

test("rejects an unreleased section when the target version already exists", () => {
  const { result } = runVersionScript(
    "## Unreleased\n- New changes.\n\n## 1.0.0\n- Existing release.\n",
  );

  expect(result.status).not.toBe(0);
  expect(result.stderr).toContain("already contains a ## 1.0.0 section");
});

test("validates an existing version section when no unreleased section exists", () => {
  const changelog = "## 1.0.0\n- Existing release.\n";
  const { result, updatedChangelog } = runVersionScript(changelog);

  expect(result.status).toBe(0);
  expect(updatedChangelog).toBe(changelog);
});
