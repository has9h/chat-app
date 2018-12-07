var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var db_url = "mongodb://" + process.env.IP + ":27017";

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

//connecting to mongoose
mongoose.connect(db_url+"/chatapp");
mongoose.connection.on('error', function(){
  console.log('Could not connect to mongodb');
});

users = [];
connections = [];

//Routes:
app.get('/index', function(request, response){
  response.render('index.ejs');
});

require('./routes/user_routes.js')(app);

// Set public/static folder:
app.use(express.static(path.join(__dirname, 'static')));

//Socket:
io.sockets.on('connection', function(socket){
  // All the events that are needed to be emitted will go here
  connections.push(socket);
  console.log('Connected: %s sockets connected', connections.length);

  // Disconnect:
  socket.on('disconnect', function(data){
    users.splice(users.indexOf(socket.username), 1);
    updateUsernames();
    connections.splice(connections.indexOf(socket), 1);
    console.log('Disconnected %s sockets connected', connections.length);
  });

  // Send Message
  socket.on('send message', function(data){
    console.log(data);
    io.sockets.emit('new message', {msg: data, user: socket.username});
  });

  // New User:
  socket.on('new user', function(data, callback){
    callback(true);
    socket.username = data;
    users.push(socket.username);
    updateUsernames();
  });

  function updateUsernames(){
    io.sockets.emit('get users', users);
  }
});


//Listen:
server.listen(process.env.PORT || 3000);
console.log('Server Running');
