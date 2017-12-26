const Router = require('koa-express-router');
const userCtrl = require('../controllers/user');
const { exportRtr } = require('../utils');

const router = new Router({ prefix: '/users' });

exports = module.exports = () => exportRtr(router);

// 登录
router.post('/', userCtrl.create);
router.route('/self')
  .get(userCtrl.retrieve)
  .put(userCtrl.update);
