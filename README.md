<!-- Copyright 2026 PeopleWare N.V. -->
<!-- SPDX-License-Identifier: Apache-2.0 -->

# @ppwcode/api-contracts

Reusable Zod 4 schemas and inferred TypeScript types for canonical API values.

```sh
npm install @ppwcode/api-contracts
```

Zod 4 is a peer dependency. Install `zod@^4` explicitly if your package manager
does not install peers. Import contracts from their category; the package has no
root entrypoint. Output supports browser-safe ES2022, ESM and CommonJS.

```ts
import { z } from "zod";
import { TrimmedStringSchema } from "@ppwcode/api-contracts/string";
import { DateOnlySchema } from "@ppwcode/api-contracts/time";
import {
  BelgianEnterpriseNumberSchema,
  type BelgianEnterpriseNumber,
} from "@ppwcode/api-contracts/be";

const CompanySchema = z.object({
  name: TrimmedStringSchema,
  foundedOn: DateOnlySchema.optional(),
  enterpriseNumber: BelgianEnterpriseNumberSchema,
});
const company = CompanySchema.parse({
  name: "Example company",
  enterpriseNumber: "0123456749",
});
const number: BelgianEnterpriseNumber = company.enterpriseNumber;
const result = BelgianEnterpriseNumberSchema.safeParse("0123.456.749");
// result.success === false: formatting is never silently removed.
```

## Contracts

| Category  | Schema and inferred type                                           | Accepted input                                                       |
| --------- | ------------------------------------------------------------------ | -------------------------------------------------------------------- |
| `/string` | `TrimmedStringSchema`, `TrimmedString`                             | Non-empty string without leading or trailing JavaScript whitespace   |
| `/time`   | `DateOnlySchema`, `DateOnly`                                       | Calendar-valid `YYYY-MM-DD` using `z.iso.date()`                     |
| `/be`     | `BelgianSocialSecurityNumberSchema`, `BelgianSocialSecurityNumber` | 11 digits; pre-2000 or post-1999 modulo-97                           |
| `/be`     | `BelgianEnterpriseNumberSchema`, `BelgianEnterpriseNumber`         | 10 digits, first digit 0 or 1; modulo-97                             |
| `/be`     | `BelgianVatNumberSchema`, `BelgianVatNumber`                       | Uppercase `BE` plus a valid enterprise-number structure and checksum |
| `/be`     | `BelgianIbanSchema`, `BelgianIban`                                 | Uppercase `BE` plus 14 digits; ISO 13616 modulo-97                   |

No schema trims, changes case, removes separators, or otherwise transforms input.
Only identifiers are branded. Parse untrusted strings to obtain branded values;
different identifier brands cannot be assigned to one another.

`NissSchema`/`Niss` and `InszSchema`/`Insz` alias the social security number.
NISS means _numéro d’identification de la sécurité sociale_; INSZ means
_identificatienummer van de sociale zekerheid_. BIS numbers are included, so
neither birth date nor gender is inferred or validated. The non-standard spelling
`INSS` is not exported. `KboNumberSchema`/`KboNumber` and
`CbeNumberSchema`/`CbeNumber` alias the enterprise number: KBO is _Kruispuntbank
van Ondernemingen_ and CBE is _Crossroads Bank for Enterprises_. All aliases
reference their canonical schema instance.

A valid checksum does not prove registry membership, VAT registration, identity,
or bank-account existence. Treat NISS/INSZ as sensitive personal data: avoid raw
values in logs, telemetry, URLs and validation-error reports; use synthetic test
fixtures and restrict storage and access to what your application requires.

## JSON Schema and OpenAPI

```ts
import { z } from "zod";
import { BelgianEnterpriseNumberSchema } from "@ppwcode/api-contracts/be";

const jsonSchema = z.toJSONSchema(BelgianEnterpriseNumberSchema, {
  target: "draft-2020-12",
});
```

Metadata includes stable component IDs, English titles, descriptions, examples,
patterns and lengths, plus the standard `date` format where applicable. Checksum
refinements require runtime Zod validation: JSON Schema and OpenAPI cannot express
these calculations. Metadata is attached last; attach your own metadata last too
when deriving a schema. Avoid assigning an existing component ID to a new schema.

Choose your own generator. For example, with `zod-openapi` installed separately:

```ts
import { createDocument } from "zod-openapi";
import { BelgianEnterpriseNumberSchema } from "@ppwcode/api-contracts/be";

const document = createDocument({
  openapi: "3.2.0", // '3.1.0' is also tested.
  info: { title: "Company API", version: "1.0.0" },
  paths: {
    "/enterprise-number": {
      get: {
        responses: {
          "200": {
            description: "Enterprise number",
            content: {
              "application/json": { schema: BelgianEnterpriseNumberSchema },
            },
          },
        },
      },
    },
  },
});
```

There is no runtime dependency on an OpenAPI generator. Native JSON Schema and
representative OpenAPI 3.1/3.2 documents are snapshot tested.

## Development

Use Node 24 LTS and npm. `npm ci` installs the locked toolchain.
Both GitHub workflows read `.nvmrc` and select the latest available Node 24 release.

| Command                    | Purpose                                                                  |
| -------------------------- | ------------------------------------------------------------------------ |
| `npm test`                 | Watch unit and metadata tests                                            |
| `npm run test:unit`        | Unit, property and metadata tests                                        |
| `npm run test:types`       | Identifier and alias type assertions                                     |
| `npm run test:coverage`    | Unit tests, coverage and JUnit report                                    |
| `npm run build`            | ESM/CommonJS and declarations with copyright banners                     |
| `npm run test:integration` | OpenAPI tests against `dist` (build first)                               |
| `npm run test:ci`          | All tests (build first)                                                  |
| `npm run verify:quality`   | Lint, strict types, unit coverage and type tests                         |
| `npm run verify:package`   | Build, integration, publint, Are the Types Wrong, dry-run pack           |
| `npm run license:check`    | REUSE lint (install REUSE 6.2.0 first)                                   |
| `npm run license:docker`   | License check using `fsfe/reuse:6.2.0`                                   |
| `npm run verify`           | All quality, package and license gates                                   |
| `npm run release:pack`     | Verify matching `RELEASE_TAG`, all gates, npm availability and archive |

`npm run ci:check-production-vulnerabilities` audits production dependencies using
the locked `better-npm-audit` tool. It also runs as part of `npm run verify`.

GitHub Actions runs independent quality, package, license and Dependency Audit jobs for PRs, `main`,
version tags and manual `CI` workflow runs. The separate
[Publish workflow](.github/workflows/publish.yml) handles new version tags and
calls the reusable [CI workflow](.github/workflows/ci.yml) for the same gates;
the package build is handed to the tarball step as an artifact, then the exact
tarball is handed to a production deployment requiring environment approval.
No branch build or manual verification run publishes.

Category paths, exported names, component IDs, brands and accepted wire values
are public API. Additive schemas are minor releases. Validation, branding or
import-path changes require a major release. Future `/number`, `/money` and
`/personalia` entrypoints are reserved and not currently exported.

Follow the [implementation workflow](docs/IMPLEMENTATION_WORKFLOW.md) when adding
or changing contracts, entrypoints, or package infrastructure.
See [release setup](docs/RELEASING.md) for repository controls and publishing.
Licensed under [Apache License 2.0](LICENSE); see [NOTICE](NOTICE).
