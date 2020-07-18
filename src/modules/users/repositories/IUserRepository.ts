import User from '../infra/typeorm/entities/User'
import ICreateUserDTO from '../dtos/ICreateUserDTO'

interface IUserRepository {
  create(data: ICreateUserDTO): Promise<User>
  update(user: User): Promise<User>
  findById(id: string): Promise<User | undefined>
  findByEmail(email: string): Promise<User | undefined>
}

export default IUserRepository
