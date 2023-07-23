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
    let sql = "INSERT INTO document (nameDocument,classify,password, idDocumentOwner,mergeUser) values (?) ";
    const values= [
        req.body.nameDocument,
        req.body.classify,
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

router.delete('/deleteContentDocument', async (req, res) => {
    const { id } = req.query;
    let sql = `DELETE FROM content_document WHERE documentid = ${id}`;
    connection.query(sql, (err, result) => {
      if (err) {
        return res.json(err);
      } else {
        return res.json(result);
      }
    });
});

router.delete('/deleteUserInDocumentById', async (req, res) => {
    const { id } = req.query;
    let sql = `DELETE FROM userindocument WHERE userId = ${id}`;
    connection.query(sql, (err, result) => {
      if (err) {
        return res.json(err);
      } else {
        return res.json(result);
      }
    });
});

router.delete('/deleteContentDocumentById', async (req, res) => {
    const { id } = req.query;
    let sql = `DELETE FROM content_document WHERE userId = ${id}`;
    connection.query(sql, (err, result) => {
      if (err) {
        return res.json(err);
      } else {
        return res.json(result);
      }
    });
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

router.delete('/finalDocument', async (req, res) => {
    const { id } = req.query;
    let sql = `DELETE FROM final_document WHERE documentid = ${id}`;
  
    connection.query(sql, (err, result) => {
      if (err) {
        return res.json(err);
      } else {
        return res.json(result);
      }
    });
});
router.get('/getContentDocument',  async(req, res)=> {
    const password = req.query.password;
    const version1 = req.query.version1;
    let sql = `SELECT final_document.*
    FROM final_document
    JOIN document ON final_document.documentid = document.id
    WHERE document.password = ${password} AND version1 = ${version1}`;
    connection.query(sql,(err,result)=>{
        if(err){
            return res.json(err)
        }else{
            console.log(result)
            return(res.json(result))
        }
    })
})

router.get('/getIdDocumentbyPassword',  async(req, res)=> {
    const password = req.query.password;
    let sql = `SELECT id from document where password = ${password}`;
    connection.query(sql,(err,result)=>{
        if(err){
            return res.json(err)
        }else{
            console.log(result)
            return(res.json(result))
        }
    })
})

// router.get('/getContentDocumentbyDocumentOwner',  async(req, res)=> {
//     const idDocumentOwner = req.query.idDocumentOwner;
//     const id = req.query.id;
//     let sql = `SELECT content_document.*
//     FROM document
//     JOIN content_document ON document.id = content_document.documentid
//     WHERE document.idDocumentOwner = ${idDocumentOwner} AND document.id = ${id} AND content_document.pick = 1  `;
//     connection.query(sql,(err,result)=>{
//         if(err){
//             return res.json(err)
//         }else{
//             console.log(result)
//             return(res.json(result))
//         }
//     })
// })

router.get('/getContentDocumentbyDocumentOwner',  async(req, res)=> {
    const id = req.query.id;
    const version1 = req.query.version1;

    let sql = `SELECT * FROM textcompletion.final_document where documentid = ${id} and version1 = ${version1}`;
    connection.query(sql,(err,result)=>{
        if(err){
            return res.json(err)
        }else{
            console.log(result)
            return(res.json(result))
        }
    })
})

router.put('/updatePublic', (req, res) => {
    const id = req.body.id; 
    const public = req.body.public; 
    connection.query(
      `UPDATE document SET public = ${public} WHERE id = ${id}`,(err, result) => {
        if (err) {
            return res.json(err)
        } else {
            return(res.json(result))
        }
      }
    );
});

router.delete('/deleteUserInDocument', async (req, res) => {
    const { id } = req.query;
    let sql = `DELETE userindocument, content_document
    FROM userindocument
    LEFT JOIN content_document ON userindocument.userId = content_document.userId
    WHERE userindocument.userId = ${id}`;
    connection.query(sql, (err, result) => {
      if (err) {
        return res.json(err);
      } else {
        return res.json(result);
      }
    });
});

router.get('/getClassifyDocument',  async(req, res)=> {
    let sql = "SELECT * FROM textcompletion.classify_document"
    connection.query(sql,(err,result)=>{
        if(err){
            return res.json(err)
        }else{
            console.log(result)
            return(res.json(result))
        }
    })
})

router.delete('/deleteCommentDocument', async (req, res) => {
    const { id } = req.query;
    let sql = `DELETE FROM comment_document WHERE documentId = ${id}`;
    connection.query(sql, (err, result) => {
      if (err) {
        return res.json(err);
      } else {
        return res.json(result);
      }
    });
});

router.get('/getPublicDocument',  async(req, res)=> {
    let sql = "SELECT document.id, document.nameDocument, document.classify, users.username,users.studentCode FROM document INNER JOIN users ON document.idDocumentOwner = users.id WHERE document.public = 1;"
    connection.query(sql,(err,result)=>{
        if(err){
            return res.json(err)
        }else{
            console.log(result)
            return(res.json(result))
        }
    })
})

router.get('/getContentDocumentPublic',  async(req, res)=> {
    const id = req.query.id;
    const version1 = req.query.version1;

    let sql = `SELECT * FROM textcompletion.final_document where documentid = ${id} and version1 = ${version1}`;
    connection.query(sql,(err,result)=>{
        if(err){
            return res.json(err)
        }else{
            console.log(result)
            return(res.json(result))
        }
    })
})

router.post('/postContentDocumentRealTime', async(req, res) => {
    let sql = "INSERT INTO document_real_time (content,classify,idDocumentOwner,nameDocument) values (?) ";
    const values= [
        req.body.content,
        req.body.classify,
        req.body.idDocumentOwner,
        req.body.nameDocument,
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
router.get('/getContentDocumentRealTime', async(req, res) => {
    const id = req.query.id
    let sql = `SELECT * FROM document_real_time WHERE id =${id}`;
    //let sql = `SELECT * FROM test_content_document WHERE id = 1`;

    connection.query(sql,(err,result)=>{
        if(err){
            return res.json(err)
        }else{
            console.log(result)
            return(res.json(result))
        }
    })
});

router.put('/updateContentDocumentRealTime', (req, res) => {
    const id = req.body.id; 
    const content = req.body.content; 
    connection.query(
      `UPDATE document_real_time SET content = '${content}' WHERE id = ${id}`,(err, result) => {
        if (err) {
            return res.json(err)
        } else {
            return(res.json(result))
        }
      }
    );
});

router.get('/getIdDocumentRealTime', async(req, res) => {
    const id = req.query.id
    let sql = `SELECT * FROM document_real_time WHERE idDocumentOwner =${id}`;
    connection.query(sql,(err,result)=>{
        if(err){
            return res.json(err)
        }else{
            console.log(result)
            return(res.json(result))
        }
    })
});

router.post('/postUserInDocumentRealTime', async(req, res) => {
    let sql = "INSERT INTO users_document_real_time (documentId,userId) values (?) ";
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

router.get('/getAllDocumentRealTime', async(req, res) => {
    const id = req.query.id
    let sql = `SELECT t2.*
    FROM users_document_real_time AS t1
    JOIN document_real_time AS t2 ON t1.documentId = t2.id
    WHERE t1.userId = ${id}`;
    connection.query(sql,(err,result)=>{
        if(err){
            return res.json(err)
        }else{
            console.log(result)
            return(res.json(result))
        }
    })
});
module.exports= router