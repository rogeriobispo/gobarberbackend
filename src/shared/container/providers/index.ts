import { container } from 'tsyringe'
import mailConfig from '@config/mail'

import IStorageProvider from './StorageProviders/model/IStorageProvider'
import DiskStorage from './StorageProviders/implementations/DiskStorageProvider'

import IMailProvider from './MailProvider/models/IMailProvider'
import EtherealMailProvider from './MailProvider/implementation/EtherealMailProvider'
import SESMailProvider from './MailProvider/implementation/SESMailProvider'

import IMailTemplateProvider from './MailTemplateProvider/models/IMailTemplateProvider'
import HandlebarsMailTemplateProvider from './MailTemplateProvider/implementation/HandlebarsMailTemplateProvider'

container.registerSingleton<IStorageProvider>('StorageProvider', DiskStorage)

container.registerSingleton<IMailTemplateProvider>('MailTemplateProvider', HandlebarsMailTemplateProvider)

container.registerInstance<IMailProvider>('MailProvider',
  mailConfig.driver === 'ethereal'
  ? container.resolve(EtherealMailProvider)
  : container.resolve(SESMailProvider)
  )
