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
            if(filas[0].nombre == pizarraNombre)
            {
                cb(error, "existe");
                return;
            }
        }
        cb(error, "noExiste");
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
            if(filas[0].nombre == pizarraNombre)
            {
                cb(error, "existe");
                return;
            }
        }
        let qr = "insert into pizarra ("+pizarraNombre+", antx, anty, x, y) values ('prueba', -1, -1, -1, -1)";
        bd.query(qr, function (error, filas){
            if(error) {
                console.log('error al crear pizarras');
                return;
            }
            cb(error, "creada");
        });
    });
}