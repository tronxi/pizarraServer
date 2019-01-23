var bd = require('./conexionBD');
var datos = require('./datos');

exports.comprobarPizarra = function(cb, pizarraNombre) {
    let qr = "select nombre from pizarra";
    bd.query(qr, function (error, filas){
        if(error) {
            console.log('error al comprobar pizarras'):
            return;
        }
        for(let i = 0; i < filas.length; i++) {
            if(filas[0].nombre == pizarraNombre)
            {
                cb(error, "existe");
            }
        }
        cb(error, "noExiste");
    });
}