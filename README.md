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
| `/money`  | `IbanSchema`, `Iban`                                               | Uppercase IBAN; 69 PPWCode country formats and MOD 97-10 checksum    |
| `/be`     | `BelgianIbanSchema`, `BelgianIban`                                 | Uppercase `BE` plus 14 digits; ISO 13616 modulo-97                   |

`IbanSchema` is available from `@ppwcode/api-contracts/money`. Its country
lengths and BBAN patterns follow the supplied `PPWCode.Util.Validation.IV.IBAN`
class (69 countries); this is a fixed compatibility table, not a live IBAN
registry. The [PPWCode.vNext documentation](https://context7.com/peopleware/net-ppwcode-vnext/llms.txt)
describes its country and MOD 97-10 checks. Unlike the C# identification class,
this contract accepts only the canonical electronic form and does not normalize
paper formatting. Country structures are included in generated JSON Schema;
the checksum requires runtime validation. `Iban` and `BelgianIban` are distinct
brands; parse a value with the desired schema to obtain that type.

```ts
import { IbanSchema } from "@ppwcode/api-contracts/money";

IbanSchema.parse("GB82WEST12345698765432");
```

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

`npm run build` also generates a complete OpenAPI 3.1 example at
`dist/openapi-example.yaml`. Open it in an OpenAPI viewer to explore a
`GET /example` response composed from all seven canonical contracts, with reusable
component schemas and their metadata. The spec is self-contained and included in
the published package at `@ppwcode/api-contracts/openapi-example.yaml`; resolve it
with `import.meta.resolve()` or `require.resolve()` to read the YAML file.
Its generator is [scripts/generate-openapi-example.mjs](scripts/generate-openapi-example.mjs).

`npm run build` generates standalone YAML files in `dist/schemas/`, included in
the published package. Each file contains JSON Schema Draft 2020-12 and is named
after its canonical component ID: `TrimmedString`, `DateOnly`,
`BelgianSocialSecurityNumber`, `BelgianEnterpriseNumber`, `BelgianVatNumber`,
`BelgianIban`, and `Iban`. Aliases share their canonical file.

Consumers can resolve a file with
`import.meta.resolve("@ppwcode/api-contracts/schemas/DateOnly.yaml")` or
`require.resolve("@ppwcode/api-contracts/schemas/DateOnly.yaml")` and read it with
a YAML parser. OpenAPI 3.1/3.2 documents can reference the installed files directly
(adjust the relative path to the location of your API document):

```yaml
components:
  schemas:
    DateOnly:
      $ref: ./node_modules/@ppwcode/api-contracts/dist/schemas/DateOnly.yaml
```

No consumer-side schema generation is needed. You can also generate JSON Schema
programmatically:

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
The GitHub workflows read `.nvmrc` and select the latest available Node 24 release.

| Command                    | Purpose                                                                  |
| -------------------------- | ------------------------------------------------------------------------ |
| `npm test`                 | Watch unit and metadata tests                                            |
| `npm run test:unit`        | Unit, property and metadata tests                                        |
| `npm run test:types`       | Identifier and alias type assertions                                     |
| `npm run test:coverage`    | Unit tests, coverage and JUnit report                                    |
| `npm run build`            | ESM/CommonJS, declarations and standalone schema YAML files               |
| `npm run test:integration` | OpenAPI tests against `dist` (build first)                               |
| `npm run test:ci`          | All tests (build first)                                                  |
| `npm run verify:quality`   | Lint, strict types, unit coverage and type tests                         |
| `npm run verify:package`   | Build, integration, publint, Are the Types Wrong, dry-run pack           |
| `npm run license:check`    | REUSE lint (install REUSE 6.2.0 first)                                   |
| `npm run license:docker`   | License check using `fsfe/reuse:6.2.0`                                   |
| `npm run verify`           | All quality, package and license gates                                   |
| `npm run release:pack`     | Verify matching `RELEASE_TAG`, all gates, then create an archive |

`npm run ci:check-production-vulnerabilities` audits production dependencies using
the locked `better-npm-audit` tool. It also runs as part of `npm run verify`.

GitHub Actions runs independent quality, package, license and Dependency Audit jobs
for PRs, `main`, releases and manual `CI` workflow runs. The
[Release workflow](.github/workflows/release.yml) handles new `v*` tags and creates
GitHub releases with the built-in workflow token, using the matching changelog
entry as the description. It then calls the reusable
[Publish workflow](.github/workflows/publish.yml), which validates the release tag,
calls the reusable [CI workflow](.github/workflows/ci.yml), and hands the verified
package build directly to the production deployment. Publication requires
environment approval and uses npm trusted publishing. No repository release token
or npm token is stored. A failed publication can be retried by running the Publish
workflow manually and selecting the published release tag under **Use workflow
from**. No branch build or manual CI verification run publishes.

Category paths, exported names, component IDs, brands and accepted wire values
are public API. Additive schemas are minor releases. Validation, branding or
import-path changes require a major release. Future `/number` and
`/personalia` entrypoints are reserved and not currently exported.

## Contributing

Follow the [implementation workflow](docs/IMPLEMENTATION_WORKFLOW.md) when adding
or changing contracts, entrypoints, or package infrastructure.

Always use `npm version [major|minor|patch]` to bump the version when preparing a
release, choosing one of `major`, `minor`, or `patch` (for example,
`npm version patch`). Add and commit a matching `## X.Y.Z` entry with a change
description in [CHANGELOG.md](CHANGELOG.md) first.

The command runs `verify:quality` before the bump, updates `package.json` and
`package-lock.json`, checks the changelog for the new version, and creates the
version commit and tag. When preparing the version update for a PR, use
`npm version [major|minor|patch] --no-git-tag-version` and include the updated
version files in the PR.

After the version update and changelog are reviewed and merged, push the matching
`vX.Y.Z` tag on the merged commit to trigger the release workflow. Publishing
requires successful checks and production approval. Follow
[release setup](docs/RELEASING.md) for the complete release procedure.

Licensed under [Apache License 2.0](LICENSE); see [NOTICE](NOTICE).
