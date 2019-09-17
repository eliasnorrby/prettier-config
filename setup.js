#!/usr/bin/env node

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
  console.log("No changes needed");
} else {
  packageJson.prettier = "@eliasnorrby/prettier-config";
  console.log("Added prettier-config to package.json");
  fs.writeFileSync("package.json", JSON.stringify(packageJson, null, 2));
  console.log("Package saved");
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

if (!fs.existsSync(".prettierignore"))
  fs.writeFileSync(".prettierignore", prettierignore, "utf8");
else fs.appendFileSync(".prettierignore", "\n" + prettierignore, "utf8");

require("child_process").execSync(
  "npm install --save-dev @eliasnorrby/prettier-config",
  { stdio: "inherit" },
);
