const express = require('express');

class Server {

    constructor() {
        this.app  = express();
        this.port = process.env.PORT;

        //Middlewares 
        this.middlewares();
        //rutas de mi aplicación
        this.routes();
    }

    middlewares() {
        //Directotio Publico
        this.app.use(express.static('public'));

    }

    routes() {
        this.app.get('/api', (req, res) => {
            res.json({
                msg : 'GET API' 
            });
        });

        this.app.post('/api', (req, res) => {
            res.json({
                msg : 'POST API' 
            });
        });

        this.app.put('/api', (req, res) => {
            res.json({
                msg : 'PUT API' 
            });
        });

        this.app.delete('/api', (req, res) => {
            res.json({
                msg : 'GET API' 
            });
        });

        this.app.patch('/api', (req, res) => {
            res.json({
                msg : 'PATCH API' 
            });
        });
    }

    listen() {
        this.app.listen(this.port, () =>{
            console.log('Servidor Corriendo en el puerto ', this.port);
        });
    }

}

module.exports = Server;