import { Router } from 'express';
import { parseISO } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';
import AppointmentsRespository from '@modules/appointments/repositories/appointmentsRepository';

const appointmentsRouter = Router();

appointmentsRouter.get('/', async (req, res) => {
  const appointmentRepository = getCustomRepository(AppointmentsRespository);
  const appointments = await appointmentRepository.find();
  res.json(appointments);
});

appointmentsRouter.post('/', async (req, res) => {
  const { provider_id, date } = req.body;
  const parsedDate = parseISO(date);
  const createAppointment = new CreateAppointmentService();

  const appointment = await createAppointment.execute({
    provider_id,
    schedule_date: parsedDate,
  });

  return res.json(appointment);
});

export default appointmentsRouter;
