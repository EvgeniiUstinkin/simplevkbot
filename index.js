var VK = require("VK-Promise"),
    https = require("http"),
    vk = VK("83b9df8a46547ed328b4d47b76e742a7c5d778954b5991a8616c0cbc16432db74b0130f2d768c5136d443");

// Запускаем https сервер на 80 порту с обработкой Callback API
// PS: Сервер в настройках группы нужно вешать вручную
var callback = vk.init_callback_api("58d9023e");
https.createServer(function (req, res) {
  console.log(req.url)
    if(req.url == "/vk_callback_api") // фильтруем по url
        return callback(req, res);
    // Далее делаем все что нам нужно
    res.end("Error 404");
}).listen(80);

// Включаем оптимизацию через execute
// Собирает все запросы и выполняет пачками раз в 334мс
// 334мс - 3 раза в секунду, стандартное ограничение
vk.init_execute_cart();

// message_new & message_reply объединяет в message
vk.on("message",function (event, msg) {
    msg.send("OK");
    event.ok(); // Отвечаем callback api серверу OK
});

// все остальное идет в callback type
// Например если участник вышел из сообщества
vk.on("group_leave",function (event, data) {
    if(data.self) // если сам вышел
        vk.messages.send({ // Отправляем сообщени
            message:"Ну куда же ты :_(", // текст сообщения
            peer_id: data.object.user_id // Кому
        });
    event.ok();
});
