import fs from 'fs';
import path from 'path';
import parse from './parsers.js';
import format from './formatters/index.js';
import astBuilder from './astBuilder.js';

const getContent = (filePath) => fs.readFileSync(filePath, 'utf-8');

const getFileType = (filePath) => path.extname(filePath).slice(1);

const genDiff = (filePath1, filePath2, outputStyle = 'stylish') => {
  const fileContent1 = getContent(filePath1);
  const fileContent2 = getContent(filePath2);
  const dataType1 = getFileType(filePath1);
  const dataType2 = getFileType(filePath2);
  const data1 = parse(fileContent1, dataType1);
  const data2 = parse(fileContent2, dataType2);
  const difference = astBuilder(data1, data2);
  return format(difference, outputStyle);
};

export default genDiff;
