import  Socket  from "socket.io-client";
const URL = 'http://localhost:8888'
const socket= Socket(URL,{autoConnect:false});

export default socket;