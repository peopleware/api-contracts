// Copyright 2026 PeopleWare N.V.
// SPDX-License-Identifier: Apache-2.0
import { z } from "zod";

export const CommonResponseHeadersSchema = z
  .object({
    "x-flow-id": z.string(),
    "x-mode": z
      .string()
      .regex(
        new RegExp(
          "^production|simulation|automated-test-[\\da-fA-F]{8}-[\\da-fA-F]{4}-[\\da-fA-F]{4}-[\\da-fA-F]{4}-[\\da-fA-F]{12}|qa-\\d+|acceptance-\\d+|migration-\\d{4}-((0[13578]|10|12)-(0[1-9]|[1-2]\\d|30|31)|02-(0[1-9]|1\\d|2[0-9])|(0[469]|11)-(0[1-9]|[1-2]\\d|30))T([01]\\d|2[0-3])(:[0-5]\\d){2}Z|demo|dev-experiment$",
          "",
        ),
      ),
    "x-date": z
      .string()
      .regex(
        new RegExp(
          "^\\d{4}-(0[1-9]|1[0-2])-((0[1-9]|[1-2]\\d)|30|31)T(0\\d|1\\d|2[0-3]):([0-5]\\d):([0-5]\\d)\\.\\d{3,}Z$",
          "",
        ),
      ),
  })
  .passthrough()
  .meta({
    id: "CommonResponseHeaders",
    examples: [
      {
        "x-flow-id": "611e148e-734d-4fe6-ae9b-b3b61d66cd27",
        "x-date": "2020-01-23T15:22:39.212Z",
        "x-mode": "automated-test-80bc89de-10df-4aa4-ae91-4105b5e1f012",
        "x-service-build": "01234",
      },
    ],
  });
export type CommonResponseHeaders = z.infer<typeof CommonResponseHeadersSchema>;
