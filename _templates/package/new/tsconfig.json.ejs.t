---
to: packages/<%= name %>/tsconfig.json
---
{
  "extends": "../../tsconfig.base.json",
  "compilerOptions": {
    "rootDir": "./src",
    "outDir": "./dist"
  },
  "include": ["src"],
  "exclude": ["node_modules", "src/**/*.spec.ts"]
}
