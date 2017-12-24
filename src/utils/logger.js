const moment = require('moment');

const logger = console;
const isInDev = process.env.NODE_ENV === 'development';

exports = module.exports = { logger, logRequest };

/**
 *
 * @param {Context}             ctx
 * @param {{(): Promise<any>}}  next
 */
async function logRequest(ctx, next) {
  const start = process.hrtime();
  await next();
  const elapsed = process.hrtime(start);
  const interval = `${(elapsed[0] * 1000 + elapsed[1] / 1e6).toFixed(3)} ms`;

  const {
    body: { msg = '', status = '' } = {},
    paramData: { curUser = null, extraMsg = '' } = {},
    session = {},
    method,
    originalUrl,
    status: statusNum,
  } = ctx;

  const user = curUser || session.curUser || {};

  const timeText = (isInDev && now()) || '';
  const userIdText = String(user.user_id || '00000').padEnd(5, ' ');
  const usernameText = String(user.username || '00000000').padEnd(8, ' ');
  const statusText = (status && ` ${status}`) || '';
  const msgText = (msg && ` - ${msg}`) || '';
  const extraMsgText = (extraMsg && ` - ${extraMsg}`) || '';

  let func = 'info';
  if (statusNum >= 400 && statusNum < 500) {
    func = 'warn';
  } else if (statusNum >= 500) {
    func = 'error';
  }
  logger[func](`${timeText} - ${userIdText}\t${usernameText}\t$- ${method} ${decodeURIComponent(originalUrl)} - ${interval} - ${statusNum}${statusText}${msgText}${extraMsgText}`);
}

function now() {
  return moment(new Date()).format('YYYY-MM-DD HH:mm:ss.SSS ');
}
