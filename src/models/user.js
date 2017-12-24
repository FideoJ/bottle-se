const { queryDb } = require('../services/db');
const md5 = require('md5');
const config = require('../config');

exports.retrieveByUsername = async (username) => {
  const sql = `
    SELECT *
    FROM user
    WHERE username = ?
  `;
  const values = [username];
  return queryDb(sql, values);
};

exports.create = async (username, password, nickname, gender) => {
  password = md5(password + config.userSalt);
  const sql = `
    INSERT INTO user
    (username, password, nickname, gender)
    VALUES (?, ?, ?, ?);
  `;
  const values = [username, password, nickname, gender];
  return queryDb(sql, values);
};

exports.update = async (user_id, password, nickname, gender) => {
  password = md5(password + config.userSalt);
  const sql = `
    UPDATE user
    SET password = ?, nickname = ?, gender = ?
    WHERE user_id = ?;
  `;
  const values = [password, nickname, gender, user_id];
  return queryDb(sql, values);
};
