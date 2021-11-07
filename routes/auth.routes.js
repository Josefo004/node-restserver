const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');

const { loginPOST } = require('../controllers/auth.controller');


const router = Router();

router.post('/login', [
  check('correo','El correo es Obligatorio').isEmail(),
  check('password','La contraseña es Obligatoria').notEmpty(),
  validarCampos
], loginPOST);

module.exports = router;