import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import AppointmentsController from '../controllers/AppointmentsController';
import ProviderAppointmentsController from '../controllers/ProviderAppointmentsController';

const appointmentsRouter = Router();

appointmentsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      provider_id: Joi.string().uuid().required,
      date: Joi.date(),
    },
  }),
  AppointmentsController.create,
);
appointmentsRouter.post('/me', ProviderAppointmentsController.index);

export default appointmentsRouter;
