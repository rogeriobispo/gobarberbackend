import FakeUsersRepository from '../fakes/FakeUsersRepository'
import FakeStorageProvider from '../fakes/FakeStorageProvider'
import UpdateUserAvatar from '../../services/UpdateUserAvatarService'
import AppError from '@shared/errors/AppError'



describe('UpdateUserAvatar', () => {
  describe('#execute', () => {
    it('should be able to update an user avatar', async () => {
      const fakeUsersRepository = new FakeUsersRepository()
      const fakeStorageProvider = new FakeStorageProvider()

      const updateUserAvatar = new UpdateUserAvatar(
        fakeUsersRepository,
        fakeStorageProvider
      )

      const user = await fakeUsersRepository.create({
        name: 'John Doe',
        email: 'johndoe@gmail.com',
        password: '1234'
      })

      await updateUserAvatar.execute({
        user_id: user.id,
        avatarFilename: 'newimagefile'
      })

      expect(user.avatar).toBe('newimagefile')

    })

    it('should not be able to update an user avatar when user does not exists', async () => {
      const fakeUsersRepository = new FakeUsersRepository()
      const fakeStorageProvider = new FakeStorageProvider()

      const updateUserAvatar = new UpdateUserAvatar(
        fakeUsersRepository,
        fakeStorageProvider
      )

      await expect(updateUserAvatar.execute({
        user_id: 'does-not-exist',
        avatarFilename: 'newimagefile'
      })).rejects.toBeInstanceOf(AppError)

    })

    it('should delete old avatar when updating with a new one', async () => {
      const fakeUsersRepository = new FakeUsersRepository()
      const fakeStorageProvider = new FakeStorageProvider()

      const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile')

      const updateUserAvatar = new UpdateUserAvatar(
        fakeUsersRepository,
        fakeStorageProvider
      )

      const user = await fakeUsersRepository.create({
        name: 'John Doe',
        email: 'johndoe@gmail.com',
        password: '1234'
      })

      await updateUserAvatar.execute({
        user_id: user.id,
        avatarFilename: 'oldimagefile'
      })

      await updateUserAvatar.execute({
        user_id: user.id,
        avatarFilename: 'newimagefile'
      })

      expect(deleteFile).toHaveBeenCalledWith('oldimagefile')
      expect(user.avatar).toBe('newimagefile')

    })

  })
})
