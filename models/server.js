const express = require('express');
const cors = require('cors');

class Server {

    constructor() {
        this.app  = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios';

        //Middlewares 
        this.middlewares();
        //rutas de mi aplicación
        this.routes();
    }

    middlewares() {
        //CORS
        this.app.use(cors());

        //Directotio Publico
        this.app.use(express.static('public'));

    }

    routes() {
        this.app.use(this.usuariosPath,require('../routes/usuario.routes'))
    }

    listen() {
        this.app.listen(this.port, () =>{
            console.log('Servidor Corriendo en el puerto ', this.port);
        });
    }

}

module.exports = Server;