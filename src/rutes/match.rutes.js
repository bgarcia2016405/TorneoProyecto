'use strict'

const express = require("express");
var authenticated = require("../middlewares/authenticated");
const matchController = require("../controllers/match.controller");

var api = express.Router();

api.get('/createMatch/:idTournament', authenticated.ensureAuth, matchController.generateMatch);
api.get('/showMatch/:idTournament', authenticated.ensureAuth, matchController.showMatch)
api.get('/simulationMatch/:idMatch', authenticated.ensureAuth, matchController.simulateMatch)

module.exports = api;