'use strict'

const express = require("express");
var authenticated = require("../middlewares/authenticated");
const tournamentController = require("../controllers/tournament.controller");

var api = express.Router();




module.exports = api;