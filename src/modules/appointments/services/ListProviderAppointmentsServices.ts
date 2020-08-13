import { injectable, inject, container } from 'tsyringe'
import IAppointmentsRepository from '../repositories/IAppointmentsRepository'
import Appointments from '../infra/typeorm/entities/Appointments'


interface IRequest {
  provider_id: string
  month: number
  year: number
  day: number
}

@injectable()
class ListProviderAppointmentsServices {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository
    ){}

  public async execute({ provider_id, year, month, day }: IRequest): Promise<Appointments[]> {
    const appointments = await this.appointmentsRepository.findAllInDayFromProvider({
      day,
      month,
      provider_id,
      year
    })

    return appointments
  }
}

export default ListProviderAppointmentsServices;
