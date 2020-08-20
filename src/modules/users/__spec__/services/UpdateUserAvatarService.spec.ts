import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../fakes/FakeUsersRepository';
import FakeStorageProvider from '../fakes/FakeStorageProvider';
import UpdateUserAvatar from '../../services/UpdateUserAvatarService';

let fakeUsersRepository: FakeUsersRepository;
let fakeStorageProvider: FakeStorageProvider;
let updateUserAvatar: UpdateUserAvatar;

describe('UpdateUserAvatar', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeStorageProvider = new FakeStorageProvider();
    updateUserAvatar = new UpdateUserAvatar(
      fakeUsersRepository,
      fakeStorageProvider,
    );
  });
  describe('#execute', () => {
    it('should be able to update an user avatar', async () => {
      const user = await fakeUsersRepository.create({
        name: 'John Doe',
        email: 'johndoe@gmail.com',
        password: '1234',
      });

      await updateUserAvatar.execute({
        user_id: user.id,
        avatarFilename: 'newimagefile',
      });

      expect(user.avatar).toBe('newimagefile');
    });

    it('should not be able to update an user avatar when user does not exists', async () => {
      await expect(
        updateUserAvatar.execute({
          user_id: 'does-not-exist',
          avatarFilename: 'newimagefile',
        }),
      ).rejects.toBeInstanceOf(AppError);
    });

    it('should delete old avatar when updating with a new one', async () => {
      const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile');
      const user = await fakeUsersRepository.create({
        name: 'John Doe',
        email: 'johndoe@gmail.com',
        password: '1234',
      });

      await updateUserAvatar.execute({
        user_id: user.id,
        avatarFilename: 'oldimagefile',
      });

      await updateUserAvatar.execute({
        user_id: user.id,
        avatarFilename: 'newimagefile',
      });

      expect(deleteFile).toHaveBeenCalledWith('oldimagefile');
      expect(user.avatar).toBe('newimagefile');
    });
  });
});
