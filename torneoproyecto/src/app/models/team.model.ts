export class Team{
  constructor(
    public _id: String,
    public tournament: String,
    public name: String,
    public picture: String,
    public gamePlayed: String,
    public wins: String,
    public draws: String,
    public loses: String,
    public goalsFor: String,
    public goalsAgainst: String,
    public goalsDiference: String,
    public points: String
  ){}
}
