import _ from 'lodash';

const indentSize = 4;

const genIndent = (size) => {
  const indent = ' ';
  return indent.repeat(size);
};

const transformObject = (value, depth) => {
  if (!_.isObject(value)) {
    return value;
  }
  const keys = Object.keys(value);
  const result = keys.map((key) => `${genIndent(depth + indentSize * 2)}${key}: ${transformObject(value[key], depth + indentSize)}`);
  return `{\n${[...result, genIndent(depth + indentSize)].join('\n')}}`;
};

const isNodeRoot = (diffTree) => {
  if (diffTree.type === 'root') {
    return diffTree.children;
  }
  return diffTree;
};

const renderTree = (diffTree) => {
  const iter = (dataAst, depth) => {
    const result = dataAst.map((item) => {
      const {
        key,
        value,
        type,
        valueAfter,
        valueBefore,
        children,
      } = item;
      switch (type) {
        case 'added':
          return (`${genIndent(depth + indentSize - 2)}+ ${key}: ${transformObject(value, depth)}`);
        case 'deleted':
          return (`${genIndent(depth + indentSize - 2)}- ${key}: ${transformObject(value, depth)}`);
        case 'changed':
          return (`${genIndent(depth + indentSize - 2)}- ${key}: ${transformObject(valueBefore, depth)}\n${genIndent(depth + indentSize - 2)}+ ${key}: ${transformObject(valueAfter, depth)}`);
        case 'unchanged':
          return (`${genIndent(depth + indentSize)}${key}: ${transformObject(value, depth)}`);
        case 'nested':
          return (`${genIndent(depth + indentSize)}${key}: ${iter(children, depth + indentSize)}`);
        default:
          throw new Error(`${type} in unknown`);
      }
    });
    return `{\n${[...result, genIndent(depth)].join('\n')}}`;
  };
  return iter(isNodeRoot(diffTree), 0);
};
export default renderTree;
