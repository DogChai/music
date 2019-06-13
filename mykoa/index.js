//引入Koa
const koa = require('koa');

// 引入路由
const router = require('koa-router')();

const bodyParser = require('koa-bodyparser');

const app = new koa();

//配置中间件
// log request URL:
app.use(async (ctx, next) => {
  console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
  await next();
});

// add url-route:
router.get('/hello/:name', async (ctx, next) => {
  var name = ctx.params.name;
  ctx.response.body = `<h1>Hello, ${name}!</h1>`;
});

router.get('/', async (ctx, next) => {
  ctx.response.body = '<h1>Index</h1>';
});

// add router middleware:
app.use(router.routes());

//监听端口
app.listen(3000);
console.log('app started at port 3000...');