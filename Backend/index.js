const express = require('express')
var connection = require('./Database/dbinfo');
const dotenv = require('dotenv')
const cors = require('cors')

const app = express();
const http= require('http')
const server = http.createServer(app)
const {Server} =require('socket.io')

const io = new Server(server,{
  allowEIO3:true,
  cors:{
    origin:"*",
    //methods:["GET","POST"],
  },
  transports:["polling","websocket"]
})

io.on('connection',(socket)=>{
  console.log("connect success",socket.handshake.auth);

  const username = socket.handshake.auth?.username;
  socket.username=username

  const users =[];
  for(let [id,socket] of io.of("/").sockets){
    users.push({
      userId:id,
      username: socket.username
    })
  }

  socket.emit("getUsers",users);

  socket.broadcast.emit("userJustConnected",{
    userId:socket.id,
    username: socket.username
  })

  socket.on("privateMessaGE",({message,to})=>{
    console.log("message", to ,message);
    socket.to(to).emit("privateMessageToReceiver",{
      message,
      from: socket.id
    })
  })

  socket.on('disconnect',()=>{
    console.log("user disconnected");
  })

})


dotenv.config();

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.get('/',(req,res)=>{
    res.send("This is backend server api")
})


app.use('/users', require('./Api/user'));

app.use('/admin', require('./Api/admin'));

app.use('/message', require('./Api/message'));

app.use('/document', require('./Api/document'));


server.listen(process.env.PORT,()=>{
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