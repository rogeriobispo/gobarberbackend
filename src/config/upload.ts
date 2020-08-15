import path from 'path';
import crypto from 'crypto';
import multer, { StorageEngine } from 'multer';

const tmpFolder = path.resolve(__dirname, '..', '..', 'tmp');
const uploadFoader = path.resolve(__dirname, '..', '..', 'tmp', 'upload');

interface IUploadConfig {
  driver: 's3' | 'disk'
  tmpFolder: string
  uploadFolder: string
  config: {
    disk: {}
    aws: {
      bucket: string
    }
  }
  multer: {
    storage: StorageEngine
  }
}

export default {
  driver: process.env.STORAGE_DRIVER,
  tmpFolder,
  uploadFolder: String(uploadFoader),
  multer: {
    storage: multer.diskStorage({
      destination: tmpFolder,
      filename(_, file, callback) {
        const fileHash = crypto.randomBytes(10).toString('hex');
        const fileName = `${fileHash}-${file.originalname}`;
        return callback(null, fileName);
      },
    }),
  },
  config: {
    disk: {},
    aws: {
      bucket: 'go-barber-2'
    }
  }
} as IUploadConfig
