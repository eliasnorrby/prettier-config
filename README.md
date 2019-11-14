# Prettier Config

[![Travis](https://img.shields.io/travis/com/eliasnorrby/prettier-config?style=for-the-badge)](https://travis-ci.com/eliasnorrby/prettier-config)
[![npm](https://img.shields.io/npm/v/@eliasnorrby/prettier-config?style=for-the-badge)](https://www.npmjs.com/package/@eliasnorrby/prettier-config)

My prettier config. It's very close to the defaults, but enables trailing commas
to improve git diffs.

:warning: Subject to change in the future.

# Setup

## Using `npx`

Run the following command to install and configure prettier

```sh
npx @eliasnorrby/prettier-config
```

This will run a setup script, adding this package to `devDependencies`, writing
the config to `prettier.config.js` and writing some defaults to
`.prettierignore`. Entries will be appended if a `.prettierignore` already
exists.

### `--no-install`

Run setup with the `--no-install` flag to avoid installing this package as a
dependency. Your `pretter.config.js` will contain a sample rule for you to add
to instead of extending this package.

## Manually

Install the package

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

# Overriding settings

Overriding settings requires the use of a `prettier.config.js` or
`.prettierrc.js`:

```js
module.exports = {
  ...require("@eliasnorrby/prettier-config"),
  semi: false,
};
```
