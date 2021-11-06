const {response, request} = require('express');
const bcrypt = require('bcryptjs');


const Usuario = require('../models/usuario');

const usuarioGET = async (req = request, res=response) => {

    const { limite = 5, desde = 0 } =  req.query;
    const filtro = { estado: true }
    /* 
    const usuarios = await Usuario.find(filtro)
        .skip(Number(desde))
        .limit(Number(limite));

    const total = await Usuario.countDocuments(filtro);
    */

    //Ejecutando promesas simultaneas
    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments(filtro),
        Usuario.find(filtro)
            .skip(Number(desde))
            .limit(Number(limite))
    ]);

    res.json({
        msg : 'GET API desde el Controlador',
        total,
        usuarios
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

const usuarioDELETE = async(req=request, res=response) => {
    const id = req.params.id;

    //borramos fisicamente el registro (NO SE RECOMIENDA)
    //const usuario = await Usuario.findByIdAndDelete(id);

    //Borrado Logico de un registro
    const usuario = await Usuario.findByIdAndUpdate(id,{estado:false});

    res.json({
        msg : 'DELETE API desde el Controlador',
        id,
        usuario
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