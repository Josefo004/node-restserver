const {response, request} = require('express');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');

const Usuario = require('../models/usuario');

const usuarioGET = (req = request, res=response) => {

    //const query = req.query;
    const {nombre = 'Sin Nombre', q, apikey} = req.query;

    res.json({
        msg : 'GET API desde el Controlador',
        nombre,
        q,
        apikey 
    });
}

const usuarioPOST = async (req=request, res=response) => {

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json(errors);
    }

    const {nombre, correo, password, rol} = req.body;
    const usuario = new Usuario({nombre, correo, password, rol});

    //verificar si el correo existe
    const existeEmail = await Usuario.findOne({correo});

    if (existeEmail) {
        return res.status(400).json({
            msg:'El correo ya existe'
        }); 
    }

    //encriptar contraseña
    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync(password,salt);

    //Guardar en la BD
    await usuario.save();

    res.json({
        msg : 'POST API desde el Controlador',
        usuario
    });
}

const usuarioPUT = (req=request, res=response) => {

    const id = req.params.id;

    res.json({
        msg : 'PUT API desde el Controlador',
        id
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