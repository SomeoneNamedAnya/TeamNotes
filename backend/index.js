const express = require('express');
require('dotenv').config();
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.get('/registration', (req, res) => {
    res.send('Hello!')
  })

app.post('/login', (req, res) => {
    console.log("qqqqq");
    const { email } = req.body[email]; //То, что прилетает с клиента
    const { name }  = req.body[name];
    console.log(name);
    console.log(email);
    
    //Обработки// 
    res.status(201).json({email: `Your email is ${email}`});  //То, что мы отправляем на клиент 
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})