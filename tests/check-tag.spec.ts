// Copyright 2026 PeopleWare N.V.
// SPDX-License-Identifier: Apache-2.0
import { spawnSync } from "node:child_process";
import { mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { expect, test } from "vitest";

const script = fileURLToPath(
  new URL("../scripts/check-tag.mjs", import.meta.url),
);

function checkTag(changelog: string | undefined, tag = "v1.0.0") {
  const cwd = mkdtempSync(join(tmpdir(), "api-contracts-tag-"));
  try {
    writeFileSync(
      join(cwd, "package.json"),
      JSON.stringify({ version: "1.0.0" }),
    );
    if (changelog !== undefined)
      writeFileSync(join(cwd, "CHANGELOG.md"), changelog);
    return spawnSync(process.execPath, [script], {
      cwd,
      env: { ...process.env, BITBUCKET_TAG: tag },
      encoding: "utf8",
    });
  } finally {
    rmSync(cwd, { recursive: true, force: true });
  }
}

test.each(["", " (2026-09-08)", " (unreleased)"])(
  "accepts a matching version with a description and suffix %j",
  (suffix) => {
    expect(
      checkTag(`## 1.0.0${suffix}\r\n\r\n### Added\r\n- New contracts.\r\n`)
        .status,
    ).toBe(0);
  },
);

test.each([
  "## 1.0.1\n- Other release.\n",
  "## 1.0.0-beta.1\n- Prerelease.\n",
  "## Unreleased\n- Prepare 1.0.0.\n",
  "<!-- ## 1.0.0\n- Hidden entry.\n -->",
])("rejects a missing matching version: %j", (changelog) => {
  const result = checkTag(changelog);
  expect(result.status).not.toBe(0);
  expect(result.stderr).toContain(
    "CHANGELOG.md must contain a ## 1.0.0 section",
  );
});

test.each([
  "## 1.0.0\n",
  "## 1.0.0\n\n## 0.9.0\n- Earlier changes.\n",
  "## 1.0.0\n### Added\n<!-- TODO: describe changes -->\n",
])("rejects an empty description: %j", (changelog) => {
  const result = checkTag(changelog);
  expect(result.status).not.toBe(0);
  expect(result.stderr).toContain(
    "CHANGELOG.md must describe the changes for 1.0.0",
  );
});

test("rejects a missing changelog file", () => {
  const result = checkTag(undefined);
  expect(result.status).not.toBe(0);
  expect(result.stderr).toContain("CHANGELOG.md");
});

test("still rejects a tag that differs from the package version", () => {
  const result = checkTag("## 1.0.0\n- New contracts.\n", "v1.0.1");
  expect(result.status).not.toBe(0);
  expect(result.stderr).toContain("BITBUCKET_TAG must exactly match v1.0.0");
});
