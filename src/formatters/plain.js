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

const renderPlain = (diffTree) => {
  const iter = (node, acc) => {
    const {
      key,
      value,
      type,
      valueAfter,
      valueBefore,
      children,
    } = node;
    const propertyName = [...acc, key];
    switch (type) {
      case 'added':
        return `Property '${propertyName.join('.')}' was added with value: ${transformValue(value)}`;
      case 'deleted':
        return `Property '${propertyName.join('.')}' was removed`;
      case 'changed':
        return `Property '${propertyName.join('.')}' was updated. From ${transformValue(valueBefore)} to ${transformValue(valueAfter)}`;
      case 'nested':
        return children
          .filter((child) => child.type !== 'unchanged')
          .map((child) => iter(child, propertyName))
          .join('\n');
      case 'root':
        return children
          .filter((child) => child.type !== 'unchanged')
          .map((child) => iter(child, acc))
          .join('\n');
      default:
        throw new Error(`Unknown type ${type} of node in the object`);
    }
  };
  return iter(diffTree, []);
};
export default renderPlain;
