'use strict'

const express = require("express");
var authenticated = require("../middlewares/authenticated");
const matchController = require("../controllers/match.controller");

var api = express.Router();

api.post('/createMatch', authenticated.ensureAuth, matchController.generateMatch);
api.post('/showMatch', authenticated.ensureAuth, matchController.showMatch)
api.post('/simulationMatch/:idMatch', authenticated.ensureAuth, matchController.simulateMatch)

module.exports = api;