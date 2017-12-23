const Koa = require('koa');
const route = require('./routers');
const { handleError, handleException } = require('./utils');
const { logRequest } = require('./utils/logger');
const { port } = require('./config');
const { logger } = require('./utils/logger');
const app = new Koa();

app.use(logRequest);
app.use(handleException);
app.on('error', (e, ctx) => handleError(ctx, e));
route(app);

app.listen(port, () => logger.info(`漂流瓶服务端${process.env.NODE_ENV}启动, 监听端口${port}`));
