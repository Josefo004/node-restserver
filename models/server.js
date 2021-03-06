const express = require('express');
const cors = require('cors');

const { dbConnection } = require('../database/config.db');

class Server {

    constructor() {
        this.app  = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios';
        this.authPath     = '/api/auth';

        //Conectar a la Base de Datos
        this.conectarDB();

        //Middlewares 
        this.middlewares();
        
        //rutas de mi aplicación
        this.routes();
    }

    async conectarDB(){
        await dbConnection()
    }

    middlewares() {
        //CORS
        this.app.use(cors());

        //Parseo y Lectura del Body POST
        this.app.use(express.json());

        //Directotio Publico
        this.app.use(express.static('public'));

    }

    routes() {
        this.app.use(this.authPath,require('../routes/auth.routes'));
        this.app.use(this.usuariosPath,require('../routes/usuario.routes'));
    }

    listen() {
        this.app.listen(this.port, () =>{
            console.log('Servidor Corriendo en el puerto ', this.port);
        });
    }

}

module.exports = Server;