console.log("Контейнер запустился...")

// получаем модуль Express
const express = require("express");
const fs = require('fs')
const mysql = require("mysql2");

const host = process.env.MYSQL_HOST
const user = process.env.MYSQL_USER
const database = process.env.MYSQL_DB
const password = process.env.MYSQL_PASSWORD

const connection = mysql.createConnection({
  "host": host,
  "user": user,
  "database": database,
  "password": password
});

// создаем приложение
const app = express();

const port = process.env.PORT

// устанавливаем обработчик для маршрута "/"
app.get("/", function(request, response){
    const content = 'Some content!\n'
    fs.appendFile('logs/file.log', content, err => {
        if (err) {
            console.log(err)
            return
        }
    });
    response.end("Success");
});

// Добавляем данные в базу данных
app.get("/set", function(request, response){
    const sqlSet = `INSERT INTO users(name, age) VALUES('Sam', 31)`;
    connection.query(sqlSet, function(err, results) {
        if(err) console.log(err);
        console.log(results);
    });
    response.end("Success");
});

// Читаем данные из базы данных
app.get("/get", function(request, response){
    const sqlGet = `SELECT * FROM users`;
    connection.query(sqlGet, function(err, results) {
        if(err) console.log(err);
        response.json(results)
    });
});

// начинаем прослушивание подключений на 3000 порту
app.listen(port);
