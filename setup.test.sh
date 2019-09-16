#!/usr/bin/env bash
# Credit: https://github.com/Graham42/prettier-config/blob/master/setup.test.sh

set -exo pipefail;

ORIG_DIR=$(pwd)
function finish {
    cd "$ORIG_DIR"
}
trap finish EXIT

cd "$(mktemp -d)"
npm init -y
npx $ORIG_DIR
ls -a

echo "'prettier.config.js' should exist"
[ -e "prettier.config.js" ]

echo "'.prettierignore' should exist"
[ -e ".prettierignore" ]
