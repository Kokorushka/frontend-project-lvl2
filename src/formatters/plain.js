import _ from 'lodash';

const transformValue = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  if (_.isString(value)) {
    return `'${value}'`;
  }
  return value;
};

const isNodeRoot = (diffTree, func) => {
  if (diffTree.type === 'root') {
    return func(diffTree.children, []);
  }
  return diffTree;
};

const renderPlain = (diffTree) => {
  const iter = (tree, acc) => {
    const plainTree = tree
      .filter((item) => item.type !== 'unchanged')
      .map((item) => {
        const {
          key,
          value,
          type,
          valueAfter,
          valueBefore,
          children,
        } = item;
        const propertyName = [...acc, key];
        switch (type) {
          case 'root':
            return `${iter(children, propertyName)}`;
          case 'added':
            return `Property '${propertyName.join('.')}' was added with value: ${transformValue(value)}`;
          case 'deleted':
            return `Property '${propertyName.join('.')}' was removed`;
          case 'changed':
            return `Property '${propertyName.join('.')}' was updated. From ${transformValue(valueBefore)} to ${transformValue(valueAfter)}`;
          case 'nested':
            return `${iter(children, propertyName)}`;
          default:
            return [];
        }
      });
    return plainTree.join('\n');
  };
  return isNodeRoot(diffTree, iter);
};
export default renderPlain;
