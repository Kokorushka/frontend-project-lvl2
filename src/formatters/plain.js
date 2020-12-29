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
  const iter = (tree, acc) => {
    const plainTree = tree
      .filter((item) => item.status !== 'unchanged')
      .map((item) => {
        const {
          key,
          value,
          status,
          valueAfter,
          valueBefore,
          children,
        } = item;
        const newAcc = [...acc, key];
        if (status === 'added') {
          return `Property '${newAcc.join('.')}' was added with value: ${transformValue(value)}`;
        }
        if (status === 'deleted') {
          return `Property '${newAcc.join('.')}' was removed`;
        }
        if (status === 'changed') {
          return `Property '${newAcc.join('.')}' was updated. From ${transformValue(valueBefore)} to ${transformValue(valueAfter)}`;
        }
        if (status === 'nested') {
          return `${iter(children, newAcc)}`;
        }
        return [];
      });
    return plainTree.join('\n');
  };
  return iter(diffTree, []);
};
export default renderPlain;
