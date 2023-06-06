import leaderBoardsSortByTV from '../utils/sortLeaderBoards';
import MatchesFilter from '../utils/matchesFilter';
import MatchesModel from '../database/models/MatchesModel';
import TeamsModel from '../database/models/TeamsModel';
import Team, { ITeam } from '../entities/Team';

class LeaderboardsService {
  private static async leaderBoadsGenerator(matchType: string) {
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

  public static async leaderBoadsSorting(matchType: string) {
    const leaderBoards = await this.leaderBoadsGenerator(matchType);
    leaderBoards.sort((teamA, teamB) => {
      if (teamA.totalPoints > teamB.totalPoints) {
        return -1;
      }
      if (teamA.totalPoints < teamB.totalPoints) {
        return 1;
      }
      return leaderBoardsSortByTV(teamA, teamB);
    });
    return leaderBoards;
  }
}

export default LeaderboardsService;
