import {container} from 'tsyringe'

import IAppointmentRespository from '@modules/appointments/repositories/IAppointmentsRepository'
import AppointmentsRepository from '@modules/appointments/infra/typeorm/repositories/appointmentsRepository'

import IUserRepository from '@modules/users/repositories/IUserRepository'
import UserRepository from '@modules/users/infra/typeorm/repositories/UsersRepository'

container.registerSingleton<IAppointmentRespository>('AppointmentsRepository', AppointmentsRepository)
container.registerSingleton<IUserRepository>('UsersRepository', UserRepository)
