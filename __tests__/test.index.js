import { test, expect } from '@jest/globals';
// import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import genDiff from '../index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
// const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');
const expectedResult = `{
- follow: false
  host: hexlet.io
- proxy: 123.234.53.22
- timeout: 50
+ timeout: 20
+ verbose: true
}`;
test('flat_json', () => {
  expect(genDiff(getFixturePath('before.json'), getFixturePath('after.json'))).toEqual(expectedResult);
});
test('flat yaml', () => {
  expect(genDiff(getFixturePath('before.yml'), getFixturePath('after.yml'))).toEqual(expectedResult);
});
