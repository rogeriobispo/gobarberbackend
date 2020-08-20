import { startOfHour, isBefore, getHours, format } from 'date-fns';
import { injectable, inject } from 'tsyringe';
import INotificationRepository from '@modules/notifications/repositories/INotificationsRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import AppError from '@shared/errors/AppError';
import IAppointmentRepository from '../repositories/IAppointmentsRepository';
import Appointment from '../infra/typeorm/entities/Appointments';

interface IRequest {
  provider_id: string;
  schedule_date: Date;
  user_id: string;
}
@injectable()
class CreateAppointmentService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentRepository,

    @inject('NotificationRepository')
    private notificationRepository: INotificationRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    schedule_date,
    provider_id,
    user_id,
  }: IRequest): Promise<Appointment> {
    const appointmentDate = startOfHour(schedule_date);

    if (isBefore(appointmentDate, Date.now()))
      throw new AppError("You can't creat an appointment on past");
    const findAppointmentInSameDate = await this.appointmentsRepository.findByDate(
      appointmentDate,
    );

    if (user_id === provider_id)
      throw new AppError("You can't create appointment to yourself");

    if (getHours(appointmentDate) < 8 || getHours(appointmentDate) > 17)
      throw new AppError('Appointment must be between 8am and 5pm');

    if (findAppointmentInSameDate)
      throw new AppError('this appointment is already booked', 422);

    const appointment = await this.appointmentsRepository.create({
      provider_id,
      user_id,
      date: appointmentDate,
    });

    const formatedDate = format(appointmentDate, "dd/MM/yyyy 'ás' HH:mm'h'");

    await this.notificationRepository.create({
      recipient_id: provider_id,
      content: `Novo agendamento para dia ${formatedDate}`,
    });

    await this.cacheProvider.invalidate(
      `provider-appointments:${provider_id}:${format(
        appointmentDate,
        'yyyy-M-d',
      )}`,
    );
    return appointment;
  }
}

export default CreateAppointmentService;
