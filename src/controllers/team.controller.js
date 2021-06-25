'use strict'

var Team = require('../models/team.model')
const jwt = require('../service/jwt');
const bcrypt = require("bcrypt-nodejs");

////////////////////////Selman//////////////////////////////////////////

////////////////////////Angel//////////////////////////////////////////

////////////////////////Byron//////////////////////////////////////////

function crearrapido(req,res){
    var params = req.body;
    var team = new Team();
    if (params.name) {
        team.tournament = "60d5025b6bbcfa19e4e096b1"
        team.name = params.name
        team.gamePlayed = 0
        team.wins = 0
        team.draws = 0
        team.loses = 0
        team.goalsFor = 0
        team.goalsAgainst = 0
        team.goalsDiference = 0
        team.points = 0
        team.save((err,teamSaved)=>{
            return res.status(200).send( teamSaved );
        })

    } else {
        res.status(500).send({ mensaje: 'Rellene los datos necesarios para crear el torneo' });
    }
}


////////////////////////Jona//////////////////////////////////////////


module.exports = {
    crearrapido
}