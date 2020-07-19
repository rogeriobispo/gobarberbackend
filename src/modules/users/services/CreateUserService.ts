import { injectable, inject } from 'tsyringe'

import User from '../infra/typeorm/entities/User';
import AppError from '@shared/errors/AppError';
import IUserRepository from '../repositories/IUserRepository'
import IHashProvider from '../providers/HashProvider/models/IHashProvider'
interface Request {
  name: string;
  email: string;
  password: string;
}
@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUserRepository,
    @inject('HashProvider')
    private HashProvider: IHashProvider
    ){}

  public async execute({ name, email, password }: Request): Promise<User> {

    const checkUserExists = await this.usersRepository.findByEmail(email)

    if (checkUserExists) throw new AppError('Email address already used', 422);

    const hashadPassword = await this.HashProvider.generateHash(password)
    const user = await this.usersRepository.create({
      name,
      email,
      password: hashadPassword,
    });

    return user;
  }
}

export default CreateUserService;
