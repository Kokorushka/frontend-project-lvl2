import renderTree from './stylish.js';
import renderPlain from './plain.js';
import renderJson from './json.js';

const format = (tree, type) => {
  switch (type) {
    case 'stylish':
      return renderTree(tree);
    case 'plain':
      return renderPlain(tree);
    case 'json':
      return renderJson(tree);
    default:
      return 'error in formatters/index.js';
  }
};

export default format;
