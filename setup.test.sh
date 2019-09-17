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

echo "'.prettierignore' should have 7 lines"
[ "$(wc -l .prettierignore | cut -d ' ' -f1)" -eq 7 ]

echo "'.prettierignore' should exist"
[ -e ".prettierignore" ]

echo "'@eliasnorrby/prettier-config' should be installed"
[ -d "node_modules/@eliasnorrby/prettier-config" ]

cat <<EOF > .prettierignore
ignored-file
node_modules/
EOF

npx $ORIG_DIR

echo "should not overwrite existing '.prettierignore'"
echo "'.prettierignore' should have 10 lines"
[ "$(wc -l .prettierignore | cut -d ' ' -f1)" -eq 10 ]
