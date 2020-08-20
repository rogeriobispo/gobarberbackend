import { getRepository, Repository } from 'typeorm';
import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';
import UserToken from '../entities/UserToken';

class UsersRespository implements IUserTokensRepository {
  private ormRepository: Repository<UserToken>;

  constructor() {
    this.ormRepository = getRepository(UserToken);
  }

  public async generate(user_id: string): Promise<UserToken> {
    const userTokem = this.ormRepository.create({
      user_id,
    });

    await this.ormRepository.save(userTokem);

    return userTokem;
  }

  public async findByToken(token: string): Promise<UserToken | undefined> {
    const userTokem = await this.ormRepository.findOne({
      where: { token },
    });

    return userTokem;
  }
}

export default UsersRespository;
