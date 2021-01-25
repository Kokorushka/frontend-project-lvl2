import _ from 'lodash';

const buildNode = (data1, data2) => {
  const keys = _.sortBy(_.union(Object.keys(data1), Object.keys(data2)));
  const ast = keys.map((key) => {
    if (!_.has(data1, key)) {
      return {
        key,
        type: 'added',
        value: data2[key],
      };
    }
    if (!_.has(data2, key)) {
      return {
        key,
        type: 'deleted',
        value: data1[key],
      };
    }
    if (_.isPlainObject(data1[key]) && _.isPlainObject(data2[key])) {
      return {
        key,
        children: buildNode(data1[key], data2[key]),
        type: 'nested',
      };
    }
    if (!_.isEqual(data1[key], data2[key])) {
      return {
        key,
        type: 'changed',
        valueAfter: data2[key],
        valueBefore: data1[key],
      };
    }
    return {
      key,
      type: 'unchanged',
      value: data2[key],
    };
  });
  return ast;
};

export default (data1, data2) => ({ type: 'root', children: buildNode(data1, data2) });
