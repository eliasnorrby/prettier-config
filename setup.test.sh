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

echo "'.prettierignore' contents"
cat .prettierignore

echo "'.prettierignore' should have 6 lines"
[ "$(wc -l .prettierignore | cut -d ' ' -f1)" -eq 6 ]

echo "'.prettierignore' should exist"
[ -e ".prettierignore" ]

echo "'@eliasnorrby/prettier-config' should be installed"
[ -d "node_modules/@eliasnorrby/prettier-config" ]
