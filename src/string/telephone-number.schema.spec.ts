// Copyright 2026 PeopleWare N.V.
// SPDX-License-Identifier: Apache-2.0
import { expect, test } from "vitest";
import { TelephoneNumberSchema as schema } from "./telephone-number.schema.js";

test.each(["+12", "+14155552671", "+32479394232", "+999999999999999"])(
  "accepts E.164 telephone number %s",
  (value) => expect(schema.parse(value)).toBe(value),
);
test.each(["033858885", "0479394232"])(
  "accepts local telephone number %s",
  (value) => expect(schema.parse(value)).toBe(value),
);
test.each([
  "",
  " ",
  "+",
  "+0",
  "+0123456789",
  "+32479394232 ",
  "+3247939423-2",
  "+1234567890123456",
  "33858885",
  "03385888",
  "03385888555",
  "0479 394 232",
  null,
  32479394232,
])("rejects malformed %j", (value) =>
  expect(schema.safeParse(value).success).toBe(false),
);
