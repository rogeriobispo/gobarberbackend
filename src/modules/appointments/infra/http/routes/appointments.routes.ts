import { Router } from 'express';
import AppointmentsController from '../controllers/AppointmentsController'
import ProviderAppointmentsController from '../controllers/ProviderAppointmentsController'


const appointmentsRouter = Router();

appointmentsRouter.post('/', AppointmentsController.create);
appointmentsRouter.post('/me', ProviderAppointmentsController.index);

export default appointmentsRouter;
