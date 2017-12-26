const redis = require('redis');
const { redis: redisConfig } = require('../../config');
const { isInDev, assign } = require('../../utils');
const { logger } = require('../../utils/logger');

class ClientManager {
  constructor() {
    this.connections = [];
  }

  getClient(id, config = {}) {
    const self = this;
    if (self.connections[id]) {
      return self.connections[id];
    }
    const client = self.createClient(config);
    self.connections[id] = client;
    return client;
  }

  createClient(config = {}) {
    const self = this;
    config = assign(self.getDefaultConfig(), config);
    const client = redis.createClient(config);
    client.on('error', (e) => {
      logger.error('[redis climgr] Redis 查询出错', e.stack);
    });
    return client;
  }

  getDefaultConfig() {
    const self = this;
    return redisConfig;
  }
}

exports = module.exports = ClientManager;
