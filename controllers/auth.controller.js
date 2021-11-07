const {response, request} = require('express');
const bcrypt = require('bcryptjs');

const Usuario = require('../models/usuario');

const loginPOST = async(req=request, res=response) => {
  const {correo, password} = req.body;

  try {
    //verificar si el email existe
    const usuario = await Usuario.findOne({correo});
    if (!usuario) {
      return res.status(400).json({
        msg: 'Usuario / Contraseña no son correctos - email'
      });
    }

    //verificar si el usuario esta activo
    if (!usuario.estado) {
      return res.status(400).json({
        msg: 'Usuario no ACTIVO estado:false'
      });
    }

    //verificar contraseña 
    const passwordValido = bcrypt.compareSync(password, usuario.password);
    if (!passwordValido) {
      return res.status(400).json({
        msg: 'Error en la contraseña'
      });
    }

    //generar JWT


    res.json({
      msg: 'POST de utenticación Login OK'
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: 'no esta procesando el Body speak backend developer'
    });
  }

}

module.exports = {
  loginPOST
}