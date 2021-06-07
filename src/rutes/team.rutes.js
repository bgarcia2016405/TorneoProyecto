'use strict'

const express = require("express");
var authenticated = require("../middlewares/authenticated");
const teamController = require("../controllers/team.controller");

var api = express.Router();




module.exports = api;