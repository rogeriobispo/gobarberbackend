import AppError from '@shared/errors/AppError'
import FakeUsersRespoistory from '../fakes/FakeUsersRepository'
import FakeMailProvider from '../fakes/FakeMailProvider'
import SendForgotPasswordEmailService from '../../services/SendForgotPasswordEmailService'

describe('SendForgotPasswordEmail', () => {
  describe('#execute', () => {
    it('should be able to recover the password using the email', async () => {
        const fakeUsersRepository = new FakeUsersRespoistory()
        const fakeMailProvider = new FakeMailProvider()

        const sendEmail = jest.spyOn(fakeMailProvider, 'sendMail')

        const sendEmailForgoten = new SendForgotPasswordEmailService(
          fakeUsersRepository,
          fakeMailProvider
        )

        await fakeUsersRepository.create({
          name: 'John Doe',
          email: 'johndoe@johndoe.com',
          password: '123456'
        })

        sendEmailForgoten.execute('johndoe@johndoe.com')

        expect(sendEmail).toHaveBeenCalled()
      })

    // it('sould not be able to recover a non-existing user email', async () => {
    //   const fakeUsersRepository = new FakeUsersRespoistory()
    //     const fakeMailProvider = new FakeMailProvider()

    //     const sendEmailForgoten = new SendForgotPasswordEmailService(
    //       fakeUsersRepository,
    //       fakeMailProvider
    //     )

    //    await expect(sendEmailForgoten.execute('johndoe@johndoe.com')).rejects.toBeInstanceOf(AppError)
    // })
  })
})
