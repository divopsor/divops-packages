#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-var-requires */

const fs = require("fs");
const path = require("path");

const cwd = process.cwd();

if (process.env.CI == null || process.env.CI === '') {
  return;
}

const packageJSON = JSON.parse(fs.readFileSync(path.join(cwd, 'package.json'), 'utf-8'));

for (const key in packageJSON.publishConfig) {
  packageJSON[key] = packageJSON.publishConfig[key];
}

fs.writeFileSync(path.join(cwd, 'package.json'), JSON.stringify(packageJSON, null, 2), 'utf-8');
