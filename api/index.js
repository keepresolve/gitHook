const axios = require("axios");
let config = require("../config");
const service = axios.create({
  baseURL: `http://${config.machinHost}:${config.machinPort}`, //在config-dev.env.js中设置 可以process.env.BASE_API
  timeout: 5000 // 请求超时时间
});
module.exports = {
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
  delete(name,params={}){
    return service({
        url: `/images/${name}`,
        method: "delete",
        params
      });
  }
};