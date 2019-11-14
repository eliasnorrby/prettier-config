#!/usr/bin/env node
// Credit: https://github.com/Graham42/prettier-config/blob/master/setup.js
const yargs = require("yargs");

yargs
  .alias("v", "version")
  .usage("Usage: $0 [options]")
  .help("h")
  .alias("h", "help")
  .option("i", {
    describe: "Install this package",
    type: "boolean",
    alias: "install",
    default: true,
  })
  .describe("no-install", "Skip installing this package")
  .strict(true);

const argv = yargs.argv;

const log = msg => console.log(">> \x1b[36m%s\x1b[0m", msg);
const packageName = "@eliasnorrby/prettier-config";

const path = require("path");
const fs = require("fs");
if (!fs.existsSync("package.json")) {
  console.error(
    "No package.json found in the current directory. Make sure you are in the project root. If no package.json exists yet, run `npm init` first.",
  );
  process.exit(1);
}

const ignoredFiles = fs.readFileSync(
  path.resolve(__dirname, ".prettierignore"),
  "utf8",
);
const header = argv.install ? `# Added by ${packageName}` : "";
const prettierignore = `\
${header}
${ignoredFiles}`;

const prettierconfig = argv.install
  ? `\
module.exports = {
  ...require("${packageName}"),
  // Override rules here
};`
  : `\
module.exports = {
  trailingComma: "all",
  // Add rules here
}`;

// Config files to write
const CONFIG_FILES = {
  "prettier.config.js": prettierconfig,
  ".prettierignore": prettierignore,
};

const failedToWrite = {};

Object.entries(CONFIG_FILES).forEach(([fileName, contents]) => {
  if (!fs.existsSync(fileName)) {
    log(`Writing ${fileName}`);
    fs.writeFileSync(fileName, contents, "utf8");
  } else {
    log(`${fileName} already exists`);
    failedToWrite[fileName] = true;
  }
});

// Append to .prettierignore if it exists
const ignorefilename = ".prettierignore";
if (failedToWrite[ignorefilename]) {
  log(`Appending to ${ignorefilename}`);
  fs.appendFileSync(
    ignorefilename,
    "\n" + CONFIG_FILES[ignorefilename],
    "utf8",
  );
}

// Update package.json with scripts for formatting and checking format
const PRETTIER_FILE_EXTENSIONS = [
  "js",
  "jsx",
  "ts",
  "tsx",
  "html",
  "vue",
  "css",
  "less",
  "scss",
  "graphql",
  "yaml",
  "yml",
  "json",
  "md",
  "mdx",
];

const targetFilesGlob = `**/*.{${PRETTIER_FILE_EXTENSIONS.join(",")}}`;
const pkg = JSON.parse(fs.readFileSync("package.json", "utf8"));
pkg.scripts = pkg.scripts || {};
pkg.scripts["check-format"] = `prettier --list-different '${targetFilesGlob}'`;
pkg.scripts.format = `prettier --write '${targetFilesGlob}'`;
log("Writing scripts to package.json");
fs.writeFileSync("package.json", JSON.stringify(pkg, null, 2));

log("Installing peer dependencies (prettier)");
require("child_process").execSync("npm install --save-dev prettier", {
  stdio: "inherit",
});

if (argv.install) {
  log(`Installing self (${packageName})`);
  require("child_process").execSync(`npm install --save-dev ${packageName}`, {
    stdio: "inherit",
  });
} else {
  log("Skipping install of self");
}

log("Done!");
