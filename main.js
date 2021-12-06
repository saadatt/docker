console.log("Контейнер запустился...")

// получаем модуль Express
const express = require("express");
const fs = require('fs')

const content = 'Some content!\n'

// создаем приложение
const app = express();

let port = process.env.PORT

// устанавливаем обработчик для маршрута "/"
app.get("/", function(request, response){
    fs.appendFile('logs/file.log', content, err => {
        if (err) {
            console.log(err)
            return
        }
    });
    response.end("Success");
});

// начинаем прослушивание подключений на 3000 порту
app.listen(port);
