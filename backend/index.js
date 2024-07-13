const express = require('express');
require('dotenv').config();
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3006;
const mysql = require('mysql');

const db = mysql.createConnection({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  insecureAuth : true
});
db.connect();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.redirect('/signUp')
})
app.get('/signUp', (req, res) => {
    res.send('Hello!')
})

app.post('/signUp', (req, res) => {
    const email  = req.body["email"]; //То, что прилетает с клиента
    const name  = req.body.name;
    const password = req.body.password;
    console.log(name);
    console.log(email);
    console.log(password);
    //Обработки//
    db.query("SELECT * FROM users WHERE email = ?",
      [email], (err, result) => {
      console.log(err);
      console.log(result);
      if (!err && result && !result.length) {
        console.log("успешная регистрация");
        db.query("INSERT INTO users (name, email, password) VALUES (?, ?, ?)", [name, email, password]);
        // res.status(201).json({email: `Вы успешно зарегистрировались под почтой ${email}`});
      }
      else if (result && result.length) {
        console.log("уже зарегистрирован")
        // res.status(201).json({email: `Пользователь с почтой ${email} уже зарегистрирован`});  //То, что мы отправляем на клиент
      }
      else {
        // res.status(400).json({email: `При регистрации произошла ошибка $`});
        console.log("произошла ошибка");
      }
    });
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})