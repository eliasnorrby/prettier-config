#!/usr/bin/env bash
# Credit: https://github.com/Graham42/prettier-config/blob/master/setup.test.sh

set -exo pipefail;

export npm_config_yes=true

PI_LINES=$(wc -l .prettierignore | cut -d " " -f1)
EXPECTED_LINES=$((PI_LINES+1))

ORIG_DIR=$(pwd)
function finish {
  if [ ! $? -eq 0 ] ; then
    echo "There are failing tests"
  else
    echo "All tests passed!"
  fi
  cd "$ORIG_DIR"
}
trap finish EXIT

function setup {
  local FLAG=$1
  cd "$(mktemp -d)"
  npm init -y
  npx $ORIG_DIR $FLAG
  ls -a
}

function common_test {
  echo "'.prettierignore' should exist"
  [ -e ".prettierignore" ]

  echo "'.prettierignore' should have $EXPECTED_LINES lines"
  [ "$(wc -l .prettierignore | cut -d ' ' -f1)" -eq $EXPECTED_LINES ]

  echo "'prettier.config.js' should exist"
  [ -e "prettier.config.js" ]

  echo "'prettier' should be installed"
  [ -d "node_modules/prettier" ]

  echo "format script should exist"
  npm run format

  echo "format:check script should exist"
  npm run format:check
}

function ignore_test {

  local FLAG=$1
  cat <<EOF > .prettierignore
ignored-file
node_modules/
EOF

  npx $ORIG_DIR $FLAG

  echo "should not overwrite existing '.prettierignore'"
  echo "'.prettierignore' should have > $EXPECTED_LINES lines"
  [ "$(wc -l .prettierignore | cut -d ' ' -f1)" -gt $EXPECTED_LINES ]
}

function install_test {
  setup

  common_test

  echo "'@eliasnorrby/prettier-config' should be installed"
  [ -d "node_modules/@eliasnorrby/prettier-config" ]

  ignore_test
}

function no_install_test {
  setup "--no-install"

  common_test

  echo "'@eliasnorrby/prettier-config' should not be installed"
  [ ! -d "node_modules/@eliasnorrby/prettier-config" ]

  ignore_test "--no-install"
}

function help_test {
  npx $ORIG_DIR --help | grep "Usage"
}

install_test

no_install_test

help_test
