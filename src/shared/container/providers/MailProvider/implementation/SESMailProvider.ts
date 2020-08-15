import nodeMailer, { Transporter } from 'nodemailer'
import {injectable, inject} from 'tsyringe'
import mailConfig from '@config/mail'
import aws from 'aws-sdk'
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider'
import ISendMailDTO from '@shared/container/providers/MailProvider/dtos/ISendMailDTO'
import IMailTemplateProvider from '@shared/container/providers/MailTemplateProvider/models/IMailTemplateProvider'

@injectable()
class SESMailProvider implements IMailProvider {
  private client: Transporter

   constructor(
    @inject('MailTemplateProvider')
     private mailTemplateProvider: IMailTemplateProvider
   ){
    this.client = nodeMailer.createTransport({
      SES: new aws.SES({
        apiVersion: '2010-12-01'
      })
    })
  }

  public async sendMail({ to,  subject, from, templateData} :ISendMailDTO): Promise<void> {
    const { name, email } = mailConfig.defaults.from
    await this.client.sendMail({
      from: {
        name: from?.name || name,
        address: from?.email || email
      },
      to: {
        name: to.name,
        address: to.email
      },
      subject,
      html: await this.mailTemplateProvider.parse(templateData)
    })
  }

}

export default SESMailProvider
