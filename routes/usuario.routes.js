const { Router } = require('express');
const { check } = require('express-validator');
const { usuarioGET, 
        usuarioPOST, 
        usuarioPUT, 
        usuarioDELETE, 
        usuarioPATCH } = require('../controllers/usuario.controller');
const { validarCampos } = require('../middlewares/validar-campos');
const Role = require('../models/role');

const router = Router();

router.get('/', usuarioGET);

router.post('/', [
    check('nombre','El Nombre es Obligario').notEmpty(),
    check('correo','El correo no es valido').isEmail(),
    check('password','El password es obligatorio y mas de 6 letras').isLength({min:6}),
    //check('rol','NO es un rol permitido').isIn(['ADMIN_ROLE','USER_ROLE']),
    check('rol').custom(async(rol='')=>{
        const existeRol = await Role.findOne({ rol });
        if (!existeRol){
            throw new Error(`El rol ${rol} no es valido`)        
        }
    }),
    validarCampos
], usuarioPOST);

router.put('/:id', usuarioPUT);

router.delete('/', usuarioDELETE);

router.patch('/', usuarioPATCH);

module.exports = router;