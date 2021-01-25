const isNodeRoot = (diffTree) => {
  if (diffTree.type === 'root') {
    return diffTree.children;
  }
  return diffTree;
};

const renderJson = (diffTree) => JSON.stringify(isNodeRoot(diffTree));

export default renderJson;
