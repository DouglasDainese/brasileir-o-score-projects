import { Router } from 'express';
import MatchesController from '../controller/MatchesController ';

const matchesRoute = Router();

matchesRoute.get('/', MatchesController.getAllMatches);

export default matchesRoute;
