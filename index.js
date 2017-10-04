let app = require('express')();
let http = require('http').Server(app);
let io = require('socket.io')(http);

app.get('/',function(req,res){
    res.sendFile(__dirname + '/index.html');
});

var connectedUsers = 0;

io.on('connection', function(socket){
   console.log('New user connected');

   connectedUsers++;

   socket.nickname = "User_"+connectedUsers;

   console.log('--');
   console.log(socket.nickname);
   console.log('--');

   socket.broadcast.emit('new user connected', socket.nickname);

    socket.on('disconnect', function(){
        console.log('user disconnected');
        connectedUsers --;
    });

    socket.on('chat message', function(msg){
        socket.broadcast.emit('chat message', msg);
    });
});

http.listen(8080, function(){
    console.log('listeing on *: 8080');
});