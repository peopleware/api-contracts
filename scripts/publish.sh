#!/bin/sh
# Copyright 2026 PeopleWare N.V.
# SPDX-License-Identifier: Apache-2.0
set -eu
node scripts/check-tag.mjs
node scripts/check-unpublished.mjs
: "${NPM_TOKEN:?Set the production environment NPM_TOKEN}"
set -- artifacts/*.tgz
[ "$#" -eq 1 ] && [ -f "$1" ] || { echo "Expected exactly one verified tarball"; exit 1; }
NPM_CONFIG_USERCONFIG="$(mktemp)"
export NPM_CONFIG_USERCONFIG
trap 'rm -f "$NPM_CONFIG_USERCONFIG"' EXIT HUP INT TERM
chmod 600 "$NPM_CONFIG_USERCONFIG"
printf '//registry.npmjs.org/:_authToken=%s\nregistry=https://registry.npmjs.org/\n' "$NPM_TOKEN" > "$NPM_CONFIG_USERCONFIG"
npm publish "$1" --access public

