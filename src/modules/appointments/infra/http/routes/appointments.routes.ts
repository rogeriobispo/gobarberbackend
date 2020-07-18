import { Router } from 'express';
import AppointmentsController from '../controllers/AppointmentsController'


const appointmentsRouter = Router();

// appointmentsRouter.get('/', async (req, res) => {
//   const appointments = await appointmentRepository.find();
//   res.json(appointments);
// });

appointmentsRouter.post('/', AppointmentsController.create);

export default appointmentsRouter;
