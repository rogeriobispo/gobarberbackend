import IParseMailTemplateDTO from '../dto/IParseMailTemplateDTO'

interface IMailTemplateProvider {
  parse(data: IParseMailTemplateDTO): Promise<string>
}


export default IMailTemplateProvider
