<!-- Copyright 2026 PeopleWare N.V. -->
<!-- SPDX-License-Identifier: Apache-2.0 -->

# Implementation workflow

Use this workflow when adding or changing contracts, public entrypoints, or
package infrastructure in `@ppwcode/api-contracts`. For infrastructure-only work,
apply the relevant steps and verify the affected package guarantees.

The [README](../README.md) describes existing contracts and consumer usage.
Use [package.json](../package.json) for current commands and exports,
[tsdown.config.ts](../tsdown.config.ts) for build configuration, and
[CI workflow](../.github/workflows/ci.yml) for verification gates and
[Release workflow](../.github/workflows/release.yml) for tag-triggered GitHub
releases and [Publish workflow](../.github/workflows/publish.yml) for npm publication.

## 1. Define the contract and compatibility impact

- Inspect the relevant schema, focused tests, category barrel, and shared tests
  before designing the change.
- Specify accepted canonical values, rejected values, runtime checks, schema and
  type names, aliases, category, component ID, and representative examples.
- Preserve canonical input: validation never trims, removes separators, changes
  case, or otherwise transforms values. Brand identifier types only.
- Distinguish structural and checksum validity from registry membership or current
  registration. For NISS/INSZ, include BIS numbers without inferring or validating
  birth date or gender; use official NISS/INSZ terminology.
- Treat category paths, exported names, component IDs, brands, and accepted wire
  values as public API. Additive schemas are minor releases; validation, branding,
  or import-path changes require a major release. Assess other public API changes
  for compatibility before implementation.
- Establish requirements explicitly for extensions beyond the original scope,
  such as postal codes or maintained reference datasets.

Complete when the intended behavior and compatibility impact are explicit, with
examples covering both acceptance and rejection and any unresolved domain question
identified before it affects implementation.

## 2. Choose the canonical location

- Give each canonical schema its own `src/<category>/<name>.schema.ts` file and
  adjacent `<name>.schema.spec.ts` focused Vitest specification.
- Export the schema and inferred type through that category's `index.ts` only.
  Each schema has one canonical import path; the package root exports neither
  individual schemas nor category namespaces.
- Keep Belgian-specific contracts under `/be`, regardless of functional category.
  Keep reusable Belgian checksum helpers private under `src/be/internal/`.
- Use the existing `/string`, `/time`, and `/be` categories where appropriate.
  Reserved `/number`, `/money`, and `/personalia` entrypoints become public only
  when they contain a public contract.
- For a new category, add its build entry in `tsdown.config.ts` and conditional
  exports in `package.json`, including ESM/CommonJS and their declarations.

Complete when every new public symbol has one category and import path, and any
new entrypoint is represented in both the build and export configuration.

## 3. Implement validation and metadata

- Follow nearby implementation conventions. Name schema values `<Name>Schema`
  and derive the corresponding `<Name>` type with `z.infer`.
- Express structural constraints with Zod checks and use refinements for runtime
  rules such as checksums. Reuse private helpers where the domain rules match.
- Attach metadata last in the immutable Zod chain, after refinements and branding.
  Provide a stable component ID, English title and description, and canonical
  examples. Ensure JSON Schema exposes applicable patterns, lengths, and formats.
- Explain runtime-only constraints in descriptions: generated JSON Schema and
  OpenAPI describe structural checks but cannot enforce checksum refinements.
- Make aliases reference the canonical schema instance and type so they share
  identity, branding, and component metadata.
- Keep Zod as a peer dependency and OpenAPI generators as development dependencies.
  Preserve browser-safe ES2022 output, ESM/CommonJS support, declarations, and
  generator independence.

Complete when the schema implements the specified acceptance rules, preserves
input values, and carries metadata on its final exported instance.

## 4. Verify behavior and the public package

Extend the applicable Vitest suites:

| Area                                       | Required evidence                                                                                                                       |
| ------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------- |
| Focused schema tests                       | Canonical examples pass unchanged; relevant empty, whitespace, length, prefix, case, separator, calendar, and checksum errors fail.     |
| Property tests                             | Generated valid checksum inputs pass; mutations known to violate the rule fail. Use synthetic NISS fixtures.                            |
| Type tests in `tests/brands.test-d.ts`     | Identifier brands remain mutually incompatible; aliases retain identical types.                                                         |
| Metadata tests in `tests/metadata.spec.ts` | Draft 2020-12 JSON Schema exposes intended IDs, constraints, formats, descriptions, and examples. Aliases share the canonical instance. |
| OpenAPI integration tests                  | Representative OpenAPI 3.1 and 3.2 documents include affected schemas with stable components.                                           |
| Package integration tests                  | Affected category imports and public exports work from the built package in the supported module formats.                               |

Review snapshot diffs against the intended contract before accepting updates.
Build before running integration tests, because they consume `dist`.

Complete when each changed behavior has relevant test coverage and public API,
metadata, and package assertions account for every added or modified contract.

## 5. Update documentation and license coverage

- Update the README contract table and relevant validation, composition, branding,
  alias, category import, and generator examples.
- Document canonical-input rules and the limits of runtime validation. For
  sensitive identifiers, use synthetic examples and preserve guidance on avoiding
  exposure in logs, telemetry, URLs, and validation-error reports.
- Record user-visible changes and compatibility impact in `CHANGELOG.md`.
  When preparing a release, update the reviewed semantic version and lockfile as
  described in [release setup and operation](RELEASING.md).
- Add copyright and SPDX license headers identifying `Apache-2.0` using each
  human-authored file's native comment syntax. Update copyright years for
  copyrightable changes while retaining 2026 as the initial year.
- Cover generated files and files without comment support through `REUSE.toml`.
  Preserve `LICENSE`, `NOTICE`, ownership metadata, and published JavaScript and
  declaration banners.

Complete when documentation describes the resulting public behavior and every
added or changed file has appropriate license coverage.

## 6. Run verification and prepare the change for review

Use the Node version specified by the repository and install locked dependencies
with `npm ci`. Run focused checks while implementing, then `npm run verify` for
the complete quality, package, license, and production dependency audit gates.
The license command requires REUSE; use the version pinned by CI. The repository
also provides `npm run license:docker` for the containerized license check.

For documentation-only changes, check the changed Markdown's formatting, local
links, and license coverage. Run the full verification suite for contract,
dependency, build, test, or pipeline changes.

For package changes, review the generated archive listing: include the public
build, README, LICENSE, and NOTICE; exclude tests, coverage, temporary files, and
source maps. If changing CI, preserve the verification gates for PRs, `main`,
published releases, and custom verification, with artifact handoff and no transfer of
`node_modules` between steps.

Complete when relevant checks pass, the diff contains only intended changes, and
the review summary states the resulting behavior, compatibility impact, checks
run, and any unresolved verification limitations.

## 7. Release when included in the task

Follow [release setup and operation](RELEASING.md) for repository controls,
version and changelog checks, tag creation, local packaging rehearsal, credential
handling, and manual production publication. Branch builds verify changes;
publication uses the package build verified by the release-triggered pipeline.

Complete implementation work with a reviewable change. When release execution is
also in scope, complete the applicable release steps and report their outcome.
