import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import ProvidersController from '../controllers/ProvidersController';
import ProviderMonthAvailabitlyController from '../controllers/ProviderMonthAvailabitlyController';
import ProviderDayAvailabitlyController from '../controllers/ProviderDayAvailabitlyController';

const ProvidersRouter = Router();

ProvidersRouter.get('/', ProvidersController.index);
ProvidersRouter.get(
  '/:provider_id/month-availability',
  celebrate({
    [Segments.PARAMS]: {
      provider_id: Joi.string().uuid().required(),
    },
  }),
  ProviderMonthAvailabitlyController.index,
);
ProvidersRouter.get(
  '/:provider_id/day-availability',
  celebrate({
    [Segments.PARAMS]: {
      provider_id: Joi.string().uuid().required(),
    },
  }),
  ProviderDayAvailabitlyController.index,
);

export default ProvidersRouter;
