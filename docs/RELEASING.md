<!-- Copyright 2026 PeopleWare N.V. -->
<!-- SPDX-License-Identifier: Apache-2.0 -->

# Release setup and operation

These Bitbucket/npm account settings must be configured by a repository owner;
the pipeline YAML does not configure them:

- Prohibit direct pushes to `main`; require a PR, one approval, resolved tasks,
  and a successful latest pipeline.
- Restrict `v*` tag creation to release maintainers.
- Create the `production` deployment and restrict execution to release maintainers.
- Set `NPM_TOKEN` as a secured **production deployment** variable, never a
  repository variable. Use a short-lived granular token limited to publishing
  `@ppwcode/api-contracts`. Enable bypass-2FA for non-interactive publishing and
  rotate before expiry. Ensure the npm scope permits public publication.

Review and merge the semantic version in `package.json`, corresponding lockfile
update and changelog entry before creating `vX.Y.Z` on that commit. The tag must
exactly match the package version. `CHANGELOG.md` must contain a matching
`## X.Y.Z` heading (optionally followed by a date or status) and a nonempty change
description. Comments and subsection headings alone do not count. The release
tag check enforces this in the tag pipeline, local release rehearsal, and publish
step. The tag pipeline repeats all PR gates, builds
once, verifies npm availability, inspects the archive allowlist, and retains the
tarball. Trigger the production step only after reviewing the successful gates.
It rechecks npm availability and publishes the existing artifact with
`npm publish <tarball> --access public`. Registry or network errors fail closed.
An already published version cannot be republished.

The temporary npm authentication file exists only during the publish step and is
removed on exit. The pipeline never edits versions, creates commits or tags, or
publishes directly from a branch. Never commit an authenticated `.npmrc`.

No provenance flag is passed: npm's documented supported providers are GitHub
Actions and GitLab CI/CD. Revisit this when npm adds Bitbucket support. Sources:
[npm provenance](https://docs.npmjs.com/generating-provenance-statements/) and
[npm CI/CD token guidance](https://docs.npmjs.com/using-private-packages-in-a-ci-cd-workflow/).

There is deliberately no default push pipeline, to avoid duplicate PR runs;
see [Bitbucket start conditions](https://support.atlassian.com/bitbucket-cloud/docs/pipeline-start-conditions/).

For a local release rehearsal, use Node 22.18+, install REUSE 6.2.0, run `npm ci`,
set `BITBUCKET_TAG` to the proposed version tag and run `npm run release:pack`.
This creates an inspected archive under `artifacts/` without publishing it.
CI uses the pinned `fsfe/reuse:6.2.0` image as the authoritative license gate.
