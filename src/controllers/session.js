const md5 = require('md5');
const { AppError, sendData, pick } = require('../utils');
const User = require('../models/user');
const config = require('../config');

exports.create = async (ctx) => {
  delete ctx.session.curUser;

  const { body: { username, password } } = ctx.paramData;
  const [user] = await User.retrieveByUsername(username);

  if (!user || md5(password + config.userSalt) !== user.password) {
    throw new AppError.SoftError(AppError.FORBIDDEN, '用户名或密码错误');
  }
  const curUser = pick(user, 'user_id', 'username', 'nickname', 'gender', 'created_at');
  ctx.session.curUser = curUser;
  return sendData(ctx, curUser, 'OK', '登录成功');
};

exports.delete = async (ctx) => {
  delete ctx.session.curUser;
  return sendData(ctx, {}, 'OK', '登出成功');
};
