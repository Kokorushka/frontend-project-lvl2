import renderTree from './stylish.js';

const format = (tree, type) => {
  switch (type) {
    case 'stylish':
      return renderTree(tree);

    default:
      return 'something was going wrong';
  }
};

export default format;
