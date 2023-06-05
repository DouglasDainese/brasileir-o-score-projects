import { Request, Response } from 'express';
import parseBoolean from '../utils/parseBool';
import MatchesServices from '../services/MatchesServices ';

class MatchesController {
  public static async getAllMatches(req: Request, res: Response): Promise<void | Response> {
    const { inProgress } = req.query;

    if (inProgress === 'true' || inProgress === 'false') {
      const valueBool = parseBoolean(inProgress);
      const matches = await MatchesServices.getFinishedMatches(valueBool);

      return res.status(200).json(matches);
    }

    const allMatches = await MatchesServices.getAllMatches();

    return res.status(200).json(allMatches);
  }

  public static async finishMatches(req: Request, res: Response): Promise<void | Response> {
    const { id } = req.params;

    await MatchesServices.finishMatches(+id);

    return res.status(200).json({ message: 'Finished' });
  }

  public static async updateMatches(req: Request, res: Response): Promise<void | Response> {
    const { id } = req.params;
    const { body } = req;

    await MatchesServices.updateMatches(+id, body);

    return res.status(200).json({ message: 'updated' });
  }
}

export default MatchesController;
