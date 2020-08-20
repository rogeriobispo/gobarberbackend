import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import multer from 'multer';
import uploadConfig from '@config/upload';
import ensureAuthenticated from '@modules/users/infra/http/midleware/ensureAuthenticated';
import UsersController from '../controllers/UsersController';
import UserAvatarController from '../controllers/UserAvatarController';

const userRouter = Router();
const upload = multer(uploadConfig.multer);

userRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  UsersController.create,
);

userRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  UserAvatarController.update,
);

export default userRouter;
