const express = require('express')
const router = express.Router();
var connection = require('../../Database/dbinfo');

router.get('/getmessage',  async(req, res)=> {
    const { to1, from1 } = req.query;
    // let sql = `SELECT content FROM messages where to1 = ${sender} and   receiver =${receiver}`;
    let sql=`SELECT * FROM message WHERE (to1 = ${to1} AND from1 = ${from1}) OR (to1 = ${from1} AND from1 = ${to1})`
    connection.query(sql,(err,result)=>{
        if(err){
            return res.json(err)
        }else{
            console.log(result)
            return(res.send(result))
        }
    })
})

router.post('/postmessage', async(req, res) => {

    const { to1,from1, message } = req.body;
    let sql =`insert  INTO message (to1,from1,message) VALUES (${to1},${from1}, '${message}');`
    try {
        connection.query(sql, (err, results)=>{         
            res.json(results);               
        });
    } catch (error) {
        res.status(500).json(error)
    }
});

module.exports= router