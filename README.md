### Requirements

* Added to [PATH](https://en.wikipedia.org/wiki/PATH_(variable)) NPM
* Globally installed [ESLint](https://www.npmjs.com/package/eslint)
* Installed [Git](https://git-scm.com/downloads)
  * Added to PATH Git

### Usage

```sh
npx new-typescript-module [<project-name>] [<project-directory>]
```

**Recommendation.** If you want to update version of any NPX-utility like this you should use [`clear-npx-cache`](https://www.npmjs.com/package/clear-npx-cache) utility. More information in `clear-npx-cache`'s readme.

Default `<project-name>` is `my-typescript-module`, default `<project-directory>` is `./<project-name>`.

Directory tree after call `npx new-typescript-module`:

```plain
<project-directory>
├ package.json
├ package-lock.json
├ README.md
├ tsconfig.dev.json
├ tsconfig.prod.json
├ .npmignore
├ .gitignore
├ .eslintrc
├ src
│ └ index.ts
├ lib
├ types
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

**Note.** I don't know why ESLint don't support global packages. Yeap, when you created a new typescript module you shall install on your drive too many files thoose can be installed globally.

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
    "lint": "eslint",
    "buildTsDev": "tsc -p tsconfig.dev.json",
    "buildDev": "npm run buildTsDev",
    "buildTsProd": "tsc -p tsconfig.prod.json",
    "buildProd": "npm run buildTsProd",
    "prepare": "rd /s /q lib && rd /s /q types && npm run buildProd"
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