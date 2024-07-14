const express = require('express');
require('dotenv').config();
const cors = require('cors');
const mysql = require("mysql2");
const DB_URL = ""
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.get('/registration', (req, res) => {
    res.send('Hello!---------------------')
  })

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "teamnotesdb",
    password: "12345"
});

connection.connect(function(err){
    if (err) {
        return console.error("Ошибка: " + err.message);
    }
    else{
        console.log("Подключение к серверу MySQL успешно установлено");
    }
    });
async function startApp() {
    try {
        

    } catch(error) {
        console.log(error);
    }
}


app.post('/login', (req, res) => {

    //Получение данных от клиента
    const { email } = req.body;
    const { name } = req.body;
    const { password } = req.body;

     //Обработки// 

    const sql = "INSERT INTO users(idUser, name, email, theme, password) VALUES(?, ?, ?, ?, ?)";
    let lastNum = null;
    connection.query("select max(idUser) from users", (err, results, fields) => {
        lastNum = results[0]["max(idUser)"]; // собственно данные
       
        if (lastNum === null) {
            lastNum = 0;
        }
        
        lastNum += 1;
        console.log(lastNum);
        
    
        console.log(results); // мета-данные полей 


         connection.query(sql, lastNum, name, email, 1, password, () => {
         console.log(name);
         console.log("qwerty");
         console.log(email);
         console.log("qwerty2");
         console.log(password);
         console.log("qwerty3");
        })
        const sql2 = "select * from users;"
        connection.query(sql, function(err, results, fields) {
            console.log(err);
            console.log(results); // собственно данные
            console.log(fields); // мета-данные полей 
        });
    })
    
    
 
    

    
    
    //То, что мы отправляем на клиент 
    res.status(201).json({email: `Your email is ${email}`});  
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})