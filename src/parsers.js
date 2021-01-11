import yaml from 'js-yaml';
import path from 'path';
import getContent from './getContent.js';

const parse = (filepath) => {
  const configPath = path.extname(filepath);
  const fileContent = getContent(filepath);
  switch (configPath) {
    case '.json':
      return JSON.parse(fileContent);
    case '.yml':
      return yaml.safeLoad(fileContent);
    default:
      return 'please use another format of files';
  }
};

export default parse;
