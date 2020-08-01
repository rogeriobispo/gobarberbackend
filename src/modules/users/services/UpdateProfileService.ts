import IUserRepository from '../repositories/IUserRepository'
import IHashProvider from '../providers/HashProvider/models/IHashProvider'
import { injectable, inject } from 'tsyringe'

import User from '../infra/typeorm/entities/User';
import AppError from '@shared/errors/AppError';

interface Request {
  user_id: string;
  name: string;
  email: string;
  password?: string;
  old_password?: string;
}

@injectable()
class UpdateProfile {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUserRepository,
    @inject('HashProvider')
    private hashProvider: IHashProvider
    ){}

  public async execute({ name, email, user_id, password, old_password }: Request): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    if(!user) throw new AppError('User not found')

    const emailExistanteUser = await this.usersRepository.findByEmail(email)

    if(emailExistanteUser && emailExistanteUser.id !== user.id ) throw new AppError('Email already taken')

    user.name = name
    user.email = email

    if(password && !old_password) throw new AppError('Old password is missing')



    if(password && !old_password) throw new AppError('Old password is missing')

    if(password && old_password){
      const checkOldPassword = await this.hashProvider.compareHash(old_password, user.password)

      if(!checkOldPassword) throw new AppError('Old password does not match')

       user.password = await this.hashProvider.generateHash(password)
    }

    return this.usersRepository.update(user)
  }
}

export default UpdateProfile;
