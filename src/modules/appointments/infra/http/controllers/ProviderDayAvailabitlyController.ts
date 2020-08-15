import {Request, Response} from 'express'
import { container } from 'tsyringe'
import ListProviderDayAvailabilityService from '@modules/appointments/services/ListProviderDayAvailabilityService';

class ProviderDayAvailabilityController {
  public async index(req: Request, res: Response): Promise<Response>{
  const { provider_id } = req.params

    const { month, year, day } = req.body

    const listProviderDayAvailabilityService = container.resolve(ListProviderDayAvailabilityService);

    const availability = await listProviderDayAvailabilityService.execute({
      provider_id,
      month,
      year,
      day
    });

    return res.json(availability);
  }
}


export default new ProviderDayAvailabilityController