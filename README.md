### Requirements

* Added to [PATH](https://en.wikipedia.org/wiki/PATH_(variable)) NPM
* Installed [Git](https://git-scm.com/downloads)
  * Added to PATH Git

### Usage

```sh
npx new-typescript-module [<project-name>] [<project-directory>]
```

Default `<project-name>` is `my-typescript-module`, default `<project-directory>` is `./<project-name>`.

Directory tree after call `npx new-typescript-module`:

```plain
<project-directory>
├ package.json
├ README.md
├ tsconfig.dev.json
├ tsconfig.prod.json
├ .npmignore
├ .gitignore
├ .eslintrc
├ src
│ └ index.ts
├ node_modules
│ └ ...
└ .git
  └ ...
```

The `<project-directory>/.git` directory is hidden.

Side calls (at `<project-directory>`):

```sh
npm i -D @types/node typescript @typescript-eslint/parser
git init
```

### `package.json`

```plain
{
  "name": "<project-name>",
  "version": "1.0.0",
  "main": "index.js",
  "description": "",
  "keywords": [],
  "author": "",
  "license": "ISC",
  "scripts": {
    "buildTsDev": "tsc -p tsconfig.dev.json",
    "buildDev": "npm run buildTsDev",
    "buildTsProd": "tsc -p tsconfig.prod.json",
    "buildProd": "npm run buildTsProd",
    "prepare": "del /q lib && del /q types && npm run buildProd"
    // or
    "prepare": "rm -r lib && rm -r types && npm run buildProd"
  },
  "devDependencies": {
    "@types/node": ...,
    "@typescript-eslint/parser": ...,
    "typescript": ...
  }
}
```