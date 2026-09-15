// Copyright 2026 PeopleWare N.V.
// SPDX-License-Identifier: Apache-2.0
import { z } from "zod";

export const CanonicalURIWithKnowledgeTimeSchema = z
  .string()
  .min(1)
  .meta({
    id: "CanonicalURIWithKnowledgeTime",
    description:
      "A _canonical URI_ is the URI where are resource can be interacted with, without the scheme and\nauthority (see\n[RFC 3986 Uniform Resource Identifier (URI): Generic Syntax; 3. Syntax Components](https://www.rfc-editor.org/rfc/rfc3986#section-3)),\nand without the build number. By convention, the canonical URI’s first segment is the name of the service in which the\nURI resides, followed by the relative URI of the resource in the API of that service.\n\nThe URI has an `at` qyuery parameter, expressing the knowledge time for which the service should return the\nresource. The value must be a moment in time, expressed as ISO-8601 in UTC ('Z'), to ms precision or more precise\n(should be μs precision).",
    examples: ["/my-service/v1/y/abc?at=2020-01-23T15:22:39.254888Z"],
  });
export type CanonicalURIWithKnowledgeTime = z.infer<
  typeof CanonicalURIWithKnowledgeTimeSchema
>;
