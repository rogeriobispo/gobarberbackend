import AppError from '@shared/errors/AppError';
import FakeUsersRespoistory from '../fakes/FakeUsersRepository';
import FakeMailProvider from '../fakes/FakeMailProvider';
import FakeUserTokenRepository from '../fakes/FakeUsersTokenRepository';
import SendForgotPasswordEmailService from '../../services/SendForgotPasswordEmailService';

let fakeUsersRepository: FakeUsersRespoistory;
let fakeMailProvider: FakeMailProvider;
let fakeUserTokenRepository: FakeUserTokenRepository;
let sendForgotPasswordEmail: SendForgotPasswordEmailService;

describe('SendForgotPasswordEmail', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRespoistory();
    fakeMailProvider = new FakeMailProvider();
    fakeUserTokenRepository = new FakeUserTokenRepository();

    sendForgotPasswordEmail = new SendForgotPasswordEmailService(
      fakeUsersRepository,
      fakeMailProvider,
      fakeUserTokenRepository,
    );
  });

  describe('#execute', () => {
    it('should be able torecover the password using the email', async () => {
      const sendEmail = jest.spyOn(fakeMailProvider, 'sendMail');

      await fakeUsersRepository.create({
        name: 'John Doe',
        email: 'johndoe@johndoe.com',
        password: '123456',
      });

      await sendForgotPasswordEmail.execute('johndoe@johndoe.com');

      expect(sendEmail).toHaveBeenCalled();
    });

    it('sould not be able to recover a non-existing user email', async () => {
      await expect(
        sendForgotPasswordEmail.execute('johndoe@johndoe.com'),
      ).rejects.toBeInstanceOf(AppError);
    });

    it('should generate a forgot password token', async () => {
      const generateToken = jest.spyOn(fakeUserTokenRepository, 'generate');
      const user = await fakeUsersRepository.create({
        name: 'John Doe',
        email: 'johndoe@johndoe.com',
        password: '123456',
      });

      await sendForgotPasswordEmail.execute('johndoe@johndoe.com');

      expect(generateToken).toHaveBeenCalledWith(user.id);
    });
  });
});
