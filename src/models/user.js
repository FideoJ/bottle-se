const { queryDb } = require('../services/db');

exports.retrieveOneByUsername = async (username) => {
  const sql = `
    SELECT *
    FROM user
    WHERE username = ?
  `;
  const values = [username];
  return queryDb(sql, values);
};