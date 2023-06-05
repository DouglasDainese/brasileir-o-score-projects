import { Router } from 'express';
import authMiddleware from '../middlewares/authMiddleware';
import MatchesController from '../controller/MatchesController ';

const matchesRoute = Router();

matchesRoute.get('/', MatchesController.getAllMatches);

matchesRoute.patch('/:id/finish', authMiddleware, MatchesController.finishMatches);

export default matchesRoute;
