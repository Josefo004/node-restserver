const { Router } = require('express');
const { check } = require('express-validator');

/* const { validarJWT } = require('../middlewares/validar-jwt');
const { esAdminRole,tieneRol } = require('../middlewares/vaidar-roles');
const { validarCampos } = require('../middlewares/validar-campos'); */

//Lo mismo que arriva pero con un archivo intex en el midlewares
const {validarJWT, 
       esAdminRole, 
       tieneRol, 
       validarCampos} = require('../middlewares');

const { esRoleValido, existeEmail, existeIdUsuario } = require('../helpers/db-validators');

const { usuarioGET, 
        usuarioPOST, 
        usuarioPUT, 
        usuarioDELETE, 
        usuarioPATCH } = require('../controllers/usuario.controller');

const router = Router();

router.get('/', usuarioGET);

router.post('/', [
    check('nombre','El Nombre es Obligario').notEmpty(),
    check('correo','El correo no es valido').isEmail(),
    check('correo').custom(existeEmail),
    check('password','El password es obligatorio y mas de 6 letras').isLength({min:6}),
    //check('rol','NO es un rol permitido').isIn(['ADMIN_ROLE','USER_ROLE']),
    check('rol').custom(esRoleValido),
    validarCampos
], usuarioPOST);

router.put('/:id',[
    check('id','No es ID valido').isMongoId(),
    check('id').custom(existeIdUsuario),
    check('rol').custom(esRoleValido),
    validarCampos
], usuarioPUT);

router.delete('/:id', [
    validarJWT,
    //esAdminRole,
    tieneRol('ADMIN_ROLE','VENTAS_ROLE'),
    check('id','No es ID valido').isMongoId(),
    check('id').custom(existeIdUsuario),
    validarCampos
], usuarioDELETE);

router.patch('/', usuarioPATCH);

module.exports = router;