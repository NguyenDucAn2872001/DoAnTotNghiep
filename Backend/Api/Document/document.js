const express = require('express')
const router = express.Router();
var connection = require('../../Database/dbinfo');

// router.post('/saveDocument', async(req, res) => {
//     const values= [
//         req.body.text,
//         req.body.idUser,
//         req.body.nameUser
//     ]
//     let sql = "INSERT INTO document (text, idUser,nameUser) values (?)";
//     try {
//         connection.query(sql,[values], (err, results)=>{         
//             res.json(results);               
//         });
//     } catch (error) {
//         console.log(error);
//         res.status(500).json(error)
//     }
// });

router.get('/getNameDocument',  async(req, res)=> {
    const idDocumentOwner = req.query.idDocumentOwner;
    let sql = `SELECT * FROM document where idDocumentOwner = ${idDocumentOwner} `;
    connection.query(sql,(err,result)=>{
        if(err){
            return res.json(err)
        }else{
            console.log(result)
            return(res.json(result))
        }
    })
})

router.get('/getIdUser',  async(req, res)=> {
    const documentId = req.query.documentId;
    let sql = `SELECT * FROM userindocument where documentId = ${documentId} `;
    connection.query(sql,(err,result)=>{
        if(err){
            return res.json(err)
        }else{
            console.log(result)
            return(res.json(result))
        }
    })
})

router.post('/saveDocument', async(req, res) => {
    let sql = "INSERT INTO document (nameDocument,password, idDocumentOwner,mergeUser) values (?) ";
    const values= [
        req.body.nameDocument,
        req.body.password,
        req.body.idDocumentOwner,
        req.body.mergeUser
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

router.post('/saveUserDocument', async(req, res) => {
    let sql = "INSERT INTO userindocument (documentId, userId) values (?) ";
    const values= [
        req.body.documentId,
        req.body.userId,
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

router.delete('/deleteUserDocument', async (req, res) => {
    const { id } = req.query;
    let sql = `DELETE FROM userindocument WHERE documentId = ${id}`;
  
    connection.query(sql, (err, result) => {
      if (err) {
        return res.json(err);
      } else {
        return res.json(result);
      }
    });
});

router.delete('/deleteDocument', async (req, res) => {
    const { id } = req.query;
    let sql = `DELETE FROM document WHERE id = ${id}`;
  
    connection.query(sql, (err, result) => {
      if (err) {
        return res.json(err);
      } else {
        return res.json(result);
      }
    });
});

// router.get('/messages/user',  async(req, res)=> {
//     const { sender, receiver } = req.query;
//     let sql = `SELECT content FROM messages where sender = ${sender} and   receiver =${receiver}`;
//     //sql = `SELECT content FROM messages `;

//     connection.query(sql,(err,result)=>{
//         if(err){
//             return res.json(err)
//         }else{
//             console.log(result)
//             return(res.send(result))
//         }
//     })
// })

module.exports= router