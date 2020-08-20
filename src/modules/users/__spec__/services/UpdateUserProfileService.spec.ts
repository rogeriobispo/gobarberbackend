import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../fakes/FakeUsersRepository';
import FakeHashProvider from '../fakes/FakeHashProvider';
import UpdateUserProfile from '../../services/UpdateProfileService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let updateUserProfile: UpdateUserProfile;

describe('UpdateUserProfileService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    updateUserProfile = new UpdateUserProfile(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });
  describe('#execute', () => {
    it('should be able to update an user', async () => {
      const user = await fakeUsersRepository.create({
        name: 'John Doe',
        email: 'johondoe@example.com',
        password: '123456',
      });

      const updatedUser = await updateUserProfile.execute({
        user_id: user.id,
        name: 'john tre',
        email: 'johntre@example.com',
      });

      expect(updatedUser.name).toBe('john tre');
      expect(updatedUser.email).toBe('johntre@example.com');
    });

    it('should not be able to change to an existent email', async () => {
      const user = await fakeUsersRepository.create({
        name: 'John Doe',
        email: 'johondoe@example.com',
        password: '123456',
      });

      await fakeUsersRepository.create({
        name: 'John Doe',
        email: 'existentemail@example.com',
        password: '123456',
      });

      await expect(
        updateUserProfile.execute({
          user_id: user.id,
          name: 'john tre',
          email: 'existentemail@example.com',
        }),
      ).rejects.toBeInstanceOf(AppError);
    });

    it('should be able to update the password', async () => {
      const user = await fakeUsersRepository.create({
        name: 'John Doe',
        email: 'johondoe@example.com',
        password: '123456',
      });

      const updatedUser = await updateUserProfile.execute({
        user_id: user.id,
        name: 'john tre',
        email: 'johntre@example.com',
        password: '123123',
        old_password: '123456',
      });

      expect(updatedUser.password).toBe('123123');
    });

    it('should not be able to update the password without old password', async () => {
      const user = await fakeUsersRepository.create({
        name: 'John Doe',
        email: 'johondoe@example.com',
        password: '123456',
      });

      await expect(
        updateUserProfile.execute({
          user_id: user.id,
          name: 'john tre',
          email: 'johntre@example.com',
          password: '123123',
        }),
      ).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to update the password with wrong old password', async () => {
      const user = await fakeUsersRepository.create({
        name: 'John Doe',
        email: 'johondoe@example.com',
        password: '123456',
      });

      await expect(
        updateUserProfile.execute({
          user_id: user.id,
          name: 'john tre',
          email: 'johntre@example.com',
          old_password: 'wrong',
          password: '123123',
        }),
      ).rejects.toBeInstanceOf(AppError);
    });
  });
});
