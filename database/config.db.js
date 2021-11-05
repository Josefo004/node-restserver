const mongoose = require('mongoose');


const dbConnection = async()=>{
  try {

    await mongoose.connect(process.env.MONGODB_CNN, {
      useNewUrlParser: true,
      useUnifiedTopology: true
      /* ,
      useCreateIndex: true,
      useFindAndModify: false */
    });

    console.log('Base de Datos On line');

  } catch (error) {
    console.log(error);
    throw new Error('Error al iniciar la conexion de la BD');    
  }
  
};


module.exports = {
  dbConnection
}