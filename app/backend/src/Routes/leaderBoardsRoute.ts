import { Router } from 'express';
import LeaderBoardsController from '../controller/LeaderBoardsController';

const leaderBoardsRoute = Router();

leaderBoardsRoute.get('/home', LeaderBoardsController.getLeaderBoardHome);
leaderBoardsRoute.get('/away', LeaderBoardsController.getLeaderBoardAways);
leaderBoardsRoute.get('/', LeaderBoardsController.getLeaderBoardGeneral);

export default leaderBoardsRoute;
