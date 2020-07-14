require('dotenv').config();

module.exports = {
  node_dev: process.env.NODE_ENV !== 'production',
  port: process.env.port || 8000,
};
