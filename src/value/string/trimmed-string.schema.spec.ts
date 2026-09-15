// Copyright 2026 PeopleWare N.V.
// SPDX-License-Identifier: Apache-2.0
import { expect, test } from "vitest";
import { TrimmedStringSchema } from "./trimmed-string.schema.js";
test.each(["a", "hello world", "a\nb", "é"])("preserves %j", (value) =>
  expect(TrimmedStringSchema.parse(value)).toBe(value),
);
test.each(["", " ", "\ta", "a\n", "\u00a0a", "a\ufeff", "\na", null, 1])(
  "rejects %j",
  (value) => expect(TrimmedStringSchema.safeParse(value).success).toBe(false),
);
