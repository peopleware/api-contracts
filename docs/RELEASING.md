<!-- Copyright 2026 PeopleWare N.V. -->
<!-- SPDX-License-Identifier: Apache-2.0 -->

# Release setup and operation

These GitHub/npm account settings must be configured by a repository owner
before pushing a release tag; the workflow YAML does not configure them:

- Prohibit direct pushes to `main`; require a PR, one approval, resolved
  conversations, and successful Quality, Package contract, License compliance,
  and Dependency Audit checks.
- Restrict `v*` tag creation to release maintainers.
- Create the `production` environment, configure release maintainers as required
  reviewers, and prevent self-review. Restrict deployment branches and tags to
  selected tags matching `v*`, with no branches allowed. Required reviewers are
  the manual publication gate; declaring an environment in YAML alone does not
  require approval. Ensure the repository's GitHub plan supports this protection.
- Configure `publish.yml` as a trusted publisher for `@ppwcode/api-contracts`
  on npm, using this repository and the `production` environment. The publish
  job grants `id-token: write` for OIDC authentication. Ensure the npm scope
  permits public publication.

Review and merge the semantic version in `package.json`, corresponding lockfile
update and changelog entry before creating `vX.Y.Z` on that commit. The tag must
exactly match the package version. `CHANGELOG.md` must contain a matching
`## X.Y.Z` heading (optionally followed by a date or status) and a nonempty change
description. Comments and subsection headings alone do not count. The release
tag check enforces this in the tag pipeline, local release rehearsal, and publish
step. The tag pipeline repeats all PR gates and passes the verified build
directly to the publish job. Approve the production deployment only after
reviewing the successful gates. It runs `npm publish`, using the public access
and registry settings in `package.json`. npm rejects an already published
package name and version.

Add the target version's changelog entry before running `npm version <version>`
(or `npm version <version> --no-git-tag-version` when preparing a PR).
The `version` lifecycle hook applies the same changelog check to the new version
before npm creates a commit or tag. If the check fails, npm leaves `package.json`
and `package-lock.json` updated. Correct the changelog and rerun with the explicit
target version and `--allow-same-verison`; do not repeat an incremental bump.

Publishing authenticates through npm trusted publishing without a stored token.
The pipeline never edits versions, creates commits or tags, or publishes directly
from a branch.

The [CI workflow](../.github/workflows/ci.yml) runs for pushes to `main`, pull
requests, and manual verification through Actions → CI → Run workflow.
Manual runs verify only, even when a tag is selected.
The separate [Publish workflow](../.github/workflows/publish.yml) runs for `v*`
tag pushes. After validating the tag, it calls the reusable CI workflow and
waits for every gate before publishing the verified build.
It has no manual trigger.
Publication requires a push that creates a new `v*` tag;
updates to existing tags and tag deletions cannot publish. The tag must match
the package version, and that version must not already exist on npm.
The workflow checks GitHub's [push event fields](https://docs.github.com/en/webhooks/webhook-events-and-payloads#push)
before tag verification; downstream jobs depend on that job succeeding.
See [GitHub deployment protection](https://docs.github.com/en/actions/how-tos/deploy/configure-and-manage-deployments/control-deployments).

For a local release rehearsal, use Node 24 LTS, install REUSE 6.2.0, run `npm ci`,
set `RELEASE_TAG` to the proposed version tag and run `npm run release:pack`.
This verifies the release and creates an archive in the repository root without
publishing it.
CI uses the pinned `fsfe/reuse:6.2.0` image as the authoritative license gate.
