import yaml from 'js-yaml';

const mapping = {
  json: JSON.parse,
  yml: yaml.safeLoad,
};

export default (data, dataType) => {
  const parse = mapping[dataType];

  if (!parse) {
    throw new Error(`Файлы данного формата ${dataType} не поддерживается`);
  }
  return parse(data);
};
