import { Request, Response } from 'express';
import TeamsService from '../services/TeamServices';

class TeamsController {
  public static async getAllTeams(_req: Request, res: Response): Promise<void | Response> {
    const allTeams = await TeamsService.getAllTeams();

    return res.status(200).json(allTeams);
  }

  public static async getTeamById(req: Request, res: Response): Promise<void | Response> {
    const { id } = req.params;
    const team = await TeamsService.findById(+id);

    return res.status(200).json(team);
  }
}

export default TeamsController;
