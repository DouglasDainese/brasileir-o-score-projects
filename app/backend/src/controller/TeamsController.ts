import { Request, Response } from 'express';
import TeamsService from '../services/TeamServices';

class TeamsController {
  public static async getAllTeams(_req: Request, res: Response): Promise<void> {
    const allTeams = await TeamsService.getAllTeams();

    res.status(200).json(allTeams);
  }
}

export default TeamsController;
