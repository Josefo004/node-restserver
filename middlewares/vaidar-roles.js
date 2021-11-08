const { request, response } = require("express")


const esAdminRole = (req=request, res=response, next)=> {

  if (!req.usuario) {
    return res.status(500).json({
      msg : "NO tenemos verificado el token"
    });
  }

  const {rol, nombre } = req.usuario;

  if (rol!='ADMIN_ROLE') {
    return res.status(401).json({
      msg:`El usuario ${nombre} no tiene permiso de administrador`
    });
  }

  next();

}

const tieneRol = (...roles) => {
  return (req=request, res=response, next) => {
    //console.log(roles);
    if (!roles.includes(req.usuario.rol)) {
      return res.status(401).json({
        msg:`Solo pueden borrar los usuarios con rol ${roles}`
      });
    }  
    next();
  };
}

module.exports = {
  esAdminRole,
  tieneRol
}