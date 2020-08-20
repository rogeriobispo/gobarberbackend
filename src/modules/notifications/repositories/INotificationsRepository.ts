import ICreateNotificationDTO from '../dtos/ICreateNotificationDTO';
import Notification from '../infra/typeorm/Schemas/notification';

interface INotificationRepository {
  create(data: ICreateNotificationDTO): Promise<Notification>;
}

export default INotificationRepository;
