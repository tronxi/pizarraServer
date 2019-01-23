var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 

cl = require('./node/consultas.js');

app.use(express.static(__dirname));
var cors = require('cors')
 
app.use(cors())



var obj = [];

app.get('//', (req, res) => 
{
    res.send('Servidor pizarra funcionando');
});
app.get('//pizarra/:nombre', (req, res) => {
    let nombre = req.params.nombre;

    cl.comprobarPizarra(function(error, resultado){
        if(error){
            throw error;
        }
        else
        {
            res.send(JSON.stringify(resultado));
        }
    }, nombre)

})

app.post('//pizarra', (req, res) => {
    let nombre = req.body.nombre;
    cl.crearPizarra(function(error, resultado){
        if(error){
            throw error;
        }
        else
        {
            res.send(JSON.stringify(resultado));
        }
    }, nombre)

})

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
        let json =  JSON.parse(data);
        socket.broadcast.in(json.sala).emit('dibujar-punto',data);
    });
});

server.listen(8891, function() {
	console.log('Servidor funcionando');
});