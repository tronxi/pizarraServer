var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.use(express.static(__dirname));

var obj = [];

app.get('//', (req, res) => 
{
    res.send('Servidor pizarra funcionando');
});

io.on('connect', function(socket) {
    console.log('Un cliente se ha conectado');
    socket.on('new-message', function(data) {
        let json = JSON.parse(data);
        console.log(json.sala);
        console.log(json.mensaje);
        io.sockets.in(json.sala).emit('message', json.mensaje);
    });
    socket.on('union', function(data){
        socket.join(data);
        console.log('unido a sala ' + data);
        //io.sockets.in(data).emit('message', 'socket');
    });
    socket.on('salir', function(data){
        socket.leave(data);
        console.log('salir a sala ' + data);
        //io.sockets.in(data).emit('message', 'socket');
    });
    socket.on('iniciar', function(data){
        socket.emit('recibir-datos-iniciales', obj);
    });

    socket.on('nuevo-punto', function(data){
        obj.push(data);
        socket.broadcast.emit('dibujar-punto',data);
    });
});

server.listen(8891, function() {
	console.log('Servidor funcionando');
});