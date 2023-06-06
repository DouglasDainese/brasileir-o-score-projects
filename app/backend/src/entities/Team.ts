export type ITeam = {
  name: string
  totalPoints: number
  totalGames: number
  totalVictories: number
  totalDraws: number
  totalLosses: number
  goalsFavor: number
  goalsOwn: number
  goalsBalance: number
  efficiency: string
};

class Team {
  private _name: string;
  private _totalPoints: number;
  private _totalGames: number;
  private _totalVictories: number;
  private _totalDraws: number;
  private _totalLosses: number;
  private _goalsFavor: number;
  private _goalsOwn: number;
  private _goalsBalance: number;
  private _efficiency: string;

  constructor(name: string) {
    this._name = name;
    this._totalPoints = 0;
    this._totalGames = 0;
    this._totalVictories = 0;
    this._totalDraws = 0;
    this._totalLosses = 0;
    this._goalsFavor = 0;
    this._goalsOwn = 0;
    this._goalsBalance = 0;
    this._efficiency = '';
  }

  private efficiencyCalculator() {
    const efficiency = ((this._totalPoints / (this._totalGames * 3)) * 100);
    this._efficiency = efficiency.toFixed(2);
  }

  private goalsDifferencesCalculator() {
    this._goalsBalance = this._goalsFavor - this._goalsOwn;
  }

  private scoresCalculator() {
    const victoryPoints = this._totalVictories * 3;
    const drawPoints = this._totalDraws;
    this._totalPoints = victoryPoints + drawPoints;
  }

  public resultMatchCalculator(teamGoal: number, rivalGoals: number) {
    this._goalsFavor += teamGoal;
    this._goalsOwn += rivalGoals;
    if (teamGoal > rivalGoals) {
      this._totalVictories += 1;
      this._totalGames += 1;
    } else if (teamGoal < rivalGoals) {
      this._totalLosses += 1;
      this._totalGames += 1;
    } else {
      this._totalDraws += 1;
      this._totalGames += 1;
    }
    this.goalsDifferencesCalculator();
    this.scoresCalculator();
    this.efficiencyCalculator();
  }

  public get result() : ITeam {
    return {
      name: this._name,
      totalPoints: this._totalPoints,
      totalGames: this._totalGames,
      totalVictories: this._totalVictories,
      totalDraws: this._totalDraws,
      totalLosses: this._totalLosses,
      goalsFavor: this._goalsFavor,
      goalsOwn: this._goalsOwn,
      goalsBalance: this._goalsBalance,
      efficiency: this._efficiency,
    };
  }
}

export default Team;
