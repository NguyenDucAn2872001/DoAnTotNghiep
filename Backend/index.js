const express = require('express')
var connection = require('./Database/dbinfo');
const dotenv = require('dotenv')
const cors = require('cors')

const app = express();
dotenv.config();

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.get('/',(req,res)=>{
    res.send("This is backend server api")
})

// app.use('/api', require('./api/testConnect'))
app.use('/users', require('./Api/user'))

app.listen(process.env.PORT,()=>{
    console.log( `Server start running on ${process.env.PORT}`)
    connection.connect((err)=>{
        if(err) 
        {
            console.log("connect faild 2",err);
        }
        else{
            console.log('Database connected!');
        }
        
    })
})