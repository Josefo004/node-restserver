const {response, request} = require('express');
const bcrypt = require('bcryptjs');


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

    const {nombre, correo, password, rol} = req.body;
    const usuario = new Usuario({nombre, correo, password, rol});

    //verificar si el correo existe
    /* const existeEmail = await Usuario.findOne({correo});

    if (existeEmail) {
        return res.status(400).json({
            msg:`El correo ${correo} ya existe`
        }); 
    } */

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

const usuarioPUT = async(req=request, res=response) => {

    const id = req.params.id;
    const {_id, password, google, correo, ...resto} = req.body;

    //validar contra base de datos ID
    if (password){
        //encriptar contraseña, 
        const salt = bcrypt.genSaltSync();
        resto.password = bcrypt.hashSync(password,salt);
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto);

    res.json({
        msg : 'PUT API desde el Controlador',
        usuario
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