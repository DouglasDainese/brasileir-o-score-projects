import { Request, Response } from 'express';
import LeaderboardsService from '../services/LeaderboardsServices';

class LeaderBoardsController {
  public static async getLeaderBoardHome(req: Request, res: Response): Promise<void | Response> {
    const leaderBoard = await LeaderboardsService.leaderBoadsGenerator('home');
    return res.status(200).json(leaderBoard);
  }

  public static async getLeaderBoardAways(req: Request, res: Response): Promise<void | Response> {
    const leaderBoard = await LeaderboardsService.leaderBoadsGenerator('aways');
    return res.status(200).json(leaderBoard);
  }

  public static async getLeaderBoardGeneral(req: Request, res: Response): Promise<void | Response> {
    const leaderBoard = await LeaderboardsService.leaderBoadsGenerator('');
    return res.status(200).json(leaderBoard);
  }
}

export default LeaderBoardsController;