import { uuid } from 'uuidv4'
import User from '@modules/users/infra/typeorm/entities/User';
import IUserRepository  from '@modules/users/repositories/IUserRepository'
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO'

class UsersRespository implements IUserRepository{
  private users: User[] = []
  async update(user: User): Promise<User> {
    const findIndex = this.users.findIndex(findUser => findUser.id === user.id)
    this.users[findIndex] = user

    return user;
  }
  async findById(id: string): Promise<User | undefined> {
    const user = this.users.find(user => user.id === id)
    return user
  }

  async findByEmail(email: string): Promise<User | undefined> {
    const user = this.users.find(user => user.email === email)
    return user
  }


  public async create({name, email, password}: ICreateUserDTO): Promise<User>{
    const user = new User()

    Object.assign(user, { id: uuid(), name, email, password })
    this.users.push(user)

    return user
  }

}

export default UsersRespository;
