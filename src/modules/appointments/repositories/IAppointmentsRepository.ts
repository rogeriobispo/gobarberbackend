import Appointment from '../infra/typeorm/entities/Appointments'
import ICreateAppointmentDTO from '../dtos/ICreateAppointmentDto'
import IFindAllInMonthFromProviderDTO from '../dtos/IFindAllInMonthFromProviderDTO'
import IFindAllInDayFromProviderDTO from '../dtos/IFindAllInDayFromProviderDTO'

interface IAppointmentsRepository {
  create(data: ICreateAppointmentDTO): Promise<Appointment>

  findByDate(date: Date): Promise<Appointment | undefined>

  findAllInMonthFromProvider(data: IFindAllInMonthFromProviderDTO): Promise<Appointment[]>

  findAllInDayFromProvider(data: IFindAllInDayFromProviderDTO): Promise<Appointment[]>
}

export default IAppointmentsRepository
