import _ from 'lodash';

const genIndent = (indent, depth) => indent.repeat(depth * 2);

const transformObject = (value, depth) => {
  if (!_.isObject(value)) {
    return value;
  }
  const keys = Object.keys(value);
  const result = keys.map((key) => `${genIndent(' ', depth + 4)}${key}: ${transformObject(value[key], depth + 2)}`);
  return `{\n${[...result, genIndent(' ', depth + 2)].join('\n')}}`;
};

const renderTree = (diffTree) => {
  const iter = (dataAst, depth) => {
    const indent = ' ';
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
          return (`${genIndent(indent, depth + 1)}+ ${key}: ${transformObject(value, depth)}`);
        case 'deleted':
          return (`${genIndent(indent, depth + 1)}- ${key}: ${transformObject(value, depth)}`);
        case 'changed':
          return (`${genIndent(indent, depth + 1)}- ${key}: ${transformObject(valueBefore, depth)}\n${genIndent(indent, depth + 1)}+ ${key}: ${transformObject(valueAfter, depth)}`);
        case 'unchanged':
          return (`${genIndent(indent, depth + 1)}  ${key}: ${transformObject(value, depth)}`);
        case 'nested':
          return (`${genIndent(indent, depth + 1)}  ${key}: ${iter(children, depth + 2)}`);
        default:
          return `${type} in unknown`;
      }
    });
    return `{\n${[...result, genIndent(indent, depth)].join('\n')}}`;
  };
  return iter(diffTree, 0);
};
export default renderTree;
