import { getRepository, Repository, Raw } from 'typeorm';
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointments';
import IAppointmentRepository  from '@modules/appointments/repositories/IAppointmentsRepository'
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDto'
import IFindAllInMonthFromProviderDTO from '@modules/appointments/dtos/IFindAllInMonthFromProviderDTO';
import IFindAllInDayFromProviderDTO from '@modules/appointments/dtos/IFindAllInDayFromProviderDTO';

class AppointmentsRespository implements IAppointmentRepository{
  private ormRepository: Repository<Appointment>

  constructor(){
    this.ormRepository = getRepository(Appointment)
  }

  public async findAllInDayFromProvider({ provider_id, month, year, day }: IFindAllInDayFromProviderDTO): Promise<Appointment[]> {
    const parsedMonth = String(month).padStart(2, '0')
    const parsedDay = String(day).padStart(2, '0')

    const appointments = await this.ormRepository.find({
      where: {
        provider_id,
        schedule_date: Raw((dateFiedName) =>
        `to_char(${dateFiedName}, 'DD-MM-YYYY') = '${parsedDay}-${parsedMonth}-${year}'`
        )
      },
    });

    return appointments
  }

  public async findAllInMonthFromProvider({ provider_id, month, year }: IFindAllInMonthFromProviderDTO): Promise<Appointment[]> {
    const parsedMonth = String(month).padStart(2, '0')

    const appointments = await this.ormRepository.find({
      where: {
        provider_id,
        schedule_date: Raw((dateFiedName) =>
        `to_char(${dateFiedName}, 'MM-YYYY') = '${parsedMonth}-${year}'`
        )
      },
    });

    return appointments
  }

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const findAppointment = await this.ormRepository.findOne({
      where: {
        schedule_date: date,
      },
    });
    return findAppointment;
  }

  public async create({provider_id, date, user_id}: ICreateAppointmentDTO): Promise<Appointment>{
    const appointment = this.ormRepository.create({
      provider_id,
      user_id,
      schedule_date: date
    })

    await this.ormRepository.save(appointment)
    return appointment
  }

}

export default AppointmentsRespository;
