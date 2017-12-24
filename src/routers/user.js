const Router = require('koa-express-router');
const userCtrl = require('../controllers/user');
const { exportRtr } = require('../utils');

const router = new Router({ prefix: '/users' });

exports = module.exports = () => exportRtr(router);

// 登录
router.route('/login')
  .get(userCtrl.isLogin);
//   .post(
//     userCtrl.login,
//   );

// // 登出
// router.post('/logout', userCtrl.logout);

// // 修改密码
// router.post('/password',
//   userCtrl.updatePassword,
// );

// router.route('/profile')
//   // 获取用户信息
//   .get(userCtrl.getProfile)
//   // 修改用户信息
//   .post(
//     userCtrl.updateProfile,
//   );
