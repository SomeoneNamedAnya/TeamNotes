const express = require('express');
require('dotenv').config();
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3006;

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
    res.status(201).json({email: `Your email is ${email}`});  //То, что мы отправляем на клиент 
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})