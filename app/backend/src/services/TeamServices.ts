import TeamsModel from '../database/models/TeamsModel';

export interface Team {
  id: number;
  teamName: string
}

class TeamsService {
  public static async getAllTeams(): Promise<Team[]> {
    return TeamsModel.findAll();
  }
}

export default TeamsService;
