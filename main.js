console.log("Контейнер запустился...")

// получаем модуль Express
const express = require("express");
// создаем приложение
const app = express();

let port = process.env.PORT

// устанавливаем обработчик для маршрута "/"
app.get("/", function(request, response){
    response.end("Hello from Express!");
});
// начинаем прослушивание подключений на 3000 порту
app.listen(port);
