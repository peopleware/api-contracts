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
tag check enforces this during automatic release creation, local release rehearsal,
and npm publication.

Pushing a new `v*` tag runs the [Release workflow](../.github/workflows/release.yml).
It validates the tag and uses GitHub's built-in workflow token to create a GitHub
release titled `X.Y.Z` for `vX.Y.Z`, using the matching changelog section as its
description. The version heading and HTML comments are excluded; Markdown
subsections and formatting are preserved. Updates to existing tags and tag
deletions do not start the workflow.

After creating the release, the Release workflow calls the reusable
[Publish workflow](../.github/workflows/publish.yml) directly. This avoids relying
on a `release: published` event, because GitHub does not start another workflow
for events created with the built-in token. The Publish workflow checks the tag
and repeats all CI gates against the tagged commit, then passes the verified build
directly to the publish job. Approve the production deployment after reviewing
the successful gates. It runs `npm publish`, using the public access and registry
settings in `package.json`. npm rejects an already published package name and
version.

If automatic release creation fails, rerun the failed Release job. If npm
publication fails, either rerun the failed jobs in the Release workflow or run
Actions → Publish release to NPM → Run workflow after resolving the cause. For a
manual run, select the published release tag under **Use workflow from**. The
workflow rejects branch selections, verifies that the tag's GitHub release is
published, and repeats the same verification and production approval flow. The
workflow files must be included in the commit being released.

Add the target version's changelog entry before running `npm version <version>`
(or `npm version <version> --no-git-tag-version` when preparing a PR).
The `version` lifecycle hook applies the same changelog check to the new version
before npm creates a commit or tag. If the check fails, npm leaves `package.json`
and `package-lock.json` updated. Correct the changelog and rerun with the explicit
target version and `--allow-same-version`; do not repeat an incremental bump.

Publishing authenticates through npm trusted publishing without a stored token.
The pipeline never edits versions, creates commits or tags, or publishes directly
from a branch.

The [CI workflow](../.github/workflows/ci.yml) runs for pushes to `main`, pull
requests, and manual verification through Actions → CI → Run workflow.
Manual runs verify only, even when a tag is selected.
To publish normally, push the reviewed `vX.Y.Z` tag and approve the production
deployment in the resulting Release workflow run. Creating a release manually
through GitHub does not start npm publication by itself; run the Publish workflow
and select that release's tag under **Use workflow from** when manual publication
is intended.
See [GitHub deployment protection](https://docs.github.com/en/actions/how-tos/deploy/configure-and-manage-deployments/control-deployments).

For a local release rehearsal, use Node 24 LTS, install REUSE 6.2.0, run `npm ci`,
set `RELEASE_TAG` to the proposed version tag and run `npm run release:pack`.
This verifies the release and creates an archive in the repository root without
publishing it.
CI uses the pinned `fsfe/reuse:6.2.0` image as the authoritative license gate.
