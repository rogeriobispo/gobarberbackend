import { container } from 'tsyringe'

import IStorageProvider from './StorageProviders/model/IStorageProvider'
import DiskStorage from './StorageProviders/implementations/DiskStorageProvider'

import IMailProvider from './MailProvider/models/IMailProvider'
import therealMailProvider from './MailProvider/implementation/EtherealMailProvider'

container.registerSingleton<IStorageProvider>('StorageProvider', DiskStorage)
container.registerInstance<IMailProvider>('MailProvider', new therealMailProvider())
