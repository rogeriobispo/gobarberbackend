import { startOfHour } from 'date-fns';
import { getCustomRepository, getRepository } from 'typeorm';
import Appointment from '../infra/typeorm/entities/Appointments';
import AppointmentsRespository from '../repositories/appointmentsRepository';
import User from '@modules/users/infra/typeorm/entities/User'
import AppError from '@shared/errors/AppError';

interface Request {
  provider_id: string;
  schedule_date: Date;
}

class CreateAppointmentService {
  public async execute({ schedule_date, provider_id }: Request): Promise<Appointment> {
    const appointmentsRepository = getCustomRepository(AppointmentsRespository);
    const userRepository = getRepository(User)
    const appointmentDate = startOfHour(schedule_date);

    const findAppointmentInSameDate = await appointmentsRepository.findByDate(
      appointmentDate,
    );
    const provider = await userRepository.findOne(provider_id)
    if(!provider)
      throw new AppError('this provider does not exists')

    if (findAppointmentInSameDate)
      throw new AppError('this appointment is already booked', 422);

    const appointment = appointmentsRepository.create({
      provider_id,
      schedule_date: appointmentDate,
    });

  await appointmentsRepository.save(appointment);

    return appointment;
  }
}

export default CreateAppointmentService;
