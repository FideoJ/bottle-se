const session = require('koa-session');
const RedisStore = require('./koa-redis-store');
const config = require('../../config');
const ClientManager = require('./ClientManager');
const manager = new ClientManager();

const { namespaces: { session: namespace } } = config.redis;
const client = manager.getClient(1);

const options = {
  key: 'bottle-session-id',
  httpOnly: true,
  signed: false,
  secure: false,
  secret: config.sessionSecret,
  path: '/',
  maxAge: 3 * 60 * 60 * 1000,  // 3 小时,
  rolling: true,
  store: new RedisStore({ client, namespace }),
};

exports = module.exports = app => session(options, app);
