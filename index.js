var VK = require("VK-Promise"),
tools = require('./tools'),
consts = require('./consts'),
vkHelper = require('./vkhelper'),
http = require("http"),
vk = VK(consts.public_token);

var callback = vk.init_callback_api(consts.vk_init_callback_api);
http.createServer(function (req, res) {
  if(req.url == "/vk_callback_api")
  return callback(req, res);
  res.end("Error 404");
}).listen(process.env.PORT || 3010);

vk.init_execute_cart();

vk.on("message",function (event, msg) {
  if(!msg.out){
    vkHelper.vk_groups_isMember(vk, consts.public_id, msg.user_id).then(function (res) {
      if(res==1){
        msg.send("Текущее время сервера "+tools.getServerDateTime());
      }
      else{
        msg.send("Перед тем, как я отправлю тебе ответ - подпишись на меня https://vk.com/public"+consts.public_id);
      }
    })
  }
  event.ok();
});
