// Copyright 2026 PeopleWare N.V.
// SPDX-License-Identifier: Apache-2.0
import { z } from "zod";

export const CanonicalURISchema = z
  .string()
  .min(1)
  .meta({
    id: "CanonicalURI",
    description:
      "A _canonical URI_ is the URI where are resource can be interacted with, without the scheme and\nauthority (see\n[RFC 3986 Uniform Resource Identifier (URI): Generic Syntax; 3. Syntax Components](https://www.rfc-editor.org/rfc/rfc3986#section-3)),\nand without the build number. By convention, the canonical URI’s first segment is the name of the service in which the\nURI resides, followed by the relative URI of the resource in the API of that service.",
    examples: ["/my-service/v1/y/abc"],
  });
export type CanonicalURI = z.infer<typeof CanonicalURISchema>;
