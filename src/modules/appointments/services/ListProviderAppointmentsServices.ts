import { injectable, inject } from 'tsyringe';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';
import Appointments from '../infra/typeorm/entities/Appointments';

interface IRequest {
  provider_id: string;
  month: number;
  year: number;
  day: number;
}

@injectable()
class ListProviderAppointmentsServices {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    provider_id,
    year,
    month,
    day,
  }: IRequest): Promise<Appointments[]> {
    const cacheKey = `provider-appointments:${provider_id}:${year}-${month}-${day}`;
    let appointments = await this.cacheProvider.recover<Appointments[]>(
      cacheKey,
    );

    if (!appointments) {
      appointments = await this.appointmentsRepository.findAllInDayFromProvider(
        {
          day,
          month,
          provider_id,
          year,
        },
      );

      await this.cacheProvider.save(cacheKey, Appointments);
    }

    return appointments;
  }
}

export default ListProviderAppointmentsServices;
