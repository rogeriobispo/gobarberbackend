import { sign } from 'jsonwebtoken';
import { compare } from 'bcryptjs';
import { injectable, inject } from 'tsyringe'
import AuthConfig from '@config/auth';
import AppError from '@shared/errors/AppError';
import User from '../infra/typeorm/entities/User';
import IUserRepository from '../repositories/IUserRepository'


interface Request {
  email: string;
  password: string;
}

interface Response {
  user: User;
  token: string;
}
@injectable()
class AuthenticatUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUserRepository
    ){}

  public async execute({ email, password }: Request): Promise<Response> {

    const user = await this.usersRepository.findByEmail(email)

    if (!user) throw new AppError('Incorrect email/password', 401);

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) throw new AppError('Incorrect email/password', 401);
    const { secret, expiresIn } = AuthConfig.jwt;
    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    });
    return {
      user,
      token,
    };
  }
}

export default AuthenticatUserService;
