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

echo "'.prettierignore' should exist"
[ -e ".prettierignore" ]

echo "'.prettierignore' should have 7 lines"
[ "$(wc -l .prettierignore | cut -d ' ' -f1)" -eq 7 ]

echo "'prettier.config.js' should exist"
[ -e "prettier.config.js" ]

echo "'@eliasnorrby/prettier-config' should be installed"
[ -d "node_modules/@eliasnorrby/prettier-config" ]

echo "'prettier' should be installed"
[ -d "node_modules/prettier" ]

echo "format script should exist"
npm run format

echo "checkFormat script should exist"
npm run check-format

cat <<EOF > .prettierignore
ignored-file
node_modules/
EOF

npx $ORIG_DIR

echo "should not overwrite existing '.prettierignore'"
echo "'.prettierignore' should have 10 lines"
[ "$(wc -l .prettierignore | cut -d ' ' -f1)" -eq 10 ]
