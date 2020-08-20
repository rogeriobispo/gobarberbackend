import { Request, Response } from 'express';
import { classToClass } from 'class-transformer';
import UpdateUserAvatar from '@modules/users/services/UpdateUserAvatarService';
import { container } from 'tsyringe';

class UserAvatarController {
  public async update(req: Request, res: Response): Promise<Response> {
    const user_id = req.user.id;
    const avatarFilename = req.file.filename;
    const updateUserAvatar = container.resolve(UpdateUserAvatar);
    const user = await updateUserAvatar.execute({
      user_id,
      avatarFilename,
    });

    return res.json(classToClass(user));
  }
}

export default new UserAvatarController();
