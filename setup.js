#!/usr/bin/env node

const log = msg => console.log(">> \x1b[36m%s\x1b[0m", msg);

const fs = require("fs");
if (!fs.existsSync("package.json")) {
  console.error(
    "No package.json found in the current directory. Make sure you are in the project root. If no package.json exists yet, run `npm init` first.",
  );
  process.exit(1);
}

const packageJson = JSON.parse(fs.readFileSync("package.json", "utf8"));
const prettier = packageJson.prettier;

if (prettier && prettier.includes("eliasnorrby")) {
  log("No changes needed");
} else {
  packageJson.prettier = "@eliasnorrby/prettier-config";
  log("Added prettier-config to package.json");
  fs.writeFileSync("package.json", JSON.stringify(packageJson, null, 2));
  log("Package saved");
}

const prettierignore = `\
# Added by @eliasnorrby/prettier-config
dist/
build/
coverage/
node_modules/
package*.json
yarn-lock.json
`;

log("Writing .prettierignore");
if (!fs.existsSync(".prettierignore"))
  fs.writeFileSync(".prettierignore", prettierignore, "utf8");
else fs.appendFileSync(".prettierignore", "\n" + prettierignore, "utf8");

log("Installing peer dependencies (prettier)");
require("child_process").execSync("npm install --save-dev prettier", {
  stdio: "inherit",
});

log("Installing self (@eliasnorrby/prettier-config)");
require("child_process").execSync(
  "npm install --save-dev @eliasnorrby/prettier-config",
  { stdio: "inherit" },
);
