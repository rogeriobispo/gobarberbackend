import { container } from 'tsyringe'

import IStorageProvider from './StorageProviders/model/IStorageProvider'
import DiskStorage from './StorageProviders/implementations/DiskStorageProvider'

container.registerSingleton<IStorageProvider>('StorageProvider', DiskStorage)
