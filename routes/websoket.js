const axios = require("axios");
let config = require("../config");
const service = axios.create({
  baseURL: `http://${config.machinHost}:${config.machinPort}`, //在config-dev.env.js中设置 可以process.env.BASE_API
  timeout: 5000 // 请求超时时间
});
let Api = {
  getinfo(params = {}) {
    return service({
      url: "/info",
      method: "get",
      params
    });
  },
  getImages(params={}){
    return service({
        url: "/images/json",
        method: "get",
        params
      });
  },
  build(params={}){
     
  },
  delete(params={}){
    return service({
        url: "/images/{name}",
        method: "delete",
        params
      });
  }
};

/* 实现简单的接发消息 */
async function websocket(ctx, next) {
  /* 每打开一个连接就往 上线文数组中 添加一个上下文 */
  ctxs.push(ctx);
  ctx.websocket.on("message", async message => {
    let info = await Api.getinfo().catch(error => {
      return {
        error
      };
    });
    let images= await Api.getImages().catch(error => {
        return {
          error
        };
    });
    // let deleteResult= await Api.getImages().catch(error => {
    //     return {
    //       error
    //     };
    // });
    console.log(message);
    for (let i = 0; i < ctxs.length; i++) {
      if (ctx == ctxs[i]) continue;
      ctxs[i].websocket.send(message + "\r\n" + JSON.stringify(ctxs));
      let dockerMessage = {
        dockerMessag: {
            info,
            images
        }
      };
      ctxs[i].websocket.send(JSON.stringify(dockerMessage));
    }
  });
  ctx.websocket.on("close", message => {
    /* 连接关闭时, 清理 上下文数组, 防止报错 */
    let index = ctxs.indexOf(ctx);
    ctxs.splice(index, 1);
  });
  await next();
}

function message(obj) {
  return JSON.stringify(obj);
}

module.exports = websocket;
