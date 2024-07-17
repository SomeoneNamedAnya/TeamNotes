const express = require('express');
require('dotenv').config();
const mysql = require('mysql');
const bcrypt = require('bcryptjs');
const jswt = require('jsonwebtoken');

const generateAccessToken = (_id) => jswt.sign({_id}, process.env.SECRET)


const db = mysql.createConnection({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    insecureAuth : true
  });
db.connect();

class authController {
    async registration(req, res) {
        const email  = req.body["email"]; //То, что прилетает с клиента
        const name  = req.body.name;
        const password = bcrypt.hashSync(req.body.password, 7);
        //Обработки//
        db.query("SELECT * FROM users WHERE email = ?",
            [email], (err, result) => {
            if (!err && result && !result.length) {
                db.query("INSERT INTO users (name, email, password) VALUES (?, ?, ?)", [name, email, password]);
                res.status(201).json({email: `Вы успешно зарегистрировались под почтой ${email}`});
            }
            else if (result && result.length) {
                res.status(201).json({email: `Пользователь с почтой ${email} уже зарегистрирован`});  //То, что мы отправляем на клиент
            }
            else {
                res.status(400).json({email: `При регистрации произошла ошибка ${err}`});
            }
        });
    }

    async login(req, res) {
        const email  = req.body["email"]; //То, что прилетает с клиента
        const name  = req.body.name;
        const password = req.body.password;
        //Обработки//
        db.query("SELECT idUser, name, password FROM users WHERE email = ?",
            [email], (err, result) => {
            if (!err && result && result.length) {
                if (name == result[0].name && bcrypt.compareSync(password, result[0].password)) {
                    const _id = result[0].idUser;
                    const token = generateAccessToken(_id);
                    return res.json(token);
                }
                else res.status(201).json("Вы ввели некорректные данные");
            }
            else if (result && !result.length) {
                res.status(201).json({email: `Пользователя с почтой ${email} не существует`});  //То, что мы отправляем на клиент
            }
            else {
                res.status(400).json({email: `При авторизации произошла ошибка ${err}`});
            }
        });
    }

    async notes(req, res) {
        res.status(201).json("here are the notes");
    }

    async createGroup(req, res) {
        const id = req.user._id;
        const name = req.body.name;
        db.query("INSERT INTO teamNotesDB.groups (adminId, groupName) VALUES (?, ?)", [id, name]);
        db.query("SELECT LAST_INSERT_ID() as groupId", (err, result) => {
            db.query("INSERT INTO teamNotesDB.memberships (groupId, userId) VALUES (?, ?)", [result[0].groupId, id]);
        });
        res.status(201).json("insert successful");
    }

    async isUserAdminOfGroup(userId, groupId) {
        db.query("SELECT idGroup FROM teamNotesDB.groups INNER JOIN users ON teamNotesDB.groups.idGroup=users.idUser;", (err, result) => {
            if (result) return true;
        })
        return false;
    }

    async addUserToGroup(req, res) {
        const adminId = req.user._id;
        const email = req.body.email;
        const groupId = req.body.groupId;
        const isAdmin = isUserAdminOfGroup(adminId, groupId);
        console.log(isAdmin);
        let userId;
        db.query("SELECT idUser from teamNotesDB.users WHERE email = ?", [email], (err, result) => {
            userId = result[0].idUser;
        });
        db.query("INSERT INTO teamNotesDB.memberships (groupId, userId) VALUES (?, ?)", [groupId, userId]);
        res.status(201).json("adding successful")
    }
}

module.exports = new authController();