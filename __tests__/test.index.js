import { test, expect } from '@jest/globals';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import genDiff from '../index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const expectedResult = `{
    common: {
      + follow: false
        setting1: Value 1
      - setting2: 200
      - setting3: true
      + setting3: null
      + setting4: blah blah
      + setting5: {
            key5: value5
        }
        setting6: {
            doge: {
              - wow: 
              + wow: so much
            }
            key: value
          + ops: vops
        }
    }
    group1: {
      - baz: bas
      + baz: bars
        foo: bar
      - nest: {
            key: value
        }
      + nest: str
    }
  - group2: {
        abc: 12345
        deep: {
            id: 45
        }
    }
  + group3: {
        fee: 100500
        deep: {
            id: {
                number: 45
            }
        }
    }
}`;
const expectedPlain = `Property 'common.follow' was added with value: false
Property 'common.setting2' was removed
Property 'common.setting3' was updated. From true to null
Property 'common.setting4' was added with value: 'blah blah'
Property 'common.setting5' was added with value: [complex value]
Property 'common.setting6.doge.wow' was updated. From '' to 'so much'
Property 'common.setting6.ops' was added with value: 'vops'
Property 'group1.baz' was updated. From 'bas' to 'bars'
Property 'group1.nest' was updated. From [complex value] to 'str'
Property 'group2' was removed
Property 'group3' was added with value: [complex value]`;
const expectedJson = '[{"key":"common","children":[{"key":"follow","status":"added","value":false},{"key":"setting1","status":"unchanged","value":"Value 1"},{"key":"setting2","status":"deleted","value":200},{"key":"setting3","status":"changed","valueAfter":null,"valueBefore":true},{"key":"setting4","status":"added","value":"blah blah"},{"key":"setting5","status":"added","value":{"key5":"value5"}},{"key":"setting6","children":[{"key":"doge","children":[{"key":"wow","status":"changed","valueAfter":"so much","valueBefore":""}],"status":"nested"},{"key":"key","status":"unchanged","value":"value"},{"key":"ops","status":"added","value":"vops"}],"status":"nested"}],"status":"nested"},{"key":"group1","children":[{"key":"baz","status":"changed","valueAfter":"bars","valueBefore":"bas"},{"key":"foo","status":"unchanged","value":"bar"},{"key":"nest","status":"changed","valueAfter":"str","valueBefore":{"key":"value"}}],"status":"nested"},{"key":"group2","status":"deleted","value":{"abc":12345,"deep":{"id":45}}},{"key":"group3","status":"added","value":{"fee":100500,"deep":{"id":{"number":45}}}}]';

test('nested json', () => {
  expect(genDiff(getFixturePath('before.json'), getFixturePath('after.json'), 'stylish')).toEqual(expectedResult);
});
test('nested yaml', () => {
  expect(genDiff(getFixturePath('before.yml'), getFixturePath('after.yml'), 'stylish')).toEqual(expectedResult);
});
test('plain format', () => {
  expect(genDiff(getFixturePath('before.json'), getFixturePath('after.json'), 'plain')).toEqual(expectedPlain);
});
test('plain format yaml', () => {
  expect(genDiff(getFixturePath('before.yml'), getFixturePath('after.yml'), 'plain')).toEqual(expectedPlain);
});
test('json format', () => {
  expect(genDiff(getFixturePath('before.json'), getFixturePath('after.json'), 'json')).toEqual(expectedJson);
});
test('json format yaml', () => {
  expect(genDiff(getFixturePath('before.yml'), getFixturePath('after.yml'), 'json')).toEqual(expectedJson);
});
