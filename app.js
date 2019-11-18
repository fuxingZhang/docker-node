const Koa = require('koa');
const app = new Koa();
const logger = require('./util/logger');
const { port, host, welcome } = require('./config');

// logger
app.use(async (ctx, next) => {
  await next();
  const rt = ctx.response.get('X-Response-Time');
  logger.info(`${ctx.method} ${ctx.url} - ${rt}`);
});

// x-response-time
app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.set('X-Response-Time', `${ms}ms`);
});

// response
app.use(async ctx => {
  ctx.body = welcome;
});

app.listen(port, host, () => {
  logger.info(`Running on http://${host}:${port}`);
});