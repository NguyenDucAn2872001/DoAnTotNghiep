const express = require('express')
const router = express.Router();
var connection = require('../../Database/dbinfo');
// const jwt = require('jsonwebtoken')
// const multer = require('multer')
const nodemailer = require('nodemailer');
const speakeasy = require('speakeasy');

router.post('/sendOTP', (req, res) => {
    // Tạo mã OTP
    const secret = speakeasy.generateSecret({length: 6});
  
    // Gửi email chứa OTP tới người dùng
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'ducan287@gmail.com',
        pass: 'Ducan287123456@'
      }
    });
  
    const mailOptions = {
      from: 'hn433737@gmail.com',
      to: req.body.email,
      subject: 'Xác thực OTP',
      text: 'Mã OTP của bạn là ' + secret.base32
    };
  
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error,"1");
        res.send({
          sent: false
        });
      } else {
        console.log('Email gửi thành công: ' + info.response);
        res.send({
          sent: true,
          secret: secret.base32
        });
      }
    });
  });

router.post('/Addusser',  async(req, res)=> {
    //let sqlcheck="ALTER TABLE users ADD UNIQUE (email) "
    let sql = "insert IGNORE into users (email,username,name,password,studentCode,createdAt,avata) values (?) ";
    const values= [
        req.body.email,
        req.body.username,
        req.body.name,
        req.body.password,
        req.body.studentCode,
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

router.get('/getUserById',  async(req, res)=> {
    //let sqlcheck="ALTER TABLE users ADD UNIQUE (email) "
    let sql = "SELECT * FROM users WHERE id=19 ";
    const id = req.body.id

    connection.query(sql,id,(err,result)=>{
        if(err){
            return res.json(err)
        }else{
            return(res.json(result))
        }
    })
})

router.get('/getApi',  async(req, res)=> {
    //let sqlcheck="ALTER TABLE users ADD UNIQUE (email) "
    let sql = "SELECT * FROM textcompletion.users";
    connection.query(sql,(err,result)=>{
        if(err){
            return res.json(err)
        }else{
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
    let sql = "SELECT password,email FROM users WHERE email =? ";
    try {
        connection.query(sql,[email], (err, results)=>{         
            res.json(results);               
        });
    } catch (error) {
        res.status(500).json(error)
    }
});

router.post('/state', async(req, res) => {
    const id = req.body.id;
    let sql = "UPDATE users SET state = true WHERE id =? ";
    try {
        connection.query(sql,[id], (err, results)=>{         
            res.json(results);               
        });
    } catch (error) {
        res.status(500).json(error)
    }
});

router.post('/stateout', async(req, res) => {
    const id = req.body.id;
    let sql = "UPDATE users SET state = false WHERE id =? ";
    try {
        connection.query(sql,[id], (err, results)=>{         
            res.json(results);               
        });
    } catch (error) {
        res.status(500).json(error)
    }
});
module.exports= router