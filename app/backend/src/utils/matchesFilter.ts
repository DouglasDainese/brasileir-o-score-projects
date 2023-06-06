import MatchesModel from '../database/models/MatchesModel';

class MatchesFilter {
  static filter(matchType: string, teamId: number, matchesArr: MatchesModel[]) {
    switch (matchType) {
      case 'home':
        return matchesArr.filter((match) => match.homeTeamId === teamId);
      case 'away':
        return matchesArr.filter((match) => match.awayTeamId === teamId);
      default:
        return matchesArr;
    }
  }
}

export default MatchesFilter;
