const BaseRedisStore = require('koa-redis');

class RedisStore extends BaseRedisStore {
  /**
   * 构造 RedisStore
   * @param {object} options
   */
  constructor(options) {
    super(options);
    this.namespace = options.namespace;
  }

  genSid(sid) {
    const self = this;
    return `${self.namespace}:${sid}`;
  }

  get(sid, ...args) {
    const self = this;
    return super.get(self.genSid(sid), ...args);
  }

  set(sid, ...args) {
    const self = this;
    return super.set(self.genSid(sid), ...args);
  }

  destroy(sid, ...args) {
    const self = this;
    return super.destroy(self.genSid(sid), ...args);
  }
}

exports = module.exports = RedisStore;
