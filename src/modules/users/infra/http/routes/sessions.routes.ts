import { Router } from 'express';
import AuthenticatUserService from '@modules/users/services/AuthenticateUserService';

const sessionsRouter = Router();

sessionsRouter.post('/', async (req, res) => {
  const { email, password } = req.body;
  const { user, token } = await new AuthenticatUserService().execute({
    email,
    password,
  });
  delete user.password;

  return res.json({ user, token });
});

export default sessionsRouter;
