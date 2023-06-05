import { Request, Response } from 'express';
import ValidationErrors from '../errors/validationsErros';
import parseBoolean from '../utils/parseBool';
import MatchesServices from '../services/MatchesServices ';
import TeamsService from '../services/TeamServices';

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

  public static async insetMatches(req: Request, res: Response): Promise<void | Response> {
    const { id, ...body } = req.body;
    const { homeTeamId, awayTeamId } = body;

    if (homeTeamId === awayTeamId) {
      throw new ValidationErrors(422, 'It is not possible to create a match with two equal teams');
    }

    const team1 = await TeamsService.findById(homeTeamId);
    const team2 = await TeamsService.findById(awayTeamId);

    if (!team1 || !team2) {
      throw new ValidationErrors(404, 'There is no team with such id!');
    }

    const newMath = await MatchesServices.InsertMatches(body);

    return res.status(201).json(newMath);
  }
}

export default MatchesController;
