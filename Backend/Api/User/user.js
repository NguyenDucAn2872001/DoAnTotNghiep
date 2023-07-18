const express = require('express')
const router = express.Router();
var connection = require('../../Database/dbinfo');
const jwt = require('jsonwebtoken')
const multer = require('multer')
const bcrypt =require('bcrypt')
const verifyToken=require('../../Services/verify-token')

const nodemailer = require('nodemailer');

router.post('/sendEmail', function(req, res, next) {
    var transporter =  nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'ducan287@gmail.com',
            pass: 'rfikhwcrezuypqqx'
        }
    });
    var mainOptions = {
        from: 'Thanh Batmon',
        to: 'chientran2681993@gmail.com',
        subject: 'Test Nodemailer',
        text: 'You recieved message from ',
        html: '<p>You have got a new message</p>'
    }
    transporter.sendMail(mainOptions, function(err, info){
        if (err) {
            console.log(err);
            res.redirect('/');
        } else {
            console.log('Message sent: ' +  info.response);
            res.redirect('/');
        }
    });
});

router.post('/Addusser',  async(req, res)=> {
    //let sqlcheck="ALTER TABLE users ADD UNIQUE (email) "
    const email=req.body.email;
    const username=req.body.username;
    const name=req.body.name;
    const password=req.body.password;
    const studentCode=req.body.studentCode;
    const avata=req.body.avata;

    const encryptedPasswod= await bcrypt.hash(password,10)
    const user =req.body
    let token =jwt.sign({user},process.env.SECRET,{expiresIn:"2 days"})
    let sql = `insert IGNORE into users (email,username,name,password,studentCode,avata) values ('${email}', '${username}', '${name}', '${encryptedPasswod}', '${studentCode}', ' ${avata} ')`;
    
    connection.query(sql,(err,result)=>{
        if(err){
            return res.json(err)
        }else{
            console.log(result,user,token,)
            res.json({user,token,message:"Create success"})
            // return(res.json(result))
        }
    })
})

router.get('/getAuthUser',verifyToken,async(req,res)=>{
    console.log(req.decoded);
    const email= req.decoded.user.email;
    const OTP = Math.floor(100000 + Math.random() * 900000);

    let sql = `SELECT * FROM users WHERE email= '${email}'`;

    connection.query(sql,(err,result)=>{
        if(err){
            return res.json(err)
        }else{
            const user= result[0]
            if(!user){
                res.status(403).json({
                    success:false,
                    message:"Authenticase failed , not found user"
                })
            }else{
                res.json(user)
            }

        }
    })
})

router.post('/auth/user', async(req, res) => {
    const password=req.body.password;
    const email = req.body.email;
    let sql = `SELECT * FROM users where email = '${email}'`;

    connection.query(sql,async(err,result)=>{
        if(err){
            return res.json(err)
        }else{
            const user= result[0]
            console.log(user,"tesst ZZ");
            if(!user){
                res.status(403).json({
                    success:false,
                    message:"Authenticase failed , not found user"
                })
            }else{
                const match= await bcrypt.compare(password, user.password)
                if(match){
                    let token =jwt.sign(user,process.env.SECRET,{expiresIn:"2 days"});
                    res.json({user,token})
                    console.log(user);
                    console.log(token);
                    console.log(match);
                }
                else{
                    res.status(403).json({
                        success:false,
                        message:"Authenticase failed ,wrong password !"
                    })
                }
            }

        }
    })
});

router.post('/sendOtp',async(req,res)=>{
    const email= req.body.email;
    const OTP = Math.floor(1000 + Math.random() * 9000);
    
    const query = 'INSERT INTO otp_forgot (email, otp) VALUES (?, ?)';

    connection.query(query, [email, OTP], (err) => {
        if(err){
            console.error('Error saving OTP to database:', err);
            res.status(500).json({ message: 'Internal server error' });
        }else{
            var transporter =  nodemailer.createTransport({
                service: 'Gmail',
                auth: {
                    user: 'ducan287@gmail.com',
                    pass: 'rfikhwcrezuypqqx'
                }
            });
            var mainOptions = {
                from: 'Đại học Bách Khoa Hà Nội',
                to: email,
                subject: 'Đổi mật khẩu Website hỗ trợ hoàn thiện văn bản sử dụng trong Đại học Bách Khoa Hà Nội',
                text: 'You recieved message from ',
                html: `Đây là OPT của bạn : ${OTP} vui lòng không cung cấp cho người khác`
            }
            transporter.sendMail(mainOptions, function(err, info){
                if (err) {
                    console.log(err);
                    res.redirect('/');
                } else {
                    console.log('Message sent: ' +  info.response);
                    res.redirect('/');
                }
            });
        }
    })
})


router.post('/verifyOTP',async (req, res) => {
    // const { email, otp ,password} = req.body;
    const email=req.body.email;
    const otp=req.body.otp;
    let query = `SELECT * FROM otp_forgot WHERE email = '${email}' AND otp = ${otp}`;
    connection.query(query, (err, results) => {
      if (err) {
        console.error('Error verifying OTP:', err);
        res.status(500).json({ message: 'Internal server error select email' });
      } else {
        if (results.length > 0) {

            res.json(true)
        } else {
            res.status(400).json({ message: 'Invalid OTP' });
          }
        }
    });
});

router.put('/updatePassWord',async(req,res)=>{
    const email=req.body.email;
    const password=req.body.password;
    const newPassword = await bcrypt.hash(password,10)
    let updateQuery = `UPDATE users SET password = '${newPassword}' WHERE email = '${email}'`;
          connection.query(updateQuery, (err) => {
            if (err) {
              console.error('Error updating password:', err);
              res.status(500).json({ message: 'Internal server error' });
            } else {

                const deleteQuery = `DELETE FROM otp_forgot WHERE email = '${email}'`;
                connection.query(deleteQuery, (err) => {
                    if (err) {
                    console.error('Error deleting OTP record:', err);
                    }
                    res.json({ message: 'Password changed successfully' });
                });
        }
    });
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