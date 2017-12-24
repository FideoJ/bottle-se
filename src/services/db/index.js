const mysql = require('mysql');
const { promisifyAll } = require('bluebird');
const { AppError } = require('../../utils');
const config = require('../../config');

promisifyAll(require('mysql/lib/Connection').prototype);
promisifyAll(require('mysql/lib/Pool').prototype);

const Pool = mysql.createPool(config.db, { connectionLimit: 10 });

exports = module.exports = {
  getConn,
  queryDb,
};

/**
 * 在数据库连接池中申请连接
 * @return {Promise<Object>}       连接
 */
async function getConn() {
  try {
    const conn = await Pool.getConnectionAsync();
    return conn;
  } catch (e) {
    throw new AppError.HardError(AppError.INTERNAL_ERROR, '数据库连接出错', 500, e);
  }
}

/**
 * 查询数据库
 * @param  {string}              sql      数据库查询语句
 * @param  {any[]}               values   参数值
 * @param  {Object}              [conn]   数据库连接。传入时使用该连接，不传入的话直接用Pool
 * @return {Promise<any|any[]>}              查询结果
 */
async function queryDb(sql, values, conn) {
  // 若传入连接则使用该连接，否则默认使用连接池
  if (!conn) conn = Pool;
  try {
    return await conn.queryAsync(sql, values);
  } catch (e) {
    e.stack += `\n---------\n${e.sqlmessage}:\n${e.sql}\n---------`;
    throw new AppError.HardError(AppError.INTERNAL_ERROR, '数据库查询出错', 500, e);
  }
}
