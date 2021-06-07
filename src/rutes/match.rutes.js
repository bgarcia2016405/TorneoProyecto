'use strict'

const express = require("express");
var authenticated = require("../middlewares/authenticated");
const matchController = require("../controllers/match.controller");

var api = express.Router();




module.exports = api;