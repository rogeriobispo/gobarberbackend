import IParseMailTemplateDTO from '@shared/container/providers/MailTemplateProvider/dto/IParseMailTemplateDTO'

interface IMailContact {
  name: string
  email: string
}

interface ISendMailDTO {
  to: IMailContact
  from?: IMailContact
  subject: string
  templateData: IParseMailTemplateDTO
}

export default ISendMailDTO
