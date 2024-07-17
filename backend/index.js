const express = require('express');
require('dotenv').config();
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3006;
const mysql = require('mysql');
const cookieParser = require('cookie-parser');
const authRouter = require('./routers/authRouter')

app.use(express.json());
app.use(cors());
app.use("/auth", authRouter);

const start = () => {
  try {
    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`);
    })
  }
  catch (error) {
    console.log(error);
  }
}

start();
