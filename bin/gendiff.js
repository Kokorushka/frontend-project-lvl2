#!/usr/bin/env node

const program = require('commander');

program
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0', '-V, --version', 'output the version number');

program
  .helpOption('-h, --help', 'output usage information');

program
  .arguments('<filepath1> <filepath2>')
  .option('-f --format [type]', 'output format')

program.parse(process.argv);