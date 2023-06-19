const express = require('express')
const router = express.Router();
var connection = require('../../Database/dbinfo');

router.post('/CreateContent', async(req, res) => {
    let sql = "INSERT INTO content_document ( userId ,title,textarea,documentid ) values (?) ";
    const values= [
        req.body.userId,
        req.body.title,
        req.body.textarea,
        req.body.documentid
    ]
    connection.query(sql,[values],(err,result)=>{
        if(err){
            return res.json(err)
        }else{
            console.log(result)
            return(res.json(result))
        }
    })
});

module.exports= router