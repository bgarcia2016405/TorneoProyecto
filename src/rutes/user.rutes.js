////////////////////////Selman//////////////////////////////////////////
'use strict'

// IMPORTS
const express = require("express");
const userController = require("../controllers/user.controller");

// MIDDLEWARES
var authenticated = require("../middlewares/authenticated");

// RUTES
var api = express.Router();

    api.post('/Login', userController.Login);
    api.post('/createUser', userController.createUser);
    api.delete('/dropUser', authenticated.ensureAuth, userController.dropUser);
    api.put('/editUser', authenticated.ensureAuth, userController.editUser);
    api.get('/showUserId/:idUsuario', userController.findUserId)
    api.get('/showAllUser', authenticated.ensureAuth, userController.showAllUsers)

module.exports = api;


