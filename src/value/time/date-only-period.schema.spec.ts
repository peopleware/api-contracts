// Copyright 2026 PeopleWare N.V.
// SPDX-License-Identifier: Apache-2.0
import { expect, test } from "vitest";
import {
  DateOnlyIntervalSchema,
  DateOnlyPeriodSchema,
  DayDateIntervalSchema,
} from "./date-only-period.schema.js";

test("interval names are aliases of DateOnlyPeriod", () => {
  expect(DateOnlyIntervalSchema).toBe(DateOnlyPeriodSchema);
  expect(DayDateIntervalSchema).toBe(DateOnlyPeriodSchema);
});

test.each([
  { start: "2024-02-29", end: "2024-03-01" },
  { start: "2024-02-29" },
])("accepts %j", (value) =>
  expect(DateOnlyPeriodSchema.parse(value)).toEqual(value),
);

test("rejects impossible calendar dates", () => {
  expect(DateOnlyPeriodSchema.safeParse({ start: "2023-02-29" }).success).toBe(
    false,
  );
});
