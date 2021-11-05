const { Router } = require('express');
const { check } = require('express-validator');
const { usuarioGET, 
        usuarioPOST, 
        usuarioPUT, 
        usuarioDELETE, 
        usuarioPATCH } = require('../controllers/usuario.controller');

const router = Router();

router.get('/', usuarioGET);

router.post('/', [
    check('correo','El correo no es valido').isEmail()
], usuarioPOST);

router.put('/:id', usuarioPUT);

router.delete('/', usuarioDELETE);

router.patch('/', usuarioPATCH);

module.exports = router;