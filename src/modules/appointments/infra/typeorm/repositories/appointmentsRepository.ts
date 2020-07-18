import { getRepository, Repository } from 'typeorm';
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointments';
import IAppointmentRepository  from '@modules/appointments/repositories/IAppointmentsRepository'
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDto'

class AppointmentsRespository implements IAppointmentRepository{
  private ormRepository: Repository<Appointment>

  constructor(){
    this.ormRepository = getRepository(Appointment)
  }
  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const findAppointment = await this.ormRepository.findOne({
      where: {
        schedule_date: date,
      },
    });
    return findAppointment;
  }

  public async create({provider_id, date}: ICreateAppointmentDTO): Promise<Appointment>{
    const appointment = this.ormRepository.create({
      provider_id,
      schedule_date: date
    })

    await this.ormRepository.save(appointment)
    return appointment
  }

}

export default AppointmentsRespository;
