const express = require('express')
const router = express.Router();
var connection = require('../../Database/dbinfo');

// router.get('/getInfoDocument',  async(req, res)=> {
//     const id = req.query.id;
//     let sql = `SELECT * FROM textcompletion.document where id = ${id} `;
//     connection.query(sql,(err,result)=>{
//         if(err){
//             return res.json(err)
//         }else{
//             console.log(result)
//             return(res.json(result))
//         }
//     })
// })

router.get('/getInfoDocument',  async(req, res)=> {
    const id = req.query.id;
    //let sql = `SELECT * FROM textcompletion.document where id = ${id} `;
    let sql = `SELECT document.id,document.idDocumentOwner, document.nameDocument AS document_name,document.password, users_owner.name AS owner_name
    FROM document
    JOIN users AS users_owner ON document.idDocumentOwner = users_owner.id
    JOIN users AS users_merge ON document.mergeUser = users_merge.id WHERE document.mergeUser = ${id}`
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
    const documentId = req.query.documentId;
    const userId = req.query.userId;
    
    //let sql = `SELECT * FROM textcompletion.document where id = ${id} `;
    let sql = `SELECT content_document.id, content_document.userId, content_document.title, content_document.textarea, content_document.documentId, users.name
    FROM content_document 
    JOIN users  ON content_document.userId = users.id
    WHERE content_document.documentId = ${documentId} AND content_document.userId <> ${userId};`
    connection.query(sql,(err,result)=>{
        if(err){
            return res.json(err)
        }else{
            console.log(result)
            return(res.json(result))
        }
    })
})

router.put('/updateDocument', (req, res) => {
    const id = req.body.id; // Lấy id từ URL
  
    // Thực hiện truy vấn SQL để cập nhật selected thành true
    connection.query(
      `UPDATE content_document SET pick = true WHERE id = ${id}`,(err, result) => {
        if (err) {
            return res.json(err)
        } else {
            return(res.json(result))
        }
      }
    );
});

router.post('/finalDocument', async(req, res) => {
    let sql = "INSERT INTO final_document (title,textarea, documentid,version1) values (?) ";
    const values= [
        req.body.title,
        req.body.textarea,
        req.body.documentid,
        req.body.version1,
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

router.get('/getVersion',  async(req, res)=> {
    const documentid = req.query.documentid;

    let sql = `SELECT * FROM textcompletion.final_document where documentid = ${documentid}`
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