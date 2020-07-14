const chalk = require('chalk');

function errorHandler(error) {
  console.error(chalk.red(error));
  throw new Error('Fallo en la operacion del servidor');
}

module.exports = errorHandler;
