const Router = require('koa-express-router');
const sessionCtrl = require('../controllers/session');
const { exportRtr } = require('../utils');

const router = new Router({ prefix: '/sessions' });

exports = module.exports = () => exportRtr(router);

router.post('/', sessionCtrl.create);
router.delete('/self', sessionCtrl.delete);
