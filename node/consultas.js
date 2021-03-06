var bd = require('./conexionBD');
var datos = require('./datos');

exports.comprobarPizarra = function(cb, pizarraNombre) {
    let qr = "select nombre from pizarra";
    bd.query(qr, function (error, filas){
        if(error) {
            console.log('error al comprobar pizarras');
            return;
        }
        for(let i = 0; i < filas.length; i++) {
            if(filas[i].nombre == pizarraNombre)
            {
                cb(error, "existe");
                return;
            }
        }
        cb(error, "noExiste");
    });
}

exports.borrarPizarra = function(cb, pizarraNombre) {
    let qr = "delete from pizarra where nombre = '"+pizarraNombre+"' and antx != -1";
    bd.query(qr, function (error, filas){
        if(error) {
            console.log('error al borrar pizarras');
            return;
        }
        cb(error, "borrada");
    });
}

exports.crearPizarra = function(cb, pizarraNombre) {
    let qr = "select nombre from pizarra";
    bd.query(qr, function (error, filas){
        if(error) {
            console.log('error al comprobar pizarras');
            return;
        }
        for(let i = 0; i < filas.length; i++) {
            if(filas[i].nombre == pizarraNombre)
            {
                cb(error, "existe");
                return;
            }
        }
        let qr2 = "insert into pizarra (nombre, antx, anty, x, y) values ('" + pizarraNombre + "', -1, -1, -1, -1)";
        bd.query(qr2, function (error, filas){
            if(error) {
                console.log('error al crear pizarras aqui');
                return;
            }
            cb(error, "creada");
        });
    });
}

exports.guardarDatos = function(cb, pizarraNombre, anx, any, x, y, color, tam){
    let qr2 = "insert into pizarra (nombre, antx, anty, x, y, color, tam) \
    values ('" + pizarraNombre + "', "+anx+", "+any+", "+x+", "+y+", '"+color+"',\
    "+tam+")";
    bd.query(qr2, function (error, filas){
        if(error) {
            console.log('error al crear pizarras aqui');
            return;
        }
        cb(error, "creada");
    });
}

exports.getDatos = function(cb, pizarraNombre){
    let qr2 = "select antx, anty, x, y, color, tam from pizarra where nombre = '"+pizarraNombre+"'";
    bd.query(qr2, function (error, filas){
        if(error) {
            console.log('error al conseguir datos');
            return;
        }
        cb(error, filas);
    });
}