import AppError from '@shared/errors/AppError'
import FakeUsersRespoistory from '../fakes/FakeUsersRepository'
import FakeUserTokenRepository from '../fakes/FakeUsersTokenRepository'
import FakeHashProvider from '../fakes/FakeHashProvider'
import ResetPasswordService from '../../services/ResetPasswordService'
import { response } from 'express'

let fakeUsersRepository: FakeUsersRespoistory

let fakeUserTokenRepository: FakeUserTokenRepository
let resetPasswordService: ResetPasswordService
let fakeHashProvider: FakeHashProvider

describe('ResetPasswordService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRespoistory()
    fakeUserTokenRepository = new FakeUserTokenRepository()
    fakeHashProvider = new FakeHashProvider()

    resetPasswordService = new ResetPasswordService(
      fakeUsersRepository,
      fakeUserTokenRepository,
      fakeHashProvider
    )
  })

  describe('#execute', () => {
    it('should be able to reset the password', async () => {
        const user = await fakeUsersRepository.create({
          name: 'John Doe',
          email: 'johndoe@johndoe.com',
          password: '123456'
        })

        const { token } = await fakeUserTokenRepository.generate(user.id)
        const generateHash = jest.spyOn(fakeHashProvider, 'generateHash')

        await resetPasswordService.execute(
         {
           password: '123123',
           token
         })

        const updatedUser = await fakeUsersRepository.findById(user.id)
        expect(updatedUser?.password).toBe('123123')
        expect(generateHash).toBeCalledWith('123123')
    })

    it('sould not be able to reset when the token does not exists', async ()=> {
      await expect(resetPasswordService.execute({
        token: 'does-not-exists',
        password: '123456'
      })).rejects.toBeInstanceOf(AppError)
    })

    it('sould not be able to reset when the user does not exists', async ()=> {
      const { token } = await fakeUserTokenRepository.generate('user-does-not-exists')
      expect(resetPasswordService.execute({
        token: token,
        password: '123456'
      })).rejects.toBeInstanceOf(AppError)
    })

    it('should not be able to reset password if passed more than 2 hours', async () => {
      const user = await fakeUsersRepository.create({
        name: 'John Doe',
        email: 'johndoe@johndoe.com',
        password: '123456'
      })

      const { token } = await fakeUserTokenRepository.generate(user.id)
      const generateHash = jest.spyOn(fakeHashProvider, 'generateHash')

      jest.spyOn(Date, 'now').mockImplementationOnce(() => {
        const customDate = new Date();
        return customDate.setHours(customDate.getHours() + 3)
      })

      await expect(resetPasswordService.execute(
       {
         password: '123123',
         token
       })).rejects.toBeInstanceOf(AppError)

  })
  })
})
