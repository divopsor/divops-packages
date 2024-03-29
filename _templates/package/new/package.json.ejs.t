---
to: packages/<%= name %>/package.json
---
{
  "name": "@divops-packages/<%= name %>",
  "version": "0.0.0",
  "exports": {
    ".": "./src/index.ts",
    "./package.json": "./package.json"
  },
  "main": "./src/index.ts",
  "publishConfig": {
    "access": "public",
    "exports": {
      ".": {
        "types": "./dist/index.d.ts",
        "require": "./dist/index.js",
        "import": "./dist/index.mjs"
      },
      "./package.json": "./package.json"
    },
    "main": "./dist/index.js"
  },
  "scripts": {
    "prepack": "yarn build",
    "build": "rm -rf dist && tsup ./src/index.ts --format cjs,esm --dts",
    "dev": "yarn run build --watch",
    "typecheck": "tsc --noEmit"
  },
  "devDependencies": {
    "tsup": "^7.0.0",
    "typescript": "^4.9.5"
  }
}
