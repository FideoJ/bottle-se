const { queryDb } = require('../services/db');
const { jsonParseProps, pick, deleteProps } = require('../utils');

exports.create = async (content, style, location, owner_id) => {
  location = JSON.stringify(location);
  const sql = `
    INSERT INTO bottle
    (content, style, location, owner_id)
    VALUES (?, ?, ?, ?);
  `;
  const values = [content, style, location, owner_id];
  return queryDb(sql, values);
};

exports.retrieveOne = async (bottle_id) => {
  const sql = `
    SELECT bottle_id, content, style, location, bottle.created_at, user_id, username, nickname, gender
    FROM bottle
    INNER JOIN user
    ON bottle.owner_id = user.user_id
    WHERE bottle_id = ?;
  `;
  const values = [bottle_id];
  const bottles = await queryDb(sql, values);
  jsonParseProps(bottles, 'location');
  bottles.forEach((bottle) => {
    bottle.owner = pick(bottle, 'user_id', 'username', 'nickname', 'gender');
    deleteProps(bottle, 'user_id', 'username', 'nickname', 'gender');
  });
  return bottles;
};

exports.retrieveNearby = async (latitude, longitude, latitude_span, longitude_span) => {
  const sql = `
    SELECT bottle_id, style, location
    FROM bottle
    WHERE ABS(location->"$.latitude" - ?) <= ?
    AND ABS(location->"$.longitude" - ?) <= ?;
  `;
  const values = [latitude, latitude_span, longitude, longitude_span];
  const bottles = await queryDb(sql, values);
  jsonParseProps(bottles, 'location');
  return bottles;
};

exports.retrieveSelfCreated = async (user_id) => {
  const sql = `
    SELECT bottle_id, content, style, location, created_at, COUNT(*) AS openers_count
    FROM bottle_open
    NATURAL JOIN bottle
    WHERE bottle.owner_id = ?
    GROUP BY bottle_id;
  `;
  const values = [user_id];
  const bottles = await queryDb(sql, values);
  jsonParseProps(bottles, 'location');
  return bottles;
};

exports.retrieveSelfOpened = async (user_id) => {
  const sql = `
    SELECT bottle_id, open_at, content, style, location, bottle.created_at, user_id, username, nickname, gender
    FROM bottle_open
    NATURAL JOIN bottle
    INNER JOIN user
    ON bottle.owner_id = user.user_id
    WHERE opener_id = ?
  `;
  const values = [user_id];
  const bottles = await queryDb(sql, values);
  jsonParseProps(bottles, 'location');
  bottles.forEach((bottle) => {
    bottle.owner = pick(bottle, 'user_id', 'username', 'nickname', 'gender');
    deleteProps(bottle, 'user_id', 'username', 'nickname', 'gender');
  });
  return bottles;
};

exports.openOneBottle = async (bottle_id, opener_id) => {
  const sql = `
    INSERT INTO bottle_open
    (bottle_id, opener_id)
    VALUES (?, ?);
  `;
  const values = [bottle_id, opener_id];
  return queryDb(sql, values);
};

exports.retrieveOpenersOfOneBottle = async (bottle_id) => {
  const sql = `
    SELECT open_at, user_id, username, nickname, gender
    FROM bottle_open
    INNER JOIN user
    ON bottle_open.opener_id = user.user_id
    WHERE bottle_id = ?;
  `;
  const values = [bottle_id];
  return queryDb(sql, values);
};
