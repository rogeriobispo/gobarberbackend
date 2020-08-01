import { Router } from 'express';
import ProvidersController from '../controllers/ProvidersController'

const ProvidersRouter = Router();

ProvidersRouter.get('/', ProvidersController.index);

export default ProvidersRouter;
