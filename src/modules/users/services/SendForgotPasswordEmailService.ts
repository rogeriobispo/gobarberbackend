import { injectable, inject } from 'tsyringe'

import AppError from '@shared/errors/AppError'
import IUserRepository from '../repositories/IUserRepository'
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider'
import IUserTokenRepository from '../repositories/IUserTokensRepository'


@injectable()
class SendForgotPasswordEmailService {
  constructor(
    @inject('UsersRepository')
    private UserRepository: IUserRepository,

    @inject('MailProvider')
    private mailProvider: IMailProvider,

    @inject('UserTokensRepository')
    private userTokenRepository: IUserTokenRepository
  ){}

  public async execute(email: string): Promise<void> {
    const user = await this.UserRepository.findByEmail(email)

    if(!user) throw new AppError('User does not exists')

    const { token } = await this.userTokenRepository.generate(user.id)

    this.mailProvider.sendMail(email, `Pedido de recuperação de senha recebido ${token}`)
  }
}

export default SendForgotPasswordEmailService
