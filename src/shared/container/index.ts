import { container } from 'tsyringe';

import '@modules/users/providers';
import './providers';

import IAppointmentRespository from '@modules/appointments/repositories/IAppointmentsRepository';
import AppointmentsRepository from '@modules/appointments/infra/typeorm/repositories/appointmentsRepository';

import IUserRepository from '@modules/users/repositories/IUserRepository';
import UserRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';
import UserTokensRepository from '@modules/users/infra/typeorm/repositories/UsersTokensRepository';
import INotificationRepository from '@modules/notifications/repositories/INotificationsRepository';
import NotificationRepository from '@modules/notifications/infra/typeorm/repositories/NotificationsRepository';

container.registerSingleton<IAppointmentRespository>(
  'AppointmentsRepository',
  AppointmentsRepository,
);
container.registerSingleton<IUserRepository>('UsersRepository', UserRepository);
container.registerSingleton<IUserTokensRepository>(
  'UserTokensRepository',
  UserTokensRepository,
);
container.registerSingleton<INotificationRepository>(
  'NotificationsRepository',
  NotificationRepository,
);
