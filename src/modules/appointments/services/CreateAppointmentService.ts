import { startOfHour } from 'date-fns';
import { injectable, inject } from 'tsyringe'
import Appointment from '../infra/typeorm/entities/Appointments';
import IAppointmentRepository from '../repositories/IAppointmentsRepository'
import AppError from '@shared/errors/AppError';

interface IRequest {
  provider_id: string;
  schedule_date: Date;
}
@injectable()
class CreateAppointmentService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentRepository){

  }

  public async execute({ schedule_date, provider_id }: IRequest): Promise<Appointment> {
    const appointmentDate = startOfHour(schedule_date);

    const findAppointmentInSameDate = await this.appointmentsRepository.findByDate(
      appointmentDate,
    );

    if (findAppointmentInSameDate)
      throw new AppError('this appointment is already booked', 422);

    const appointment = await this.appointmentsRepository.create({
      provider_id,
      date: appointmentDate,
    });


    return appointment;
  }
}

export default CreateAppointmentService;
