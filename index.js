import _ from 'lodash';
import format from './src/parsers.js';

const sortObjectbyKeys = (obj) => {
  const sorted = {};
  Object.keys(obj).sort().forEach((key) => {
    sorted[key] = obj[key];
  });
  return sorted;
};

const switchCompare = (mergedFile, sourceFile1, sourceFile2) => {
  const sortedMergedF = sortObjectbyKeys(mergedFile);
  const result = Object.keys(sortedMergedF).reduce((acc, key) => {
    if (_.has(sourceFile1, key) && _.has(sourceFile2, key)
    && sourceFile1[key] === sourceFile2[key]) {
      acc.push(`  ${key}: ${sourceFile1[key]}`);
    } else if (_.has(sourceFile1, key) && _.has(sourceFile2, key)
      && sourceFile1[key] !== sourceFile2[key]) {
      acc.push(`- ${key}: ${sourceFile1[key]}`);
      acc.push(`+ ${key}: ${sourceFile2[key]}`);
    } else if ((_.has(sourceFile1, key)) && (!_.has(sourceFile2, key))) {
      acc.push(`- ${key}: ${sourceFile1[key]}`);
    } else if ((!_.has(sourceFile1, key)) && (_.has(sourceFile2, key))) {
      acc.push(`+ ${key}: ${sourceFile2[key]}`);
    }
    return acc;
  }, []);
  return `{\n${result.join('\n')}\n}`;
};

const genDiff = (filePath1, filePath2) => {
  const file1 = format(filePath1);
  const file2 = format(filePath2);
  const mergedFile = { ...file1, ...file2 };
  const result = switchCompare(mergedFile, file1, file2);
  return result;
};

export default genDiff;
