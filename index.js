var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  // res.send('<h1>Hello world</h1>');
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  console.log('a user connected');
  
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
  
  socket.on('changed textarea', function(text) {
    console.log('textarea: \n' + text + '\n= = = = =\n\n\n');
    io.emit('changed textarea', text);
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});