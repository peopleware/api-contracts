// Copyright 2026 PeopleWare N.V.
// SPDX-License-Identifier: Apache-2.0
import { expect, test } from "vitest";
import { EmailAddressSchema as schema } from "./email-address.schema.js";

test.each(["person@example.com", "first.last+tag@example.co.uk"])(
  "accepts email address %s",
  (value) => expect(schema.parse(value)).toBe(value),
);

test.each([
  "",
  "person",
  "person@",
  "@example.com",
  "person@example",
  "person @example.com",
  null,
  42,
])("rejects malformed %j", (value) =>
  expect(schema.safeParse(value).success).toBe(false),
);
