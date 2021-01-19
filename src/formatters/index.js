import renderTree from './stylish.js';
import renderPlain from './plain.js';
import renderJson from './json.js';

const mapping = {
  stylish: renderTree,
  plain: renderPlain,
  json: renderJson,
};

export default (astTree, outputStyle) => {
  const format = mapping[outputStyle];
  if (!format) {
    throw new Error(`Указан несуществующий тип вывода данных ${outputStyle}`);
  }
  return format(astTree);
};
