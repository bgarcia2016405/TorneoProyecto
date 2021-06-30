'use strict'

const jwt = require('../service/jwt');
const bcrypt = require("bcrypt-nodejs");

const Teams = require('../models/team.model')
const Match = require('../models/match.model') 

function generateMatch(req,res){
   var idTournament = req.params.idTournament;
    
    var i = 0
    var team = []
    Teams.find({tournament:idTournament},(err,teamsFound)=>{
        teamsFound.forEach(
            element =>{
                
                team[i] = element._id
                i = i + 1; 
            }
        )
      for (let index = 0; index < team.length - 1; index++) {
          for (let alpha = 1; alpha < team.length; alpha++) {
              if(index != alpha){
                  if(index < alpha){
                    var matchModel = new Match();
                    matchModel.tournament = idTournament
                    matchModel.team1 = team[index]
                    matchModel.team2 = team[alpha] 
                    matchModel.save((err,matchSaved) => {
                     if(err) console.log(err)
                     if(matchSaved)  console.log(index, alpha)
                 })  
                  } 
              }   
          }
      }
      
       return res.status(200).send({report:'Match'})
       
    })

}

function showMatch(req,res){
    var idTournament = req.params.idTournament
    Match.find({tournament:idTournament},(err,teamsShow)=>{
        return res.status(200).send(teamsShow)
}).populate('team1 team2')
}

function simulateMatch(req,res){
    var idMatch = req.params.idMatch;

        var num1 = Math.round(Math.random()*5)
        var num2 = Math.round(Math.random()*5)
    Match.findByIdAndUpdate(idMatch,{score1:num1,score2:num2},{new:true},(err,matchFound)=>{
        var lose1 = 0
        var lose2 = 0
        var win1 = 0
        var win2 = 0
        var draw1 = 0
        var draw2 = 0
        var points1 = 0
        var points2 = 0
        if(num1<num2){  lose1 = 1
                        win2 = 1
                        points2 = 3}
        if(num1>num2){  win1 = 1
                        lose2 = 1,
                        points1 = 3}
        if(num1==num2){ draw1 = 1
                        draw2 = 1
                        points1 = 1
                        points2 = 1}
        Teams.findById(matchFound.team1,(err,teamOne)=>{
        Teams.findById(matchFound.team2,(err,teamTwo)=>{
            Teams.findByIdAndUpdate(matchFound.team1,{  
                gamePlayed:teamOne.gamePlayed + 1,
                wins:teamOne.wins + win1,
                loses:teamOne.loses + lose1,
                draws:teamOne.draws + draw1,
                goalsFor:teamOne.goalsFor + num1,
                goalsAgainst:teamOne.goalsAgainst + num2,
                goalsDiference: (teamOne.goalsFor + num1) - (teamOne.goalsAgainst + num2),
                points:teamOne.points + points1},(err,team1Update) =>{
                    Teams.findByIdAndUpdate(matchFound.team2,{  
                        gamePlayed:teamTwo.gamePlayed + 1,
                        wins:teamTwo.wins + win2,
                        loses:teamTwo.loses + lose2,
                        draws:teamTwo.draws + draw2,
                        goalsFor:teamTwo.goalsFor + num2,
                        goalsAgainst:teamTwo.goalsAgainst + num1,
                        goalsDiference: (teamTwo.goalsFor + num2) - (teamTwo.goalsAgainst + num1),
                        points:teamTwo.points + points2},(err,team1Update) =>{
                            return res.status(200).send(matchFound)
                                                                })
                                                        })
        })

        })
        
        
        
    })
    
}


module.exports = {
    generateMatch,
    showMatch,
    simulateMatch
}