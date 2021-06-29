'use strict'

var Team = require('../models/team.model')
const jwt = require('../service/jwt');
const bcrypt = require("bcrypt-nodejs");
const Team = require('../models/team.model');


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

function createTeam(req, res) {
    var teamModel = new Team();
    var idTournament = req.params.idTournament;
    var params = req.body;

    teamModel.tournament = idTournament;
    teamModel.name = params.name;
    teamModel.picture = params.picture;
    teamModel.gamePlayed = params.gamePlayed;
    teamModel.wins = params.wins;
    teamModel.draws = params.draws;
    teamModel.loses = params.loses;
    teamModel.goalsFor = params.goalsFor;
    teamModel.goalsAgainst = params.goalsAgainst;
    teamModel.goalsDiference = params.goalsDiference;
    teamModel.points = params.points;


    Team.find({
        $or: [
            { name: teamModel.name },
            { picture: teamModel.picture }
        ]
    }).exec((err, teamFound) => {
        if (err) return res.status(500).send({ mensaje: 'Error en la peticion' })

        if (teamFound && teamFound.length >= 1) {
            return res.status(500).send({ mensaje: 'El equipo ya existe' })
        } else {


            Team.find(

                { tournament: teamModel.tournament }

            ).exec((err, teamsFound) => {
                if (err) return res.status(500).send({ mensaje: 'Error en la peticion' })

                if (teamsFound && teamsFound.length >= 10) {
                    return res.status(500).send({ mensaje: 'El limite de equipos es de 10' })
                } else {



                    teamModel.save((err, teamSaved) => {
                        if (err) return res.status(500).send({ mensaje: 'Error al guardar el equipo' })

                        if (teamSaved) {
                            res.status(200).send(teamSaved)
                        } else {
                            res.status(404).send({ mensaje: 'No se a podido registrar a su equipo' })
                        }
                    })
                }
            })
        }
    })
}

function getTeams(req, res) {
    var idTournament = req.params.idTournament;

    Team.find({ tournament: idTournament }).populate('tournament', 'name').exec((err, teamsFound) => {
        if (err) return res.status(500).send({ mensaje: 'Error en la peticion de los equipos del Torneo' });
        if (!teamsFound) return res.status(500).send({ mensaje: 'Error al obtener los equipos' });
        return res.status(200).send({ teamsFound });

    })
}

function getTeamId(req, res) {
    var idTeam = req.params.idTeam;

    Team.findById(idTeam).populate('tournament', 'name').exec((err, teamFound) => {
        if (err) return res.status(500).send({ mensaje: 'Error en la peticion del equipo' });
        if (!teamFound) return res.status(500).send({ mensaje: 'Error al obtener el equipo' });
        return res.status(200).send({ teamFound });
    })

}

function editTeam(req, res) {
    var idTeam = req.params.idTeam;
    var params = req.body;

    Team.findByIdAndUpdate(idTeam, params, { new: true }, (err, teamUpdated) => {
        if (err) return res.status(500).send({ mensaje: 'Error en la peticion' });
        if (!teamUpdated) return res.status(500).send({ mensaje: 'No se ha podido actualizar el equipo' });
        return res.status(200).send({ teamUpdated });
    })
}

function deleteTeam(req, res) {
    var idTeam = req.params.idTeam;

    Team.findByIdAndDelete(idTeam, (err, teamEliminated) => {
        if (err) return res.status(500).send({ mensaje: 'Error en la peticion de Eliminar' });
        if (!teamEliminated) return res.status(500).send({ mensaje: 'Error al eliminar el equipo' });
        return res.status(200).send({ teamEliminated });
    })
}

module.exports = {
    createTeam,
    getTeams,
    getTeamId,
    editTeam,
    deleteTeam
}