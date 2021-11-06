const Role = require('../models/role');
const Usuario = require('../models/usuario');

const esRoleValido = async(rol='')=>{
  const existeRol = await Role.findOne({ rol });
  if (!existeRol){
      throw new Error(`El rol ${rol} no es valido`)        
  }
}

const existeEmail = async(correo)=>{
  const bm =  await Usuario.findOne({ correo }); //buscar email
  if (bm) {
    throw new Error(`El correo ${correo} ya existe`);
  }
}

const existeIdUsuario = async(id)=>{
  const bid =  await Usuario.findById( id ); //buscar id
  if (!bid) {
    throw new Error(`El ID ${id} NO existe`);
  }
}


module.exports = {
  esRoleValido, 
  existeEmail,
  existeIdUsuario
}