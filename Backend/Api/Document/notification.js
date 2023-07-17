const express = require('express')
const router = express.Router();
var connection = require('../../Database/dbinfo');

router.get('/getNotification',  async(req, res)=> {
    const { notification_recipient } = req.query;
    let sql=`SELECT content,edit FROM notification WHERE notification_recipient = ${notification_recipient}`
    connection.query(sql,(err,result)=>{
        if(err){
            return res.json(err)
        }else{
            console.log(result)
            return(res.send(result))
        }
    })
})

router.post('/newNotification', async(req, res) => {

    const { notification_sender,
            notification_recipient, 
            content, 
            name_document, 
            password_document,
            edit } = req.body;
    let sql =`insert  INTO notification (notification_sender, notification_recipient, content, name_document, password_document,edit) 
               VALUES (${notification_sender},${notification_recipient}, '${content}', '${name_document}', '${password_document}', '${edit}');`
    try {
        connection.query(sql, (err, results)=>{         
            res.json(results);               
        });
    } catch (error) {
        res.status(500).json(error)
    }
});

module.exports= router
