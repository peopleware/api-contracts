<!-- Copyright 2026 PeopleWare N.V. -->
<!-- SPDX-License-Identifier: Apache-2.0 -->

# Changelog

## Unreleased

### Features

- Migrate the contract library from Joi to Zod 4, exposing inferred TypeScript
  types and keeping Zod as a peer dependency.
- Add namespaced category entrypoints beneath `/value/*`, `/identity/*`,
  `/resource/*`, `/http/*`, and `/protocol/*`, replacing the former flat
  category layout. This changes public import paths and requires a major
  release.
- Add `AddressLinesSchema` / `AddressLines` and
  `AddressWithNisCodeSchema` / `AddressWithNisCode`, and refine the
  `AddressSchema` structure under `/value/location`.
- Add `PersonNameSchema` / `PersonName` under `/identity/person`.
- Add `PersistentSchema`, `InsertAuditableSchema`,
  `InsertAuditablePersistentSchema`, `AuditableSchema`, and
  `AuditablePersistentSchema` under `/resource/lifecycle`, modelling the
  supplied inheritance hierarchy with `long` identities.
- Add branded `EmailAddressSchema` / `EmailAddress` under `/value/string`.
- Brand canonical primitive domain values, including dates, currencies, URLs,
  modes, and identifiers, while leaving structural object schemas unbranded.
  This changes TypeScript assignability and requires a major release.
- Add branded `TelephoneNumberSchema` / `TelephoneNumber` under `/value/string`, accepting E.164 and local telephone number formats.
- Add branded `IbanSchema` / `Iban` under `/identity/banking`, based on the PPWCode IBAN class's 69 country formats and modulo-97 validation, including generated JSON Schema and OpenAPI support. This is an additive minor-release change.

### Maintenance

- Generate the OpenAPI example and standalone JSON Schema files by discovering
  all nested category entrypoints automatically.
- Add schema-coverage checks and expand metadata and OpenAPI integration
  coverage to include every exported schema.
- Run CI on pushes to all branches, add format checking to quality verification,
  and pin the development dependencies to exact patch versions.

## 0.2.0

### Features

- Generate and publish a complete OpenAPI 3.1 example using all canonical contracts.
- Create GitHub releases automatically for new `v*` tags using changelog entries as release notes.

### Maintenance

- Publish to npm when a GitHub release is published, using npm trusted publishing.
- Simplify release packaging with `npm pack` and remove the separate npm version availability check.
- Update the package description and point repository, issue tracker, and homepage links to GitHub.

## 0.1.1

### Features

- Generate and publish standalone schema YAML files with public `/schemas/*.yaml` paths.

## 0.1.0

### Features

- Add canonical string, date-only, and branded Belgian identifier contracts.
- Support category subpaths, ESM/CommonJS, JSON Schema, and OpenAPI integration.
