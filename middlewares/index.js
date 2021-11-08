const validarJWT  = require('../middlewares/validar-jwt');
const validarRoles = require('../middlewares/vaidar-roles');
const validarCampos = require('../middlewares/validar-campos');

module.exports = {
  ...validarJWT,
  ...validarRoles,
  ...validarCampos
}