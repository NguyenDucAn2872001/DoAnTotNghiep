const express = require('express')
const router = express.Router();
var connection = require('../Database/dbinfo');
const jwt = require('jsonwebtoken')
const multer = require('multer')

// API tạo user authen 
router.post('/',  async(req, res)=> {
    var password=req.body.password
    // const encryptedPassword = await bcryp.hash(password,10);
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
    // try {
    //     const user = req.body
    //     let token = jwt.sign({user},process.env.SECRET,{expiresIn:" 2 day"})
    //     await connection.query(sql, (err, results)=>{         
    //         res.json(results)            
    //     });
        
        
        
    // } catch (error) {
    //     console.log("connect faild 2");
    //     res.status(500).json(error)
    // }
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
// router.post('/auth/login',  async(req, res)=> {
//     const password=req.body.password;
//     const email = req.body.email;

//     let sql = "SELECT * FROM users where email=@email ";

//     connection.query(sql,email,(err,result)=>{
//         if(err){
//             return res.json(err)
//         }else{
//             console.log(result)
//             return(res.json(result))
//         }
//     })

// })
module.exports= router