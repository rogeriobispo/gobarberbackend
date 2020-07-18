import { getRepository, Repository } from 'typeorm';
import User from '../entities/User';
import IUserRepository  from '@modules/users/repositories/IUserRepository'
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO'

class UsersRespository implements IUserRepository{
  private ormRepository: Repository<User>

  constructor(){
    this.ormRepository = getRepository(User)
  }

  async update(user: User): Promise<User> { //save
    return this.ormRepository.save(user);
  }
  async findById(id: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne(id)
    return user
  }

  async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      where: {
        email
      }
    })
    return user
  }


  public async create({name, email, password}: ICreateUserDTO): Promise<User>{
    const appointment = this.ormRepository.create({
      name,
      email,
      password
    })

    await this.ormRepository.save(appointment)
    return appointment
  }

}

export default UsersRespository;
