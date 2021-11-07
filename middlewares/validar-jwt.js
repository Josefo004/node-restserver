const { request, response } = require('express');
const jwt = require('jsonwebtoken');

const validarJWT = (req = request, res = response, next) =>{

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

    jwt.verify(token, process.env.SECRETORPRIVATEKEY);
    
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