const router = require("koa-router")();
const Api = require("../api");
let getDockerMessage = async function() {
  let info = await Api.getinfo().catch(error => {
    return {
      error
    };
  });
  let images = await Api.getImages().catch(error => {
    return {
      error
    };
  });
  // let deleteResult= await Api.getImages().catch(error => {
  //     return {
  //       error
  //     };
  // });
  return {
    dockerMessage: {
      info,
      images
    }
  };
};
router.all("/webhook", async (ctx, next) => {
  let body = ctx.request.body;
  // let ctxs=body.ctxs
  let repositoryName= body.Payload?body.Payload.repository.name:""
  switch (repositoryName) {
    case "audio":
      
      break;
  }
  let dockerMessage =  await getDockerMessage();
  for (let i = 0; i < ctxs.length; i++) {
    ctxs[i].websocket.send(JSON.stringify(body));
    ctxs[i].websocket.send(JSON.stringify(dockerMessage));
  }
  ctx.body = {
    status: 200
  };
});

router.get("/string", async (ctx, next) => {
  ctx.body = "koa2 string";
});

router.get("/json", async (ctx, next) => {
  ctx.body = {
    title: "koa2 json"
  };
});

module.exports = router;
