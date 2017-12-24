const { sendData, AppError } = require('../utils');
const User = require('../models/user');

exports.create = async (ctx) => {
  const { body: { username, password, nickname, gender } } = ctx.paramData;
  const [user] = await User.retrieveByUsername(username);

  if (user) {
    throw new AppError.SoftError(AppError.CONFLICT_USERNAME, `用户名${username}已存在`);
  }

  const { insertId } = await User.create(username, password, nickname, gender);
  const curUser = { user_id: insertId, username, nickname, gender };
  return sendData(ctx, curUser, 'OK', `用户${username}注册成功`);
};

exports.retrieve = async (ctx) => {
  const { curUser } = ctx.session;
  return sendData(ctx, curUser, 'OK', '获取用户资料成功');
};

exports.update = async (ctx) => {
  const { curUser: { user_id, username } } = ctx.session;
  const { body: { password, nickname, gender } } = ctx.paramData;
  await User.update(user_id, password, nickname, gender);

  const curUser = { user_id, username, nickname, gender };
  ctx.session.curUser = curUser;
  return sendData(ctx, curUser, 'OK', '更新用户资料成功');
};
