const { sendData } = require('../utils');

/**
 * 判断是否登录
 * @param  {Context}    ctx
 * @param  {function}   next
 */
exports.isLogin = async (ctx, next) => {
  // const { user } = ctx.session;
  // if (user) {
  //   const profile = UserServ.refactorOne.forProfile(user);
  //   const meta = await UserServ.getLoginExtraMeta(user.user_id);
  //   return sendData(ctx, { ...profile, ...meta }, 'OK', '已登录');
  // }
  return sendData(ctx, {}, 'UNAUTHORIZED', '未登录');
};
