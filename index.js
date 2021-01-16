import _ from 'lodash';
import parse from './src/parsers.js';
import format from './src/formatters/index.js';

const compare = (file1, file2) => {
  const keys = _.union(Object.keys(file1), Object.keys(file2));
  const result = keys.map((key) => {
    if (!_.has(file1, key)) {
      return { key, status: 'added', value: file2[key] };
    }
    if (!_.has(file2, key)) {
      return { key, status: 'deleted', value: file1[key] };
    }
    if (_.isObject(file1[key]) && _.isObject(file2[key])) {
      return { key, children: compare(file1[key], file2[key]), status: 'nested' };
    }
    if (file1[key] === file2[key]) {
      return { key, status: 'unchanged', value: file2[key] };
    }
    if (file1[key] !== file2[key]) {
      return {
        key, status: 'changed', valueAfter: file2[key], valueBefore: file1[key],
      };
    }
    return ('something was going wrong');
  });
  return result;
};
const genDiff = (filePath1, filePath2, type = 'stylish') => {
  const file1 = parse(filePath1);
  const file2 = parse(filePath2);
  const difference = compare(file1, file2);
  return format(difference, type);
};

export default genDiff;
