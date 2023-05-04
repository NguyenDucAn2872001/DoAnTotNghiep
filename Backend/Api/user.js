const express = require('express')
const router = express.Router();
var connection = require('../Database/dbinfo');
const jwt = require('jsonwebtoken')
const multer = require('multer')

router.post('/',  async(req, res)=> {
    var password=req.body.password
    let sql = "insert into users (email,username,name,password,role,createdAt,avata) values (?) ";
    const values= [
        req.body.email,
        req.body.username,
        req.body.name,
        req.body.password,
        req.body.role,
        req.body.createdAt,
        req.body.avata,
    ]
    connection.query(sql,[values],(err,result)=>{
        if(err){
            return res.json(err)
        }else{
            console.log(result)
            return(res.json(result))
        }
    })
})

router.post('/auth/user', async(req, res) => {
    const password=req.body.password;
    const email = req.body.email;
    let sql = "SELECT * FROM users where email =? and password =? ";
    try {
        connection.query(sql,[email,password], (err, results)=>{         
            res.json(results);               
        });
    } catch (error) {
        res.status(500).json(error)
    }
});

router.post('/forgot', async(req, res) => {
    const email = req.body.email;
    let sql = "SELECT password FROM users WHERE email =? ";
    try {
        connection.query(sql,[email], (err, results)=>{         
            res.json(results);               
        });
    } catch (error) {
        res.status(500).json(error)
    }
});

module.exports= router