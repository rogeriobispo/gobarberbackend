import { injectable, inject } from 'tsyringe'
import IAppointmentsRepository from '../repositories/IAppointmentsRepository'
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider'
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
    private appointmentsRepository: IAppointmentsRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider
    ){}

  public async execute({ provider_id, year, month, day }: IRequest): Promise<Appointments[]> {
    const appointments = await this.appointmentsRepository.findAllInDayFromProvider({
      day,
      month,
      provider_id,
      year
    })

    await this.cacheProvider.save('asdf', 'asdf')

    return appointments
  }
}

export default ListProviderAppointmentsServices;
