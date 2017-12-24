const path = require('path');

module.exports = {
  root: path.join(__dirname, '..', '..'),
  url: 'http://localhost:3000',
  port: 3003,
  db: {
    host: 'localhost',
    user: 'bottle',
    password: 'bottle',
    database: 'bottle',
    port: 3306,
  },
  redis: {
    host: 'localhost',
    port: '6379',
    password: 'bottle',
    db: 1,
    namespaces: {
      session: 'bottle-se:session',
    },
  },
};
