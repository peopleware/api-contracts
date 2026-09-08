# Implement `@ppwcode/api-contracts`

## Summary

Create a public TypeScript package containing reusable Zod 4 schemas and inferred types. Keep it independent of any OpenAPI generator and support OpenAPI 3.1 and 3.2 through Zod metadata and Draft 2020-12 JSON Schema output.

Use:

- Package name: `@ppwcode/api-contracts`
- Installation: `npm install @ppwcode/api-contracts`
- License: Apache License 2.0
- Copyright: `Copyright 2026 PeopleWare N.V.`
- CI/CD: Bitbucket Pipelines

Consumers access schemas through category-specific subpaths. Individual schemas are not exported from the package root.

## Categories and source organization

Use `/string`, `/time`, and `/be` for the initial release. Reserve `/number`, `/money`, and `/personalia` for future schemas, adding those entrypoints only when they contain a public contract.

```text
src/
  string/
    trimmed-string.schema.ts
    trimmed-string.schema.spec.ts
    index.ts
  time/
    date-only.schema.ts
    date-only.schema.spec.ts
    index.ts
  be/
    belgian-social-security-number.schema.ts
    belgian-social-security-number.schema.spec.ts
    belgian-enterprise-number.schema.ts
    belgian-enterprise-number.schema.spec.ts
    belgian-vat-number.schema.ts
    belgian-vat-number.schema.spec.ts
    belgian-iban.schema.ts
    belgian-iban.schema.spec.ts
    index.ts
    internal/
      modulo-97.ts
      modulo-97.spec.ts
```

Rules:

- Every canonical schema has its own implementation file and focused Vitest specification.
- A category barrel exports only schemas and types belonging to that category.
- Belgian jurisdiction takes precedence over functional classification, so all Belgian-specific contracts remain under `/be`.
- A schema has one canonical import path and is not cross-re-exported through other categories.
- The package root does not re-export schemas or category namespaces.

Public imports include:

```ts
import {
  TrimmedStringSchema,
  type TrimmedString,
} from '@ppwcode/api-contracts/string';

import {
  DateOnlySchema,
  type DateOnly,
} from '@ppwcode/api-contracts/time';

import {
  BelgianEnterpriseNumberSchema,
  type BelgianEnterpriseNumber,
} from '@ppwcode/api-contracts/be';
```

## Public schemas and behavior

From `@ppwcode/api-contracts/string`:

- `TrimmedStringSchema` and `TrimmedString`
  - Require at least one character.
  - Reject leading or trailing whitespace without transforming input.

From `@ppwcode/api-contracts/time`:

- `DateOnlySchema` and `DateOnly`
  - Require a canonical, calendar-valid `YYYY-MM-DD` string using `z.iso.date()`.

From `@ppwcode/api-contracts/be`:

- `BelgianSocialSecurityNumberSchema` and branded `BelgianSocialSecurityNumber`
  - Require exactly 11 digits and validate the pre-2000 or post-1999 modulo-97 calculation.
  - Do not derive or validate birth date or gender because INSZ/NISS includes BIS numbers.
  - Provide `NissSchema`/`Niss` and `InszSchema`/`Insz` aliases.
- `BelgianEnterpriseNumberSchema` and branded `BelgianEnterpriseNumber`
  - Require ten digits, starting with `0` or `1`, with modulo-97 validation.
  - Provide `KboNumberSchema`/`KboNumber` and `CbeNumberSchema`/`CbeNumber` aliases.
- `BelgianVatNumberSchema` and branded `BelgianVatNumber`
  - Require uppercase `BE` followed by a structurally valid Belgian enterprise number.
  - Do not imply that the enterprise is currently VAT-registered.
- `BelgianIbanSchema` and branded `BelgianIban`
  - Require uppercase `BE` followed by 14 digits and validate ISO 13616 modulo-97.

Schema values use the `Schema` suffix. Inferred TypeScript types use the corresponding unsuffixed name.

## OpenAPI metadata and package build

- Attach metadata last in every immutable Zod chain.
- Use stable component IDs: `TrimmedString`, `DateOnly`, `BelgianSocialSecurityNumber`, `BelgianEnterpriseNumber`, `BelgianVatNumber`, and `BelgianIban`.
- Include English titles, descriptions, canonical examples, patterns, and relevant formats.
- Document that OpenAPI represents patterns and lengths, while checksum refinements require runtime Zod validation.
- Make aliases reference the canonical schema instance so they do not register duplicate component IDs.
- Keep modulo-97 helpers private to `/be`.
- Use `zod` as a peer dependency with no runtime OpenAPI-generator dependency.
- Build browser-safe ES2022 output as ESM and CommonJS with declarations.
- Define conditional exports for `./string`, `./time`, `./be`, and `./package.json`.
- Use strict TypeScript, npm with a lockfile, and Node 22.18+ for development.

## Copyright and licensing

- Include the unmodified Apache License 2.0 text in `LICENSE`.
- Add a `NOTICE` file identifying `@ppwcode/api-contracts` and PeopleWare N.V.
- Set the package name, `"license": "Apache-2.0"`, and PeopleWare N.V. ownership metadata in `package.json`.
- Add this header to every human-authored file using its native comment syntax:

```text
Copyright 2026 PeopleWare N.V.
SPDX-License-Identifier: Apache-2.0
```

