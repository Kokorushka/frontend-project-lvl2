import fs from 'fs';

const getContent = (filePath) => fs.readFileSync(filePath, 'utf-8');

export default getContent;
