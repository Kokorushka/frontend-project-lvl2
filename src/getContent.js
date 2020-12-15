import fs from 'fs';

const getContent = (filePath) => JSON.parse(fs.readFileSync(filePath, 'utf-8'));

export default getContent;
