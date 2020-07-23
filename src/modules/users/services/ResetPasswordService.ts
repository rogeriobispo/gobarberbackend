import { differenceInHours } from 'date-fns'
import { injectable, inject } from 'tsyringe'


import IUserRepository from '../repositories/IUserRepository'
import IUserTokenRepository from '../repositories/IUserTokensRepository'
import IHashProvider from '../providers/HashProvider/models/IHashProvider'
import AppError from '@shared/errors/AppError'

interface IRequest {
  token: string;
  password: string;
}

@injectable()
class ResetPasswordService {
  constructor(
    @inject('UserRepository')
    private UserRepository: IUserRepository,

    @inject('UserTokensRepository')
    private userTokenRepository: IUserTokenRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider
  ){}

  public async execute({token, password}: IRequest): Promise<void> {
    const userToken =  await this.userTokenRepository.findByToken(token)
    if(!userToken) throw new AppError('User token invalid')

    const user = await this.UserRepository.findById(userToken.user_id)
    if(!user) throw new AppError('User does not exists')

    const tokenCreatedAt = userToken.created_at

    if(differenceInHours(Date.now(), tokenCreatedAt) > 2) throw new AppError('Token is expired')

    user.password = await this.hashProvider.generateHash(password)

    this.UserRepository.update(user)
  }
}

export default ResetPasswordService
