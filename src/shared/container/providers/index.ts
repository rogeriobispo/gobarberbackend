import { container } from 'tsyringe'

import IStorageProvider from './StorageProviders/model/IStorageProvider'
import DiskStorage from './StorageProviders/implementations/DiskStorageProvider'

// import IMailProvider from './MailProvider/models/IMailProvider'
// import MailProvider from './MailProvider/implementation/'

container.registerSingleton<IStorageProvider>('StorageProvider', DiskStorage)
// container.registerSingleton<IMailProvider>('StorageProvider', DiskStorage)
