var VK = require("VK-Promise"),
tools = require('./tools'),
consts = require('./consts'),
vkHelper = require('./vkhelper'),
http = require("http"),
vk = VK("83b9df8a46547ed328b4d47b76e742a7c5d778954b5991a8616c0cbc16432db74b0130f2d768c5136d443");

var callback = vk.init_callback_api("58d9023e");
http.createServer(function (req, res) {
  if(req.url == "/vk_callback_api")
  return callback(req, res);
  res.end("Error 404");
}).listen(process.env.PORT || 3010);

vk.init_execute_cart();

vk.on("message",function (event, msg) {
console.log("event",event);
console.log("msg",msg);
  vkHelper.vk_groups_isMember(vk, consts.public_id,'8326796').then(function (res) {
    if(res==1){
      msg.send("Текущее время сервера",tools.getServerDateTime());
    }
    else{
      msg.send("Перед тем, как я отправлю тебе ответ - подпишись на меня", " https://vk.com/public"+consts.public_id);
    }
  })
  event.ok();
});

vk.on("group_leave",function (event, data) {
  if(data.self)
  vk.messages.send({
    message:"Ну куда же ты :_(",
    peer_id: data.object.user_id
  });
  event.ok();
});
