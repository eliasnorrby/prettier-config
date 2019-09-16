# Prettier Config

[![Build Status](https://travis-ci.com/eliasnorrby/prettier-config.svg?branch=master)](https://travis-ci.com/eliasnorrby/prettier-config) ![npm (scoped)](https://img.shields.io/npm/v/@eliasnorrby/prettier-config)

My prettier config. It's very close to the defaults, but enables trailing commas
to improve git diffs.

:warning: Subject to change in the future.

# Setup

## `npx`

Run the following command to install and configure prettier:

```sh
npx @eliasnorrby/prettier-config
```

## Manual

Install the package:

```sh
npm i -D @eliasnorrby/prettier-config
```

and add the configuration to `prettier.config.js` or `package.json`.

### `prettier.config.js`

```js
module.exports = require("@eliasnorrby/prettier-config");
```

### `package.json`

```json
{
  "prettier": "@eliasnorrby/prettier-config"
}
```
