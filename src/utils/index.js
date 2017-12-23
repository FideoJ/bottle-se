const { inspect } = require('util');
const _ = require('lodash');
const AE = require('./AE');
const isInDev = process.env.NODE_ENV === 'development';
const isInProd = process.env.NODE_ENV === 'production';

exports = module.exports = {
  sendData,
  handleError,
  handleException,
  AE,
  exportRtr,
  pick: (obj, ...props) => _.pick(obj, props),
  isInDev,
  isInProd,
};

/**
 * 无抛出 err 时统一使用这个函数来发送响应
 * @param  {Context}  ctx
 * @param  {Object}   data
 * @param  {string}   status
 * @param  {string}   msg
 */
async function sendData(ctx, data, status, msg, code = 200) {
  if (data instanceof ME.SoftError) {
    ({
      status: status = 'BAD_REQUEST',
      msg: msg = '请求非法',
      code: code = 400,
    } = data.info || {});
    if (data.was === 'error') {
      ctx.paramData.extraMsg = inspect(data, { depth: null });
    } else if (data.was !== 'undefined') {
      ctx.paramData.extraMsg = data.message;
    }
    data = data.info.data || {};
  }
  const time = new Date();
  if (!ctx.headerSent) {
    ctx.status = code;
  }
  ctx.body = { status, msg, data, time };
}

/**
 * 有抛出 err 时统一使用这个函数来发送错误响应
 * @param  {Context}  ctx
 * @param  {Error}    e
 */
async function handleError(ctx, e) {
  const time = new Date();
  let stack = e.stack;
  const { status = 'UNKNOWN_ERROR', msg = '未知错误', code = 500 } = e.info || {};
  if (e.was === 'error') {
    ctx.paramData.extraMsg = inspect(e);
  } else if (e.was !== 'undefined') {
    ctx.paramData.extraMsg = e.message;
  }
  if (isInProd) stack = undefined;
  if (!ctx.headerSent) {
    ctx.status = code;
  }
  ctx.body = { status, msg, stack, time };
}

/**
 * 处理服务器或用户异常
 * @param  {Context}             ctx
 * @param  {{(): Promise<any>}}  next
 */
async function handleException(ctx, next) {
  try {
    await next();
  } catch (e) {
    if (e instanceof AE.SoftError) return sendData(ctx, e);
    return handleError(ctx, e);
  }
}

/**
 * 导出路由
 * @param   {KoaRouter}   router
 */
function exportRtr(router) {
  return router.routes();
}
