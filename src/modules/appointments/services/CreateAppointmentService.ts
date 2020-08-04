import { startOfHour, isBefore, getHours } from 'date-fns';
import { injectable, inject } from 'tsyringe'
import Appointment from '../infra/typeorm/entities/Appointments';
import IAppointmentRepository from '../repositories/IAppointmentsRepository'
import AppError from '@shared/errors/AppError';
import appointmentsRouter from '../infra/http/routes/appointments.routes';

interface IRequest {
  provider_id: string;
  schedule_date: Date;
  user_id: string;
}
@injectable()
class CreateAppointmentService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentRepository){

  }

  public async execute({ schedule_date, provider_id, user_id }: IRequest): Promise<Appointment> {
    const appointmentDate = startOfHour(schedule_date);

    if(isBefore(appointmentDate, Date.now())) throw new AppError("You can't creat an appointment on past")
    const findAppointmentInSameDate = await this.appointmentsRepository.findByDate(
      appointmentDate,
    );

    if(user_id === provider_id) throw new AppError("You can't create appointment to yourself")

    if(getHours(appointmentDate) < 8 || getHours(appointmentDate) > 17) throw new AppError("Appointment must be between 8am and 5pm")

    if (findAppointmentInSameDate)
      throw new AppError('this appointment is already booked', 422);

    const appointment = await this.appointmentsRepository.create({
      provider_id,
      user_id,
      date: appointmentDate,
    });


    return appointment;
  }
}

export default CreateAppointmentService;
