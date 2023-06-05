import TeamsModel from '../database/models/TeamsModel';
import MatchesModel from '../database/models/MatchesModel';

export interface Team {
  id: number;
  teamName: string
}

export interface MatchesInProgress {
  homeTeamGoals: number,
  awayTeamGoals: number,
}

interface NewMatch extends MatchesInProgress {
  id?: number,
  homeTeamId: number,
  awayTeamId: number,
  inProgress: boolean,
}

export interface Matches extends NewMatch {
  homeTeam: {
    teamName: string
  },
  awayTeam: {
    teamName: string
  }
}

class MatchesService {
  public static async getAllMatches(): Promise<Matches[] | MatchesModel[]> {
    const allMatches = await MatchesModel.findAll({ include: [
      { model: TeamsModel, as: 'homeTeam', attributes: { exclude: ['id'] } },
      { model: TeamsModel, as: 'awayTeam', attributes: { exclude: ['id'] } },
    ] });

    return allMatches;
  }

  public static async getFinishedMatches(inProgress: boolean): Promise<Matches[] | MatchesModel[]> {
    const matches = await MatchesModel.findAll({
      where: { inProgress },
      include: [
        { model: TeamsModel, as: 'homeTeam', attributes: { exclude: ['id'] } },
        { model: TeamsModel, as: 'awayTeam', attributes: { exclude: ['id'] } },
      ] });

    return matches;
  }

  public static async finishMatches(id: number): Promise<void> {
    await MatchesModel.update(
      { inProgress: false },
      { where: { id } },
    );
  }

  public static async updateMatches(id: number, matches: MatchesInProgress): Promise<void> {
    const { homeTeamGoals, awayTeamGoals } = matches;
    await MatchesModel.update(
      { homeTeamGoals, awayTeamGoals },
      { where: { id } },
    );
  }

  public static async InsertMatches(newMatchBody: NewMatch): Promise<void | NewMatch> {
    const match = await MatchesModel.create(
      { ...newMatchBody, inProgress: true },
    );
    const newMatch = await MatchesModel.findByPk(match.dataValues.id);

    return newMatch as NewMatch;
  }
}
export default MatchesService;
