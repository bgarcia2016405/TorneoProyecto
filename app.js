'use strict'

//VARIABLES GLOBALES
const express = require("express");
const app = express();
const bodyParser = require("body-parser")
const cors = require("cors")

// IMPORTACION RUTAS
const user_controller = require("./src/controllers/user.controller");
const user_rutes = require("./src/rutes/user.rutes");

// MIDDLEWARES
app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json())

// CABECERAS
app.use(cors());

// CARGA DE RUTAS
app.use('/api', user_rutes);


user_controller.createUserStaticAdmin();
//EXPORTAR
module.exports = app;