import yaml from 'js-yaml';
// import fs from 'fs';
import path from 'path';
import getContent from './getContent.js';
// import ini from 'ini';

const format = (filepath) => {
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

export default format;
