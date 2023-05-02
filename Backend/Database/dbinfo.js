var mysql = require("mysql2");

var connection = mysql.createConnection({
    host: 'localhost',
    database: 'textcompletion',
    user: 'root',
    password: '123456'
});

module.exports=connection