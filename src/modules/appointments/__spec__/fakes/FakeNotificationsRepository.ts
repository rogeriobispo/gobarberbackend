import { ObjectID } from 'mongodb';
import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';
import ICreateNotificationdDTO from '@modules/notifications/dtos/ICreateNotificationDTO';

import Notification from '@modules/notifications/infra/typeorm/Schemas/notification';

class NotificationsRespository implements INotificationsRepository {
  private notification: Notification[] = [];

  public async create({
    content,
    recipient_id,
  }: ICreateNotificationdDTO): Promise<Notification> {
    const notification = new Notification();

    Object.assign(notification, { id: new ObjectID(), content, recipient_id });

    this.notification.push(notification);

    return notification;
  }
}

export default NotificationsRespository;
