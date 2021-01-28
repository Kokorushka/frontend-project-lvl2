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

const renderTree = (diffTree) => {
  const iter = (node, depth) => {
    const {
      key,
      value,
      type,
      valueAfter,
      valueBefore,
      children,
    } = node;
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
        return (`${genIndent(depth + indentSize)}${key}: {\n${(children.map((child) => iter(child, depth + indentSize))).join('\n')}\n${genIndent(depth + indentSize)}}`);
      case 'root':
        return (`{\n${(children.map((child) => iter(child, depth))).join('\n')}\n}`);
      default:
        throw new Error(`${type} in unknown`);
    }
  };
  return iter(diffTree, 0);
};
export default renderTree;
