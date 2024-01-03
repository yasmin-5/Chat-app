const express=require("express");
const app=express();
const path=require("path");
// const { Socket } = require("socket.io");
const PORT=process.env.PORT||7002;
const server=app.listen(PORT,()=>{
    console.log("💬 Chat-server works on: "+PORT)
})
const io=require("socket.io")(server);//pass http server

app.use(express.static(path.join(__dirname,"/public")))

let socketsConnected=new Set()//unique id 

io.on("connection",onConnected)
// automatic the users is connecte when server start
function onConnected(socket){
    console.log(socket.id)
    //when client is connected==> add to the set
    socketsConnected.add(socket.id)

io.emit("clients-total",socketsConnected.size)//no. of connected clients 

//when client is disconnected  ==>delete by id
socket.on("disconnect",()=>{
    console.log("socket disconnected",socket.id)
    socketsConnected.delete(socket.id)
io.emit("clients-total",socketsConnected.size)//no. of connected clients 

})
socket.on("message",(data)=>{
    console.log(data)
    socket.broadcast.emit("chat-message",data)
})
socket.on("feedback",(data)=>{
    socket.broadcast.emit("feedback",data)
})


}






