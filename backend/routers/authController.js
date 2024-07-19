const express = require('express');
require('dotenv').config();
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
const jswt = require('jsonwebtoken');

const generateAccessToken = (_id) => jswt.sign({_id}, process.env.SECRET)


const db = mysql.createConnection({
    user: "root",
    host: process.env.DB_HOST,
    password: "12345",
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
        db.query("SELECT * FROM teamnotesdb.users WHERE email = ?",
            [email], (err, result) => {
            if (!err && result && !result.length) {
                db.query("INSERT INTO teamnotesdb.users (name, email, password) VALUES (?, ?, ?)", [name, email, password]);
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
        console.log(email);
        //Обработки// 
        db.query("SELECT idUser, email, password FROM teamnotesdb.users WHERE email = ?",
            [email], (err, result) => {
            if (!err && result && result.length) {
               
                if (email == result[0].email && bcrypt.compareSync(password, result[0].password)) {
                    const _id = result[0].idUser;
                    const token = generateAccessToken(_id);
                    return res.json(token);
                }
                else res.status(400).json("Вы ввели некорректные данные");
            }
            else if (result && !result.length) {
                res.status(400).json({email: `Пользователя с почтой ${email} не существует`});  //То, что мы отправляем на клиент
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

    async getInvitation(req, res) {
       // console.log("getInv")
        const id = req.user._id;
        //console.log(id)
        let sqlReq = "SELECT teamnotesdb.users.email, teamnotesdb.users.name, teamnotesdb.groups.groupName FROM \
        teamnotesdb.invitations join teamnotesdb.groups on teamnotesdb.invitations.groupId = teamnotesdb.groups.idGroup \
        join teamnotesdb.users on teamnotesdb.groups.adminId = teamnotesdb.users.idUser where teamnotesdb.invitations.userId = ?;"
        db.query(sqlReq, [id], (err, result) => {
            //console.log(result)
            res.status(201).json({

                result
            }
            );
            
        });
        
    }

    async declineInvitation(req, res) {
        console.log("declineInvitation")
        const id = req.user._id;
        const email = req.body.email
        const group = req.body.group
        console.log(id)
        let sqlReqUserId = "select teamnotesdb.users.idUser from teamnotesdb.users where teamnotesdb.users.email = ?;"
        let sqlReqGroupId = "SELECT teamnotesdb.groups.idGroup FROM teamnotesdb.groups where \
                            teamnotesdb.groups.adminId = ? and  teamnotesdb.groups.groupName = ?;"
        let sqlReqDel = "delete from teamnotesdb.invitations where \
        teamnotesdb.invitations.userId = ? and teamnotesdb.invitations.groupId = ?;"
        db.query(sqlReqUserId, [email], (err, resultUser) => {
            console.log(resultUser, email)
            let userId = resultUser[0]["idUser"]
            db.query(sqlReqGroupId, [userId, group], (err, resultGroup) => {
                console.log("qwertyuio",userId, group,  resultGroup)
                let groupId = resultGroup[0]["idGroup"]
                db.query(sqlReqDel, [id, groupId], (err, result) => {
                    res.status(201).json({

                        mass: "All delete"
                    })
                })
            
            });
            
        });
        
    }

    async acceptInvitation(req, res) {
        console.log("acceptInvitation")
        const id = req.user._id;
        const email = req.body.email
        const group = req.body.group
        console.log(id)
        let sqlReqUserId = "select teamnotesdb.users.idUser from teamnotesdb.users where teamnotesdb.users.email = ?;"
        let sqlReqGroupId = "SELECT teamnotesdb.groups.idGroup FROM teamnotesdb.groups where \
                            teamnotesdb.groups.adminId = ? and  teamnotesdb.groups.groupName = ?;"
        let sqlReqDel = "delete from teamnotesdb.invitations where \
        teamnotesdb.invitations.userId = ? and teamnotesdb.invitations.groupId = ?;"
        let sqlReqAdd = "INSERT INTO teamNotesDB.memberships (groupId, userID) VALUES (?, ?)"
        db.query(sqlReqUserId, [email], (err, resultUser) => {
            console.log(resultUser, email)
            let userId = resultUser[0]["idUser"]
            db.query(sqlReqGroupId, [userId, group], (err, resultGroup) => {
                console.log("qwertyuio",userId, group,  resultGroup)
                let groupId = resultGroup[0]["idGroup"]
                db.query(sqlReqAdd, [groupId, id], (err, result) => {
                    db.query(sqlReqDel, [id, groupId], (err, result) => {
                        res.status(201).json({
    
                            mass: "All accept"
                        })
                    })
                })
            
            });
            
        });
        
    }

    
   
    async getUserGroups(req, res) {
        const stringQuery = "SELECT groupName, name, email, creationDate From teamnotesdb.memberships join teamnotesdb.groups \
                            on teamnotesdb.memberships.groupId = teamnotesdb.groups.idGroup join teamnotesdb.users on \
                            teamnotesdb.groups.adminId = teamnotesdb.users.idUser where teamnotesdb.memberships.userId = ?;";
        const id = req.user._id;
        let formatted = [];
        db.query(stringQuery, [id], (err, result) => {
            res.status(201).json({
    
                result
            })
        });
        

        
    }

    async getName(req, res) {
        const stringQuery = "SELECT name From teamnotesdb.users where idUser = ?;";
        const id = req.user._id;
        let formatted = [];
        db.query(stringQuery, [id], (err, result) => {
            res.status(201).json({
    
                result
            })
        });
        
    }

    async getEmail(req, res) {
        const stringQuery = "SELECT email From teamnotesdb.users where idUser = ?;";
        const id = req.user._id;
       
        db.query(stringQuery, [id], (err, result) => {
          
            res.status(201).json({
    
                result
            })
        });
        
    }

    
    async removeGroup(req, res) {
        console.log("removeGroup")
        console.log("qwertyuiopdfghjk")
        let email = req.body.email
        let group = req.body.group
        const sqlReqGetId = "Select idGroup from teamnotesdb.groups where adminId = (select idUser from teamnotesdb.users where email = ?) and groupName = ?;";
        const id = req.user._id;
        const sqlReqCreatorId = "Select adminId from teamnotesdb.groups where idGroup = ?;";
        
        db.query(sqlReqGetId, [email, group], (err, result) => {
            db.query(sqlReqCreatorId, [result[0].idGroup], (err, idAdmin) => {
                if (idAdmin[0].adminId == id) {
                    const sql1 = "delete from teamnotesdb.groups where idGroup = ?"
                    db.query(sql1, [result[0].idGroup], (err) => {

                        const sql2 = "delete from teamnotesdb.memberships where groupId = ?"
                        db.query(sql2, [result[0].idGroup], (err) => {
                            res.status(201).json({
    
                                mess:"ok delete all"
                            })
                        })
                    })
                } else {
                    const sql2 = "delete from teamnotesdb.memberships where groupId = ? and userId = ?"
                    db.query(sql2, [result[0].idGroup, id], (err) => {
                        res.status(201).json({

                            mess:"ok deelet one"
                        })
                    })

                }
                
            })
            
        });
        

        
    }


    async isUserAdminOfGroup(userId, groupId) {
        db.query("SELECT idGroup FROM teamNotesDB.groups INNER JOIN users ON teamNotesDB.groups.idGroup=users.idUser;", (err, result) => {
            if (result) return true;
        })
        return false;
    }

  
}

module.exports = new authController();