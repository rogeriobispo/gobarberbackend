import { uuid } from 'uuidv4'
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointments';
import IAppointmentRepository  from '@modules/appointments/repositories/IAppointmentsRepository'
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDto'
import { application } from 'express';

class AppointmentsRespository implements IAppointmentRepository{
  private appointments: Appointment[] = []

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const findAppointment = this.appointments.find(appointment => {
      appointment.schedule_date = date
    })

    return findAppointment
  }

  public async create({provider_id, date}: ICreateAppointmentDTO): Promise<Appointment>{
    const appointment = new Appointment();
    appointment.id = uuid()
    appointment.schedule_date = date;
    appointment.provider_id = provider_id;
    this.appointments.push(appointment)
    return appointment
  }

}

export default AppointmentsRespository;
