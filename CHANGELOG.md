<!-- Copyright 2026 PeopleWare N.V. -->
<!-- SPDX-License-Identifier: Apache-2.0 -->

# Changelog

## Unreleased

### Features

- Add branded `IbanSchema` / `Iban` under `/money`, based on the PPWCode IBAN class's 69 country formats and modulo-97 validation, including generated JSON Schema and OpenAPI support. This is an additive minor-release change.

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
