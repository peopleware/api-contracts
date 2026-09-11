// Copyright 2026 PeopleWare N.V.
// SPDX-License-Identifier: Apache-2.0
import { z } from "zod";

export const HistoryVersionSchema = z
  .object({
    createdAt: z
      .string()
      .regex(
        new RegExp(
          "^\\d{4}-(0[1-9]|1[0-2])-((0[1-9]|[1-2]\\d)|30|31)T(0\\d|1\\d|2[0-3]):([0-5]\\d):([0-5]\\d)\\.\\d{3,}Z$",
          "",
        ),
      ),
    href: z.string().min(1),
  })
  .passthrough()
  .meta({
    id: "HistoryVersion",
    examples: [
      {
        createdAt: "2022-08-04T18:48:44.003Z",
        href: ".?at=2022-08-04T18:48:44.003Z",
      },
      {
        createdAt: "2020-01-23T15:22:39.212Z",
        href: ".?at=2020-01-23T15:22:39.212Z",
      },
    ],
  });
export type HistoryVersion = z.infer<typeof HistoryVersionSchema>;

export const HistorySchema = z
  .object({
    structureVersion: z.number().int().min(1),
    versions: z.array(
      z
        .object({
          createdAt: z
            .string()
            .regex(
              new RegExp(
                "^\\d{4}-(0[1-9]|1[0-2])-((0[1-9]|[1-2]\\d)|30|31)T(0\\d|1\\d|2[0-3]):([0-5]\\d):([0-5]\\d)\\.\\d{3,}Z$",
                "",
              ),
            ),
          href: z.string().min(1),
        })
        .passthrough(),
    ),
  })
  .passthrough()
  .meta({
    id: "History",
    description:
      "A list of the different times at which the person's information was changed, ordered from most to least\nrecent, with links to retrieve that version of the personal information. Changes `< x-date` are included.\n\n\nThis call does not use paging, because we expect less than 50 changes to the personal information of a person\nover the person's lifetime.",
    examples: [
      {
        structureVersion: 1,
        versions: [
          {
            createdAt: "2022-08-04T18:48:44.003Z",
            href: ".?at=2022-08-04T18:48:44.003Z",
          },
          {
            createdAt: "2020-01-23T15:22:39.212Z",
            href: ".?at=2020-01-23T15:22:39.212Z",
          },
        ],
      },
    ],
  });
export type History = z.infer<typeof HistorySchema>;
