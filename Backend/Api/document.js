const express = require('express')
const router = express.Router();
var connection = require('../Database/dbinfo');

router.post('/saveDocument', async(req, res) => {
    const values= [
        req.body.text,
        req.body.idUser,
        req.body.nameUser
    ]
    let sql = "INSERT INTO document (text, idUser,nameUser) values (?)";
    try {
        connection.query(sql,[values], (err, results)=>{         
            res.json(results);               
        });
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
});

module.exports= router