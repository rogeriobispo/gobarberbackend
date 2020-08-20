import { Request, Response } from 'express';
import { container } from 'tsyringe';

import AuthenticatUserService from '@modules/users/services/AuthenticateUserService';
import { classToClass } from 'class-transformer';

class SessionsController {
  async create(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;

    const { user, token } = await container
      .resolve(AuthenticatUserService)
      .execute({
        email,
        password,
      });

    return res.json({ user: classToClass(user), token });
  }
}

export default new SessionsController();
