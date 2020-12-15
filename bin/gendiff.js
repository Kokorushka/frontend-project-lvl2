#!/usr/bin/env node

import program from 'commander';
import compareFiles from '../index.js';

program
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0', '-V, --version', 'output the version number');

program
  .helpOption('-h, --help', 'output usage information');

program
  .arguments('<filepath1> <filepath2>')
  .option('-f --format [type]', 'output format')
  .action((filepath1, filepath2) => console.log(compareFiles(filepath1, filepath2)));

program.parse(process.argv);
