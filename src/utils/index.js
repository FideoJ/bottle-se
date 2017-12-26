const { inspect } = require('util');
const lodash = require('lodash');
const AppError = require('./AppError');

const isInDev = process.env.NODE_ENV === 'development';
const isInProd = process.env.NODE_ENV === 'production';
const { assign } = Object;

exports = module.exports = {
  sendData,
  handleError,
  handleException,
  AppError,
  exportRtr,
  pick: (obj, ...props) => lodash.pick(obj, props),
  isInDev,
  isInProd,
  assign,
  strsToNums,
  jsonParseProps,
  undefineProps,
  isPositiveInt: '([1-9][0-9]{0,})',
};

/**
 * 无抛出 err 时统一使用这个函数来发送响应
 * @param  {Context}  ctx
 * @param  {Object}   data
 * @param  {string}   status
 * @param  {string}   msg
 */
async function sendData(ctx, data, status, msg, code = 200) {
  if (data instanceof AppError.SoftError) {
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
  if (!ctx.headerSent) {
    ctx.status = code;
  }
  ctx.body = { status, msg, data };
}

/**
 * 有抛出 err 时统一使用这个函数来发送错误响应
 * @param  {Context}  ctx
 * @param  {Error}    e
 */
async function handleError(ctx, e) {
  let { stack } = e;
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
  ctx.body = { status, msg, stack };
}

/**
 * 处理软异常和硬异常
 * @param  {Context}             ctx
 * @param  {{(): Promise<any>}}  next
 */
async function handleException(ctx, next) {
  try {
    await next();
  } catch (e) {
    if (e instanceof AppError.SoftError) return sendData(ctx, e);
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

/**
 * 将传入的字符串依次转换为Number类型
 * @param   {...string}   strs
 */
function strsToNums(...strs) {
  const ret = [];
  strs.forEach(str => ret.push(Number(str)));
  return ret;
}

/**
 * 对传入的数组里的每个对象JSON.parse某些属性
 * @param   {Object[]}   arr
 * @param   {...string}  props
 */
function jsonParseProps(arr, ...props) {
  arr.forEach((ele) => {
    props.forEach((prop) => {
      ele[prop] = JSON.parse(ele[prop]);
    });
  });
}

/**
 * 将obj的某些属性设置为undefined，相比直接删除可能会提高垃圾回收的效率
 * @param   {Object}     obj
 * @param   {...string}  props
 */
function undefineProps(obj, ...props) {
  if (!obj) return;
  props.forEach((prop) => {
    obj[prop] = undefined;
  });
}
