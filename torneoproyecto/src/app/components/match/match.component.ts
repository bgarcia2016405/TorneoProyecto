import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Match } from 'src/app/models/match.model';
import { MatchService } from 'src/app/services/match.service';
import { TeamService } from 'src/app/services/team.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.scss'],
  providers: [MatchService,TeamService]
})
export class MatchComponent implements OnInit {
  public token;
  public matchGet : Match;
  public idTournamentRuta: String;
  constructor(
    private teamService: TeamService,
    private userService: UserService,
    private matchService: MatchService,
    public activatedRoute: ActivatedRoute
  ) {
    this.token = this.userService.getToken();
    this.matchGet = new Match("","","","",0,0)

   }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((dataRuta) => {
      this.idTournamentRuta = dataRuta.get('idTournament');
    });
    this.getMatch(this.idTournamentRuta);
  }

  getMatch(idTournament){
    this.matchService.getMatches(idTournament).subscribe(
      response => {
        this.matchGet = response
        console.log(this.matchGet)
      }
    )
  }

  createMatch(){
    this.matchService.createMatch(this.idTournamentRuta).subscribe(
      response => {
        console.log(response)
        this.getMatch( this.idTournamentRuta)
      }
    )
  }

  simulation(idMatch){
    this.matchService.simulation(idMatch).subscribe(
      response =>{
        this.getMatch(this.idTournamentRuta)
      }
    )
  }

}
