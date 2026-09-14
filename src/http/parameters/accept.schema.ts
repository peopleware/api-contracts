// Copyright 2026 PeopleWare N.V.
// SPDX-License-Identifier: Apache-2.0
import { z } from "zod";

export const AcceptSchema = z
  .string()
  .regex(new RegExp("([^-;]*)(?:-([^;]*))?(?:;q=([0-9].[0-9]))?", ""))
  .meta({
    id: "Accept",
    title: "accept",
    description:
      "request header that says what mime-types the client wants to be returned, where `q` expresses the preferences",
    examples: [
      "text/html, application/xhtml+xml, application/xml;q=0.9, */*;q=0.8",
      "application/json",
    ],
  });
export type Accept = z.infer<typeof AcceptSchema>;
