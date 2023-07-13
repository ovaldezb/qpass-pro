"use strict";
const mongoose = require("mongoose");
//var Schema = mongoose.Schema;
const { Schema } = mongoose;

var UsuarioSchema = Schema({
  tipoUsuario: String,
  fechaNacimiento: String,
  rfcOCurp: String,
  correo: String,
  telefono: String,
  apellidoPaterno: String,
  apellidoMaterno: String,
  idCondominio: String,
  direccion: String,
  nombre: String,
});

const Usuario = mongoose.model("Usuario", UsuarioSchema);

const database = (mongoUri) => {
  const connectionHandler = mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  return {
    close: () => {
      mongoose.connection.close();
    },
    getUserByEmail: (correo) => {
      return Usuario.findOne({ correo: correo });
    },
  };
};

module.exports = database;
