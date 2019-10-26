const Koa = require("koa");
const fs = require("fs");
const app = new Koa();
const { db } = require("./database");

const views = require("koa-views");
const json = require("koa-json");
const onerror = require("koa-onerror");
const bodyparser = require("koa-bodyparser");
const logger = require("koa-logger");

global.ctxs = [];
global.db = db;
const index = require("./routes/index");
const users = require("./routes/users");

// error handler
onerror(app);

// middlewares
app.use(
  bodyparser({
    enableTypes: ["json", "form", "text"]
  })
);

app.use(json());
app.use(logger());
app.use(require("koa-static")(__dirname + "/public"));

app.use(
  views(__dirname + "/views", {
    extension: "pug"
  })
);

// logger
app.use(async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

// routes
app.use(index.routes(), index.allowedMethods());
app.use(users.routes(), users.allowedMethods());

// error-handling
app.on("error", (err, ctx) => {
  console.error("server error", err, ctx);
});




//websocket
const  path  =require("path")
const websockify = require('koa-wss');
const websoket = require("./routes/websoket");
const httpsOptions = {
  key: fs.readFileSync(path.resolve(__dirname, './cert/localhost.key.pem')),
  cert: fs.readFileSync(path.resolve(__dirname, './cert/localhost.pem'))
};
 
// the main event
const wapps = websockify(app, {}, httpsOptions);
wapps.ws.use(websoket);
wapps.listen(3000);

module.exports = app