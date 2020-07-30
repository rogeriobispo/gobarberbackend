import { container } from 'tsyringe'

import IStorageProvider from './StorageProviders/model/IStorageProvider'
import DiskStorage from './StorageProviders/implementations/DiskStorageProvider'

import IMailProvider from './MailProvider/models/IMailProvider'
import EtherealMailProvider from './MailProvider/implementation/EtherealMailProvider'

import IMailTemplateProvider from './MailTemplateProvider/models/IMailTemplateProvider'
import HandlebarsMailTemplateProvider from './MailTemplateProvider/implementation/HandlebarsMailTemplateProvider'

container.registerSingleton<IStorageProvider>('StorageProvider', DiskStorage)

container.registerSingleton<IMailTemplateProvider>('MailTemplateProvider', HandlebarsMailTemplateProvider)

container.registerInstance<IMailProvider>('MailProvider', container.resolve(EtherealMailProvider))
