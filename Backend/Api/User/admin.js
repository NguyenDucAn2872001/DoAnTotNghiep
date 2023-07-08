const express = require('express')
const router = express.Router();
var connection = require('../../Database/dbinfo');

router.get('/infoUser',  async(req, res)=> {
    //let sqlcheck="ALTER TABLE users ADD UNIQUE (email) "
    let sql = "SELECT id,email ,name,state FROM users  ";
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

router.post('/deleteUser', async(req, res) => {
    const id = req.body.id;
    let sql = "DELETE FROM users WHERE id =? ";
    try {
        connection.query(sql,[id], (err, results)=>{         
            res.json(results);               
        });
    } catch (error) {
        res.status(500).json(error)
    }
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

module.exports= router