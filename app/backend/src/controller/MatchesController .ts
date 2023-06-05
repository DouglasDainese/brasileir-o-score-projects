import { Request, Response } from 'express';
import MatchesServices from '../services/MatchesServices ';

class MatchesController {
  public static async getAllMatches(_req: Request, res: Response): Promise<void> {
    const allMatches = await MatchesServices.getAllMatches();

    res.status(200).json(allMatches);
  }
}

export default MatchesController;
