const path = require('path');
const Router = require('koa-express-router');
const bodyParser = require('koa-bodyparser');

const { AE, isInDev, handleException } = require('../utils');
const RedisServ = require('../services/redis');

// 默认设置
Router.defaultOptions.mergeParams = true;

/**
 * @param {Application} app
 */
module.exports = (app) => {
  const sessionParser = getSessionParser(app);
  const apiRtr = new Router({ prefix: '/api' });
  apiRtr.use(
    sessionParser,
    getBodyParser(),
    checkIsInWhiteList,
    // 为了抛出异常时 session 也能写回数据库
    // 如果没有这个，异常会抛到最外面，跳过 sessionParser 中 await next() 后的写回阶段
    handleException,
    initParam,
    blockUnauthorized,
  );
  init(apiRtr);

  app.use(apiRtr.routes(false));
};

function getBodyParser() {
  const options = {
    jsonLimit: '10mb',
    textLimit: '10mb',
    /**
     *
     * @param {Error} e
     * @param {Context} ctx
     */
    onerror(e, ctx) {
      throw new AE.SoftError(AE.BAD_REQUEST, '请求解析失败', 422, e);
    },
  };
  return bodyParser(options);
}

function getSessionParser(app) {
  return RedisServ.session(app);
}

// 无需登录即可访问的 API
const whiteList = [
  '/api/users/login',
];

/**
 * 检查当前路径是否可以不检查登录
 * @param {Context} ctx
 * @param {{(): Promise<any>}} next
 */
async function checkIsInWhiteList(ctx, next) {
  ctx.isInWhiteList = whiteList.some(onePath => ctx.originalUrl.startsWith(onePath));
  return next();
}

/**
 * 初始化 paramData
 * @param {Context} ctx
 * @param {{(): Promise<any>}} next
 */
async function initParam(ctx, next) {
  // @ts-ignore
  ctx.paramData = {
    body: ctx.request.body,
    query: { ...ctx.request.query },
    session: ctx.session,
  };
  ctx.session.sessionID = ctx.cookies.get(ctx.sessionOptions.key);
  return next();
}

/**
 * @param {Context} ctx
 * @param {{(): Promise<any>}} next
 */
async function blockUnauthorized(ctx, next) {
  const hasLoggedin = ctx.session.user;
  if (ctx.isInWhiteList || hasLoggedin) {
    if (hasLoggedin) {
      ctx.paramData.curUser = ctx.paramData.user = ctx.session.user;
    }
    return next();
  }
  throw new AE.SoftError(AE.NOT_AUTHORIZED, '未登录');
}

function init(router) {
  const routers = [
    'user',
  ];
  routers.forEach((rtrName) => {
    const oneRtr = require(path.join(__dirname, rtrName));
    router.use(oneRtr());
  });

  router.use((ctx) => {
    if (ctx.body) return;
    throw new AE.SoftError(AE.NOT_FOUND, '啊呀, 迷路了');
  });
}
