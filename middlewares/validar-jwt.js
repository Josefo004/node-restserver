const { request, response } = require('express');
const jwt = require('jsonwebtoken');

const Usuario = require('../models/usuario');

const validarJWT = async(req = request, res = response, next) =>{

  const token = req.header('x-token');
  //console.log(token);

  //revisar si el token esta definido
  if (!token) {
    return res.status(401).json({
      msg:"No envio token de validación"
    });
  }

  //validar el token
  try {

    const { uid }=jwt.verify(token, process.env.SECRETORPRIVATEKEY);
    const usuario = await Usuario.findById(uid);

    if (!usuario) {
      return res.status(401).json({
        msg:"Usuario no existe en la BD"
      });
    }

    if (!usuario.estado) {
      return res.status(401).json({
        msg:"Usuario no activo en la BD"
      });
    }

    req.usuario = usuario;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({
      msg:"Token no valido"
    });
  }
}

module.exports = {
  validarJWT
}