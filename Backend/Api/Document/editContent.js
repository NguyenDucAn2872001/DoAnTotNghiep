const express = require('express')
const router = express.Router();
var connection = require('../../Database/dbinfo');

router.get('/getIdDocument',  async(req, res)=> {
    const userId = req.query.userId;
    //let sql = `SELECT documentId FROM userindocument where userId = ${userId} `;
    let sql = `SELECT document.id AS documentId, document.idDocumentOwner
    FROM userindocument
    JOIN document ON userindocument.documentId = document.id
    WHERE userindocument.userId = ${userId} `;
    connection.query(sql,(err,result)=>{
        if(err){
            return res.json(err)
        }else{
            console.log(result)
            return(res.json(result))
        }
    })
})

router.get('/getInfoDocument',  async(req, res)=> {
    const id = req.query.id;
    //let sql = `SELECT * FROM textcompletion.document where id = ${id} `;
    let sql = `SELECT document.id,document.idDocumentOwner, document.nameDocument AS document_name,document.password, users_owner.name AS owner_name, users_merge.name AS merge_name
    FROM document
    JOIN users AS users_owner ON document.idDocumentOwner = users_owner.id
    JOIN users AS users_merge ON document.mergeUser = users_merge.id WHERE document.id = ${id}`
    connection.query(sql,(err,result)=>{
        if(err){
            return res.json(err)
        }else{
            console.log(result)
            return(res.json(result))
        }
    })
})

router.get('/getContentDocument',  async(req, res)=> {
    const documentid = req.query.documentid;
    const userId = req.query.userId
    let sql = `SELECT * FROM content_document where documentid = ${documentid} and userId= ${userId}`;
    //let sql = `SELECT * FROM content_document where documentid = ${documentid} `;

    connection.query(sql,(err,result)=>{
        if(err){
            return res.json(err)
        }else{
            console.log(result)
            return(res.json(result))
        }
    })
})

router.post('/EditContentDocument', async(req, res) => {
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