const express = require('express')
const router = express.Router();
var connection = require('../../Database/dbinfo');
const nodemailer = require('nodemailer');

router.get('/infoUser',  async(req, res)=> {
    //let sqlcheck="ALTER TABLE users ADD UNIQUE (email) "
    let sql = "SELECT id,email ,name,state,lockAcc FROM users  ";
    const values= [
        req.body.email,
        req.body.name
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

router.delete('/deleteMesageUsers', async(req, res) => {
    const { id } = req.query;
    let sql = `DELETE FROM textcompletion.message WHERE to1 =${id}`;

    connection.query(sql, (err, result) => {
        if (err) {
          return res.json(err);
        } else {
          return res.json(result);
        }
      });
});

router.delete('/deleteUser', async(req, res) => {
    const { id } = req.query;
    let sql = `DELETE FROM users WHERE id =${id}`;
    
    connection.query(sql, (err, result) => {
        if (err) {
          return res.json(err);
        } else {
          return res.json(result);
        }
      });
});

router.get('/contributionStatistics',  async(req, res)=> {
    //let sqlcheck="ALTER TABLE users ADD UNIQUE (email) "
    let sql = " SELECT users.name, COUNT(document.id) AS document_count FROM users LEFT JOIN document ON users.id = document.idDocumentOwner GROUP BY users.id, users.name;";
    connection.query(sql,(err,result)=>{
        if(err){
            return res.json(err)
        }else{
            console.log(result)
            return(res.json(result))
        }
    })
})

router.get('/numberOfDocuments',  async(req, res)=> {
    //let sqlcheck="ALTER TABLE users ADD UNIQUE (email) "
    let sql = " SELECT COUNT(*) AS document_count FROM document; ";
    connection.query(sql,(err,result)=>{
        if(err){
            return res.json(err)
        }else{
            console.log(result)
            return(res.json(result))
        }
    })
})

router.get('/accountStatistics',  async(req, res)=> {
    //let sqlcheck="ALTER TABLE users ADD UNIQUE (email) "
    let sql = "SELECT classify_document.name, COUNT(document.id) AS document_count FROM classify_document LEFT JOIN document ON classify_document.name = document.classify GROUP BY classify_document.name;";
    connection.query(sql,(err,result)=>{
        if(err){
            return res.json(err)
        }else{
            console.log(result)
            return(res.json(result))
        }
    })
})

router.put('/updateLockAcc', (req, res) => {
    const id = req.body.id;
    const lockAcc = req.body.lockAcc;
    const email=req.body.email
    if(lockAcc==1){
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
            subject: 'Website hỗ trợ hoàn thiện văn bản sử dụng trong Đại học Bách Khoa Hà Nội',
            text: 'You recieved message from ',
            // html:'Tài Khoản của bạn bị khóa tạm thời do các tiêu chuẩn về cộng đồng .'
            html:`<p>Chào ${email},</p>
            <p>Tài Khoản của bạn bị khóa tạm thời do bạn đã vi phạm các tiêu chuẩn về cộng đồng </p>
            <p>Tìm hiểu các tiêu chuẩn về cộng đồng :<a href="https://luminous-bonbon-af649b.netlify.app/">Tiêu chuẩn cộng đồng </a></p>
            <p>Trân trọng .</p>`
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
  
    connection.query(
      'UPDATE users SET lockAcc = ? WHERE id = ?',
      [lockAcc, id],
      (err, result) => {
        if (err) {
          return res.json(err);
        } else {            
          return res.json(result);
        }
      }
    );
  });

  router.get('/getDocumentById',  async(req, res)=> {
    const id = req.query.id;
    let sql = `SELECT document.* FROM document
    JOIN users ON document.idDocumentOwner = users.id
    WHERE users.id =  ${id}`;
    connection.query(sql,(err,result)=>{
        if(err){
            return res.json(err)
        }else{
            console.log(result)
            return(res.json(result))
        }
    })
})

router.get('/getAllDocument',  async(req, res)=> {
    let sql = "SELECT * FROM textcompletion.document;";
    connection.query(sql,(err,result)=>{
        if(err){
            return res.json(err)
        }else{
            console.log(result)
            return(res.json(result))
        }
    })
})

module.exports= router