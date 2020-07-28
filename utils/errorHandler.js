'use strict';

const chalk = require('chalk');

function errorHandler(error, show = false) {
  console.error(chalk.red(error));
  if (show) {
    throw new Error(error);
  } else {
    throw new Error('Something is Wrong');
  }
}

module.exports = errorHandler;
