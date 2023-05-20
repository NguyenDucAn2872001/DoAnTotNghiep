const express = require('express')
const router = express.Router();
var connection = require('../Database/dbinfo');

router.get('/messages/all',  async(req, res)=> {
    let sql = 'SELECT * FROM messages  where sender = 19 or sender = 20 ';
    connection.query(sql,(err,result)=>{
        if(err){
            return res.json(err)
        }else{
            console.log(result)
            return(res.send(result))
        }
    })
})

router.get('/messages/user',  async(req, res)=> {
    const { sender, receiver } = req.query;
    let sql = `SELECT content FROM messages where sender = ${sender} and   receiver =${receiver}`;
    //sql = `SELECT content FROM messages `;

    connection.query(sql,(err,result)=>{
        if(err){
            return res.json(err)
        }else{
            console.log(result)
            return(res.send(result))
        }
    })
})

router.post('/messages', async(req, res) => {

    const { sender,receiver, content } = req.body;
    let sql = `INSERT INTO messages (sender,receiver, content) VALUES (${sender},${receiver}, '${content}')`;
    try {
        connection.query(sql, (err, results)=>{         
            res.json(results);               
        });
    } catch (error) {
        res.status(500).json(error)
    }
});


module.exports= router