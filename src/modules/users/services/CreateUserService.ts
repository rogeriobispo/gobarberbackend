import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import User from '../infra/typeorm/entities/User';
import IUserRepository from '../repositories/IUserRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

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
    private HashProvider: IHashProvider,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({ name, email, password }: Request): Promise<User> {
    const checkUserExists = await this.usersRepository.findByEmail(email);

    if (checkUserExists) throw new AppError('Email address already used', 422);

    const hashadPassword = await this.HashProvider.generateHash(password);
    const user = await this.usersRepository.create({
      name,
      email,
      password: hashadPassword,
    });

    await this.cacheProvider.invalidatePrefix('providers-list');
    return user;
  }
}

export default CreateUserService;
