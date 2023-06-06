import { ITeam } from '../entities/Team';

const leaderBoardsSortByGP = (teamA: ITeam, teamB: ITeam): number => {
  if (teamA.goalsFavor > teamB.goalsFavor) return -1;
  if (teamA.goalsFavor < teamB.goalsFavor) return 1;
  return 0;
};

const leaderBoardsSortByGB = (teamA: ITeam, teamB: ITeam): number => {
  if (teamA.goalsBalance > teamB.goalsBalance) return -1;
  if (teamA.goalsBalance < teamB.goalsBalance) return 1;
  return leaderBoardsSortByGP(teamA, teamB);
};

const leaderBoardsSortByTV = (teamA: ITeam, teamB: ITeam): number => {
  if (teamA.totalVictories > teamB.totalVictories) return -1;
  if (teamA.totalVictories < teamB.totalVictories) return 1;
  return leaderBoardsSortByGB(teamA, teamB);
};

export default leaderBoardsSortByTV;
