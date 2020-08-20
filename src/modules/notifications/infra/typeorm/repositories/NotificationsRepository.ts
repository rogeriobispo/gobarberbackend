import { getMongoRepository, MongoRepository } from 'typeorm';
import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';
import ICreateNotificationdDTO from '@modules/notifications/dtos/ICreateNotificationDTO';

import Notification from '../Schemas/notification';

class NotificationsRespository implements INotificationsRepository {
  private ormRepository: MongoRepository<Notification>;

  constructor() {
    this.ormRepository = getMongoRepository(Notification, 'mongo');
  }

  public async create({
    content,
    recipient_id,
  }: ICreateNotificationdDTO): Promise<Notification> {
    const notification = this.ormRepository.create({
      content,
      recipient_id,
    });

    await this.ormRepository.save(notification);
    return notification;
  }
}

export default NotificationsRespository;
