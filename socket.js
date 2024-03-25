const Models=require("./models/index")
const users = new Map();
module.exports=function(io){
    io.on("connection",(socket)=>{
        console.log(`user connected: ${socket.id}`);
        users.set(socket.id, socket.id);
    
        // emit that a new user has joined as soon as someone joins
        socket.broadcast.emit('users:joined', socket.id);
        socket.emit('hello', { id: socket.id });
    
        socket.on('outgoing:call', data => {
            const { fromOffer, to } = data;
    
            socket.to(to).emit('incomming:call', { from: socket.id, offer: fromOffer });
        });
    
        socket.on('call:accepted', data => {
            const { answere, to } = data;
            socket.to(to).emit('incomming:answere', { from: socket.id, offer: answere })
        });
    
    
        socket.on('disconnect', () => {
            console.log(`user disconnected: ${socket.id}`);
            users.delete(socket.id);
            socket.broadcast.emit('user:disconnect', socket.id);
        });

    })
    
}