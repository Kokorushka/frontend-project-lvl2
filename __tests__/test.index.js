import { test, expect, describe } from '@jest/globals';
import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import genDiff from '../index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const getContent = (filePath) => fs.readFileSync(filePath, 'utf-8');
describe('nested format', () => {
  test('nested json', () => {
    expect(genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'stylish')).toEqual(getContent(getFixturePath('nestedResult.txt')).trim());
  });
  test('nested yaml', () => {
    expect(genDiff(getFixturePath('file1.yml'), getFixturePath('file2.yml'), 'stylish')).toEqual(getContent(getFixturePath('nestedResult.txt').trim()));
  });
});

describe('plain format', () => {
  test('plain format', () => {
    expect(genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'plain')).toEqual(getContent(getFixturePath('plainResult.txt')).trim());
  });
  test('plain format yaml', () => {
    expect(genDiff(getFixturePath('file1.yml'), getFixturePath('file2.yml'), 'plain')).toEqual(getContent(getFixturePath('plainResult.txt')).trim());
  });
});

describe('json format', () => {
  test('json format', () => {
    expect(genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'json')).toEqual(getContent(getFixturePath('jsonResult.txt')).trim());
  });
  test('json format yaml', () => {
    expect(genDiff(getFixturePath('file1.yml'), getFixturePath('file2.yml'), 'json')).toEqual(getContent(getFixturePath('jsonResult.txt')).trim());
  });
});
