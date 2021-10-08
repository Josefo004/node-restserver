const {response} = require('express');

const usuarioGET = (req, res=response) => {
    res.json({
        msg : 'GET API desde el Controlador' 
    });
}

const usuarioPOST = (req, res=response) => {
    res.json({
        msg : 'POST API desde el Controlador' 
    });
}

const usuarioPUT = (req, res=response) => {
    res.json({
        msg : 'PUT API desde el Controlador' 
    });
}

const usuarioDELETE = (req, res=response) => {
    res.json({
        msg : 'DELETE API desde el Controlador' 
    });
}
const usuarioPATCH = (req, res=response) => {
    res.json({
        msg : 'PATCH API desde el Controlador' 
    });
}

module.exports = {
    usuarioGET,
    usuarioPOST,
    usuarioPUT,
    usuarioDELETE,
    usuarioPATCH
}