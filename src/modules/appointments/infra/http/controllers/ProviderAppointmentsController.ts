import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ListProviderAppointmentsServices from '@modules/appointments/services/ListProviderAppointmentsServices';

class ProviderAppointmentsController {
  public async index(req: Request, res: Response): Promise<Response> {
    const provider_id = req.user.id;
    const { day, month, year } = req.query;

    const listProviderAppointment = container.resolve(
      ListProviderAppointmentsServices,
    );

    const appointments = await listProviderAppointment.execute({
      provider_id,
      day: Number(day),
      month: Number(month),
      year: Number(year),
    });

    return res.json(appointments);
  }
}

export default new ProviderAppointmentsController();
