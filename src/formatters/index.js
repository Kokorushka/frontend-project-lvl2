import renderTree from './stylish.js';
import renderPlain from './plain.js';
import renderJson from './json.js';

const mapping = {
  stylish: renderTree,
  plain: renderPlain,
  json: renderJson,
};

export default (astTree, outputStyle) => mapping[outputStyle](astTree);