- Preserve the same banner in published JavaScript and declaration files.
- Cover JSON, generated, and other files that cannot contain comments through `REUSE.toml`.
- Run `reuse lint` in CI to ensure every tracked file has copyright and license coverage.
- Validate licensing with the pinned `fsfe/reuse:6.2.0` image.
- Exclude tests, coverage, temporary files, and source maps from the npm archive; include `LICENSE` and `NOTICE`.

## Bitbucket CI/CD

Add a repository-root `bitbucket-pipelines.yml` using a pinned Node 22.18 Debian image, npm caching, YAML step anchors, and artifact handoff.

Configure these pipelines:

- Pull requests (`'**'`):
  - Run the complete verification pipeline against every opened or updated PR.
  - Do not also configure a default push pipeline, because Bitbucket would run both for branches with open PRs. [Bitbucket pipeline start conditions](https://support.atlassian.com/bitbucket-cloud/docs/pipeline-start-conditions/)
- `main` branch:
  - Repeat the complete verification after merge.
  - Never publish directly from a branch build.
- Version tags (`v*`):
  - Run release verification and create the npm tarball.
  - Offer a subsequent manual `production` deployment step that publishes the already-verified tarball.
- Custom `verify` pipeline:
  - Allow developers to run the complete verification manually before opening a PR.

The complete verification pipeline runs independent steps in parallel:

- Quality:
  - `npm ci`
  - lint
  - strict TypeScript checking
  - Vitest unit/type tests with coverage and JUnit reporting
- Package contract:
  - `npm ci`
  - production build
  - Vitest OpenAPI integration tests
  - `publint`
  - Are the Types Wrong
  - `npm pack --dry-run`
- License compliance:
  - `reuse lint` using `fsfe/reuse:6.2.0`

Retain coverage and JUnit reports as diagnostic artifacts when useful, but do not pass `node_modules` between steps.

The tag release pipeline must:

1. Verify that `BITBUCKET_TAG` is exactly `v` followed by the version in `package.json`.
2. Verify that the tagged commit passed the same quality, package, and license gates as a PR.
3. Build once and create the actual npm tarball.
4. Inspect the tarball contents and retain it as a Bitbucket artifact.
5. Refuse publication if that version already exists in npm.
6. Pass the exact tarball to a manual step marked as the Bitbucket `production` deployment.
7. Publish with `npm publish <tarball> --access public`.
8. Never change `package.json`, create commits, or create tags from the pipeline.

Secure npm publishing as follows:

- Store `NPM_TOKEN` as a secured variable on the `production` deployment, not in repository variables or committed `.npmrc` files.
- Use a short-lived granular npm token limited to publishing `@ppwcode/api-contracts`, with bypass-2FA enabled only because non-interactive Bitbucket publication requires it.
- Restrict who may trigger the production deployment and rotate the token before expiry.
- Generate npm authentication configuration only inside the publish step and remove it when the container exits.
- Do not pass `--provenance`: npm currently supports provenance only from GitHub Actions and GitLab CI/CD, not Bitbucket Pipelines. Revisit this if npm adds Bitbucket support. [npm provenance support](https://docs.npmjs.com/generating-provenance-statements/), [npm CI/CD token guidance](https://docs.npmjs.com/using-private-packages-in-a-ci-d-workflow/)

Configure Bitbucket repository controls:

- Prohibit direct pushes to `main`.
- Require a pull request, at least one approval, all tasks resolved, and a successful latest pipeline.
- Restrict creation of `v*` tags to release maintainers.
- Restrict production deployment execution to release maintainers.
- Require the version bump and changelog entry to be reviewed and merged before creating the release tag.

## Vitest and release verification

- Use Vitest for unit, property-based, type-level, snapshot, and integration tests.
- Give every schema a matching focused `*.spec.ts` file.
- Test whitespace, empty strings, leap dates, malformed lengths and prefixes, lowercase values, separators, and checksum failures.
- Generate valid checksum inputs and mutate digits to verify rejection. Use synthetic NISS fixtures rather than real personal identifiers.
- Use Vitest type assertions to prove identifier brands are mutually incompatible while aliases remain identical.
- Snapshot native `z.toJSONSchema()` output, including component IDs, patterns, formats, descriptions, and examples.
- Generate representative OpenAPI 3.1 and 3.2 documents in Vitest integration suites using generator packages as development dependencies only.
- Provide npm scripts for Vitest watch mode, unit tests, type tests, integration tests, coverage, the complete CI suite, complete verification, and release packaging.
- Provide README examples for validation, schema composition, branded values, the `/be` entrypoint, and generator integration.
- Document canonical-input rules, acronym mappings, checksum-versus-registry validity, and safe handling of sensitive NISS/INSZ data.
- Run type-checking, linting, Vitest with coverage, `reuse lint`, `publint`, Are the Types Wrong, and `npm pack --dry-run` before publishing.
- Treat category import paths, exported names, component IDs, brands, and accepted wire values as public API. Additive schemas are minor releases; validation, branding, or import-path changes require a major release.

## Assumptions

- The npm target is the public npm registry rather than Bitbucket Packages.
- Releases use reviewed semantic versions committed to `package.json`, followed by a matching `vX.Y.Z` tag.
- The package never trims, removes separators, or changes case.
- `TrimmedString` rejects empty strings.
- Only identifier types are branded.
- V1 excludes postal codes and maintained reference datasets.
- Use the official Belgian `NISS` and `INSZ` terminology; do not export the non-standard `INSS` spelling.
- Copyright years are updated when files receive copyrightable changes while retaining `2026` as the initial year.
