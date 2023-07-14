const express = require('express')
const router = express.Router();
var connection = require('../../Database/dbinfo');


router.post('/addComment', async(req, res) => {
    let sql = "INSERT INTO comment_document (documentId, userId,comments) values (?) ";
    const values= [
        req.body.documentId,
        req.body.userId,
        req.body.comments
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

router.get('/getCommentDocument',  async(req, res)=> {
    const documentId = req.query.documentId;
    let sql = `SELECT cd.id, cd.documentId, cd.userId, cd.comments, cd.feeling, u.name
    FROM comment_document cd
    INNER JOIN users u ON cd.userId = u.id
    WHERE cd.documentId = ${documentId}`;
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