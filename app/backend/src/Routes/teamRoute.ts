import { Router } from 'express';
import TeamsController from '../controller/TeamsController';

const teamRoute = Router();

teamRoute.get('/', TeamsController.getAllTeams);
teamRoute.get('/:id', TeamsController.getTeamById);

export default teamRoute;
