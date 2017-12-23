const development = require('./env/development');
const test = require('./env/test');
const production = require('./env/production');

const { assign } = Object;
const map = {
  development,
  test,
  production,
};

function getConfig() {
  const { NODE_ENV = 'development' } = process.env;
  assign(process.env, { NODE_ENV });
  const config = map[NODE_ENV] || development;
  return config;
}

const config = getConfig();

exports = module.exports = config;
