const express = require('express')
const router = express.Router();
var connection = require('../Database/dbinfo');

router.get('/messages',  async(req, res)=> {
    let sql = 'SELECT * FROM messages';
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

    const { sender, content } = req.body;
    let sql = `INSERT INTO messages (sender, content) VALUES ('${sender}', '${content}')`;
    try {
        connection.query(sql, (err, results)=>{         
            res.json(results);               
        });
    } catch (error) {
        res.status(500).json(error)
    }
});


module.exports= router