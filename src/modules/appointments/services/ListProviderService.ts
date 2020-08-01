import IUserRepository from '@modules/users/repositories/IUserRepository'
import { injectable, inject } from 'tsyringe'

import User from '@modules/users/infra/typeorm/entities/User';
import AppError from '@shared/errors/AppError';

interface IRequest {
  user_id: string
}

@injectable()
class ShowProfileService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUserRepository,

    ){}

  public async execute({ user_id }: IRequest): Promise<User[]> {
    const user = await this.usersRepository.findAllProviders({
      except_user_id: user_id
    });

    return user
  }
}

export default ShowProfileService;
