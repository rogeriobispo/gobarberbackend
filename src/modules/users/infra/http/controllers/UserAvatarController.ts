import { Request, Response } from 'express';
import UpdateUserAvatar from '@modules/users/services/UpdateUserAvatarService';
import { container } from 'tsyringe'

class UserAvatarController {
  public async update(req: Request, res: Response): Promise<Response>{
    const user_id = req.user.id;
    const avatarFilename = req.file.filename;
    const updateUserAvatar = container.resolve(UpdateUserAvatar);
    const user = await updateUserAvatar.execute({
      user_id,
      avatarFilename,
    });

    delete user.password;

    return res.json(user);
  }
}

export default new UserAvatarController
