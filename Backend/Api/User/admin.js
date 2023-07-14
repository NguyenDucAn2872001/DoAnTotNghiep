const express = require('express')
const router = express.Router();
var connection = require('../../Database/dbinfo');

router.get('/infoUser',  async(req, res)=> {
    //let sqlcheck="ALTER TABLE users ADD UNIQUE (email) "
    let sql = "SELECT id,email ,name,state,lockAcc FROM users  ";
    const values= [
        req.body.email,
        req.body.name
    ]
    connection.query(sql,[values],(err,result)=>{
        if(err){
            return res.json(err)
        }else{
            console.log(result)
            return(res.json(result))
        }
    })
})

router.delete('/deleteMesageUsers', async(req, res) => {
    const { id } = req.query;
    let sql = `DELETE FROM textcompletion.message WHERE to1 =${id}`;

    connection.query(sql, (err, result) => {
        if (err) {
          return res.json(err);
        } else {
          return res.json(result);
        }
      });
});

router.delete('/deleteUser', async(req, res) => {
    const { id } = req.query;
    let sql = `DELETE FROM users WHERE id =${id}`;
    
    connection.query(sql, (err, result) => {
        if (err) {
          return res.json(err);
        } else {
          return res.json(result);
        }
      });
});

router.get('/contributionStatistics',  async(req, res)=> {
    //let sqlcheck="ALTER TABLE users ADD UNIQUE (email) "
    let sql = " SELECT users.name, COUNT(document.id) AS document_count FROM users LEFT JOIN document ON users.id = document.idDocumentOwner GROUP BY users.id, users.name;";
    connection.query(sql,(err,result)=>{
        if(err){
            return res.json(err)
        }else{
            console.log(result)
            return(res.json(result))
        }
    })
})

router.get('/numberOfDocuments',  async(req, res)=> {
    //let sqlcheck="ALTER TABLE users ADD UNIQUE (email) "
    let sql = " SELECT COUNT(*) AS document_count FROM document; ";
    connection.query(sql,(err,result)=>{
        if(err){
            return res.json(err)
        }else{
            console.log(result)
            return(res.json(result))
        }
    })
})

router.get('/accountStatistics',  async(req, res)=> {
    //let sqlcheck="ALTER TABLE users ADD UNIQUE (email) "
    let sql = "SELECT classify_document.name, COUNT(document.id) AS document_count FROM classify_document LEFT JOIN document ON classify_document.name = document.classify GROUP BY classify_document.name;";
    connection.query(sql,(err,result)=>{
        if(err){
            return res.json(err)
        }else{
            console.log(result)
            return(res.json(result))
        }
    })
})

router.put('/updateLockAcc', (req, res) => {
    const id = req.body.id;
    const lockAcc = req.body.lockAcc;
  
    connection.query(
      'UPDATE users SET lockAcc = ? WHERE id = ?',
      [lockAcc, id],
      (err, result) => {
        if (err) {
          return res.json(err);
        } else {
          return res.json(result);
        }
      }
    );
  });

  router.get('/getDocumentById',  async(req, res)=> {
    const id = req.query.id;
    let sql = `SELECT document.* FROM document
    JOIN users ON document.idDocumentOwner = users.id
    WHERE users.id =  ${id}`;
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