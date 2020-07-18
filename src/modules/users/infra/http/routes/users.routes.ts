import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '@config/upload';
import { container } from 'tsyringe'

import CreateUserService from '@modules/users/services/CreateUserService';
import ensureAuthenticated from '@modules/users/infra/http/midleware/ensureAuthenticated';
import UpdateUserAvatar from '@modules/users/services/UpdateUserAvatarService';


const userRouter = Router();
const upload = multer(uploadConfig);


userRouter.post('/', async (req, res) => {
  const { name, email, password } = req.body;
  const createUser = container.resolve(CreateUserService);
  const user = await createUser.execute({ name, email, password });
  delete user.password;

  return res.json(user);
});

userRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  async (req, res) => {

    const user_id = req.user.id;
    const avatarFilename = req.file.filename;
    const updateUserAvatar = container.resolve(UpdateUserAvatar);
    const user = await updateUserAvatar.execute({
      user_id,
      avatarFilename,
    });

    delete user.password;

    return res.json(user);
  },
);

export default userRouter;
