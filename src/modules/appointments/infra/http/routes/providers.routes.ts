import { Router } from 'express';
import ProvidersController from '../controllers/ProvidersController'
import ProviderMonthAvailabitlyController from '../controllers/ProviderMonthAvailabitlyController'
import ProviderDayAvailabitlyController from '../controllers/ProviderDayAvailabitlyController'

const ProvidersRouter = Router();

ProvidersRouter.get('/', ProvidersController.index);
ProvidersRouter.get('/:provider_id/month-availability', ProviderMonthAvailabitlyController.index);
ProvidersRouter.get('/:provider_id/day-availability', ProviderDayAvailabitlyController.index);

export default ProvidersRouter;
