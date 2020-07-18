import { Router } from 'express';
import multer from 'multer';
import UsersController from '../controllers/UsersController'
import UserAvatarController from '../controllers/UserAvatarController'
import uploadConfig from '@config/upload';

import ensureAuthenticated from '@modules/users/infra/http/midleware/ensureAuthenticated';

const userRouter = Router();
const upload = multer(uploadConfig);


userRouter.post('/', UsersController.create);

userRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  UserAvatarController.update
);

export default userRouter;
