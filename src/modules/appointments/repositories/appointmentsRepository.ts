import { EntityRepository, Repository } from 'typeorm';
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointments';

@EntityRepository(Appointment)
class AppointmentsRespository extends Repository<Appointment> {
  public async findByDate(date: Date): Promise<Appointment | null> {
    const findAppointment = await this.findOne({
      where: {
        schedule_date: date,
      },
    });
    return findAppointment || null;
  }
}

export default AppointmentsRespository;
