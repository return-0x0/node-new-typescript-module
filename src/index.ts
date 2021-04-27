#!/usr/bin/env node

import * as fs from 'fs';
import { execSync } from 'child_process';

type ApplicationArgs = {
    named: {[name: string]: string},
    positioned: string[]
};
function parseArgs(args: string[]): ApplicationArgs {
    const result: ApplicationArgs = {
        named: {},
        positioned: []
    };
    for (var i = 0; i < args.length; i++) {
        const arg = args[i];

        if (arg.startsWith('-')) {
            const name = arg;
            const value = args.length - i < 1 ? null : args[++i];

            Object.defineProperty(result.named, name, {
                value: value,
                writable: true,
                enumerable: true,
                configurable: true
            });
        }
        else
            result.positioned.push(arg);
    }

    return result;
}

const args = parseArgs(process.argv.slice(2));
const projectName = args.positioned.length < 1 ? 'my-typescript-module' : args.positioned[0];
const directory = args.positioned.length < 2 ? './' + projectName : args.positioned[1];

const NEW_LINE = process.platform === 'win32' ? '\r\n' : '\n';

fs.mkdirSync(directory);
process.chdir(directory);
fs.mkdirSync('src');

fs.writeFileSync('package.json', [
    '{',
    `\t"name": "${projectName}",`,
    '\t"version": "1.0.0",',
    '\t"main": "lib/index.js",',
    '\t"types": "types/index.d.ts",',
    '\t"description": "",',
    '\t"keywords": [],',
    '\t"author": "",',
    '\t"license": "ISC",',
    '\t"scripts": {',
    '\t\t"lint": "eslint",',
    '\t\t"buildTsDev": "tsc -p tsconfig.dev.json",',
    '\t\t"buildDev": "npm run buildTsDev",',
    '\t\t"buildTsProd": "tsc -p tsconfig.prod.json",',
    '\t\t"buildProd": "npm run buildTsProd",',
    process.platform === 'win32'
        ? '\t\t"prepare": "rd /s /q lib && rd /s /q types && npm run buildProd"'
        : '\t\t"prepare": "rm -r lib && rm -r types && npm run buildProd"',
    '\t}',
    '}'
].map(line => line.replace('\t', ' '.repeat(2))).join(NEW_LINE));

fs.writeFileSync('tsconfig.dev.json', [
    '{',
    '\t"src": ["src/**/*.ts"],',
    '\t"compilerOptions": {',
    '\t\t"outDir": "lib",',
    '\t\t"target": "es5",',
    '\t\t"module": "commonjs",',
    '\t\t"moduleResolution": "node",',
    '\t\t"lib": ["es2020", "dom"],',
    '\t\t"declaration": true,',
    '\t\t"declarationDir": "types",',
    '\t\t"strict": true,',
    '\t\t"sourceMap": true',
    '\t}',
    '}'
].map(line => line.replace('\t', ' '.repeat(4))).join(NEW_LINE));

fs.writeFileSync('tsconfig.prod.json', [
    '{',
    '\t"src": ["src/**/*.ts"],',
    '\t"compilerOptions": {',
    '\t\t"outDir": "lib",',
    '\t\t"target": "es5",',
    '\t\t"module": "commonjs",',
    '\t\t"moduleResolution": "node",',
    '\t\t"lib": ["es2020", "dom"],',
    '\t\t"declaration": true,',
    '\t\t"declarationDir": "types",',
    '\t\t"strict": true',
    '\t}',
    '}'
].map(line => line.replace('\t', ' '.repeat(4))).join(NEW_LINE));

fs.writeFileSync('.npmignore', [
    'src',
    'package-lock.json',
    '.gitignore',
    '.npmignore',
    'node_modules',
    'tsconfig.*.json',
    '.eslintrc'
].join(NEW_LINE));

fs.writeFileSync('.gitignore', [
    'node_modules',
    'package-lock.json',
    'lib',
    'types'
].join(NEW_LINE));

fs.writeFileSync('.eslintrc', [
    '{',
    '\t"parser": "@typescript-eslint/parser",',
    '\t"rules": {',
    '\t\t"semi": ["warn", "always"],',
    '\t\t"no-extra-semi": "warn",',
    '\t\t"quotes": ["warn", "single"]',
    '\t}',
    '}'
].map(line => line.replace('\t', ' '.repeat(4))).join(NEW_LINE));

fs.writeFileSync('README.md', '');
fs.writeFileSync('src/index.ts', '');

execSync('npm i -D @types/node typescript @typescript-eslint/parser');
execSync('git init');