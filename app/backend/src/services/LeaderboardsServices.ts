import MatchesFilter from '../utils/matchesFilter';
import MatchesModel from '../database/models/MatchesModel';
import TeamsModel from '../database/models/TeamsModel';
import Team, { ITeam } from '../entities/Team';

class LeaderboardsService {
  public static async leaderBoadsGenerator(matchType: string) {
    const allTeams: TeamsModel[] = await TeamsModel.findAll();
    const allMatches: MatchesModel[] = await MatchesModel.findAll({ where: { inProgress: false } });

    const tabelaDeClassificação: ITeam[] = allTeams.map((teamInstance) => {
      const team = new Team(teamInstance.teamName);
      const matches = MatchesFilter.filter(matchType, teamInstance.id, allMatches);

      matches.forEach((partida) => {
        if (partida.homeTeamId === teamInstance.id) {
          const { homeTeamGoals, awayTeamGoals } = partida;
          team.resultMatchCalculator(homeTeamGoals, awayTeamGoals);
        }
        if (partida.awayTeamId === teamInstance.id) {
          const { homeTeamGoals, awayTeamGoals } = partida;
          team.resultMatchCalculator(awayTeamGoals, homeTeamGoals);
        }
      });
      return team.result;
    });

    return tabelaDeClassificação;
  }
}

export default LeaderboardsService;
