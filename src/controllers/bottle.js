const { sendData, AppError, strsToNums } = require('../utils');
const Bottle = require('../models/bottle');

exports.create = async (ctx) => {
  const { content, style, location } = ctx.paramData.body;
  const { user_id } = ctx.session.curUser;
  const { insertId } = await Bottle.create(content, style, location, user_id);
  const bottle = { bottle_id: insertId, content, style, location };
  return sendData(ctx, bottle, 'OK', '创建漂流瓶成功');
};

exports.retrieveNearby = async (ctx) => {
  let { latitude, longitude, latitude_span, longitude_span } = ctx.paramData.query;
  [latitude, longitude, latitude_span, longitude_span]
    = strsToNums(latitude, longitude, latitude_span, longitude_span);
  const bottles = await Bottle.retrieveNearby(latitude, longitude, latitude_span, longitude_span);
  const data = {
    center: { latitude, longitude },
    span: { latitude: latitude_span, longitude: longitude_span },
    bottles,
  };
  return sendData(ctx, data, 'OK', '查询附近的漂流瓶成功');
};

exports.retrieveSelfCreated = async (ctx) => {
  const { curUser: { user_id } } = ctx.session;
  const bottles = await Bottle.retrieveSelfCreated(user_id);
  return sendData(ctx, { bottles }, 'OK', '查询创建的漂流瓶列表成功');
};

exports.retrieveSelfOpened = async (ctx) => {
  const { curUser: { user_id } } = ctx.session;
  const bottles = await Bottle.retrieveSelfOpened(user_id);
  return sendData(ctx, { bottles }, 'OK', '查询打开的漂流瓶列表成功');
};

exports.parseOneBottle = async (ctx, next, bottle_id) => {
  const [bottle] = await Bottle.retrieveOne(bottle_id);
  if (!bottle) {
    throw new AppError.SoftError(AppError.NOT_FOUND, `漂流瓶${bottle_id}不存在`);
  }
  ctx.paramData.bottle = bottle;
  return next();
};

exports.openOneBottle = async (ctx) => {
  const { bottle, bottle: { bottle_id, owner: { user_id: owner_id } } } = ctx.paramData;
  const { curUser: { user_id } } = ctx.session;
  if (owner_id === user_id) {
    return sendData(ctx, bottle, 'OK', '打开漂流瓶成功');
  }
  try {
    await Bottle.openOneBottle(bottle_id, user_id);
  } catch (err) {
    if (err.code !== 'ER_DUP_ENTRY') {
      throw err;
    }
  }
  return sendData(ctx, bottle, 'OK', '打开漂流瓶成功');
};

exports.retrieveOpenersOfOneBottle = async (ctx) => {
  const { bottle: { bottle_id, owner: { user_id: owner_id } } } = ctx.paramData;
  const { curUser: { user_id } } = ctx.session;
  if (owner_id !== user_id) {
    throw new AppError.SoftError(AppError.FORBIDDEN, '您不是该瓶子的主人');
  }
  const openers = await Bottle.retrieveOpenersOfOneBottle(bottle_id);
  return sendData(ctx, { openers_count: openers.length, openers }, 'OK', '查询漂流瓶的打开者列表成功');
};
