import { injectable, inject } from 'tsyringe'

import AppError from '@shared/errors/AppError'
import IUserRepository from '../repositories/IUserRepository'
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider'

// import User from '../infra/typeorm/entities/User'

@injectable()
class SendForgotPasswordEmailService {
  constructor(
    @inject('UserRepository')
    private UserRepository: IUserRepository,

    private mailProvider: IMailProvider,
  ){}

  public async execute(email: string): Promise<void> {
    const user = await this.UserRepository.findByEmail(email)
    console.log(!user)
    // if(!user) throw new AppError('User does not exists')


    this.mailProvider.sendMail(email, 'Pedido de recuperação de senha recebido')

  }
}

export default SendForgotPasswordEmailService
