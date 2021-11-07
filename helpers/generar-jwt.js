const jwt = require('jsonwebtoken');

const generarJWT = ( uid = '') => {

  return new Promise( (resolve, reject) =>{

    const payload = { uid };

    jwt.sign(payload, process.env.SECRETORPRIVATEKEY,{
      expiresIn: '4h'
    }, (err, token)=>{
      if (err) {
        console.log(err);
        reject(`no se pudo generar el TOKEN para el UID ${uid}`);
      }
      else{
        resolve(token);
      }
    });
  });

}

module.exports = {
  generarJWT
}