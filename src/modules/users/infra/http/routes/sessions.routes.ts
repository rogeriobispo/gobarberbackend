import { Router } from 'express';
import { container } from 'tsyringe'

import AuthenticatUserService from '@modules/users/services/AuthenticateUserService';

const sessionsRouter = Router();


sessionsRouter.post('/', async (req, res) => {
  const { email, password } = req.body;

  const { user, token } = await container.resolve(AuthenticatUserService).execute({
    email,
    password,
  });
  delete user.password;

  return res.json({ user, token });
});

export default sessionsRouter;
