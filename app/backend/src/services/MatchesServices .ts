import TeamsModel from '../database/models/TeamsModel';
import MatchesModel from '../database/models/MatchesModel';

export interface Team {
  id: number;
  teamName: string
}

export interface Matches {
  id: number,
  homeTeamId: number,
  homeTeamGoals: number,
  awayTeamId: number,
  awayTeamGoals: number,
  inProgress: boolean,
  homeTeam: {
    teamName: string
  },
  awayTeam: {
    teamName: string
  }
}

class MatchesService {
  public static async getAllMatches(): Promise<Matches[] | MatchesModel[]> {
    const allMathes = await MatchesModel.findAll({ include: [
      { model: TeamsModel, as: 'homeTeam', attributes: { exclude: ['id'] } },
      { model: TeamsModel, as: 'awayTeam', attributes: { exclude: ['id'] } },
    ] });

    return allMathes;
  }
}

export default MatchesService;
