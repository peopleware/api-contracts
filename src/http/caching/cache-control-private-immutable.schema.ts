// Copyright 2026 PeopleWare N.V.
// SPDX-License-Identifier: Apache-2.0
import { z } from "zod";

export const CacheControlPrivateImmutableSchema = z
  .literal("private, max-age=31536000, immutable")
  .meta({
    id: "CacheControlPrivateImmutable",
    description:
      'Cache the resource infinitely, only in the end-user\'s browser.\n\nSee [RFC 7234 Section 5.2.2](https://tools.ietf.org/html/rfc7234#section-5.2.2).\n\nThe `private` directive ensures the response is only cached by the browser\'s cache ([RFC 7234 Section\n5.2.2.6](https://tools.ietf.org/html/rfc7234#section-5.2.2.6)).\n\nThe `max-age` (1 year) directive when the resource is immutable is a fall-back for clients that do not understand the\n`immutable` directive (see [RFC 8246](https://tools.ietf.org/html/rfc8246), ["Bits Up!", "Cache-Control:\nimmutable"](https://bitsup.blogspot.com/2016/05/cache-control-immutable.html)). With most modern browsers, this is\nsuperfluous.',
    examples: ["private, max-age=31536000, immutable"],
  });
export type CacheControlPrivateImmutable = z.infer<
  typeof CacheControlPrivateImmutableSchema
>;
