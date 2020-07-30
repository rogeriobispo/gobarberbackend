import "reflect-metadata"
import AuthenticateUserService from '../../services/AuthenticateUserService'
import FakeHashProvider from '../fakes/FakeHashProvider'
import CreateUserService from '../../services/CreateUserService'
import FakeUsersRepository from '../fakes/FakeUsersRepository'
import AppError from '@shared/errors/AppError'

let fakeUsersRepository: FakeUsersRepository
let fakeHashProvider: FakeHashProvider
let authenticateUser: AuthenticateUserService
let createUser: CreateUserService


describe('AuthenticateUserService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository()
    fakeHashProvider = new FakeHashProvider()
    authenticateUser = new AuthenticateUserService(fakeUsersRepository, fakeHashProvider)
    createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider)

  })
  describe('#execute', () => {
    it('should be able to authenticate', async () => {

      const user = await createUser.execute({
        name: 'rogerio',
        email: 'rbispo@rbispo.com',
        password: '123456'
      })
      const auth = await authenticateUser.execute({
        email: 'rbispo@rbispo.com',
        password: '123456'
      })
      expect(auth).toHaveProperty('token')
      expect(auth.user).toBe(user)

    })

    it('should not be able to authenticate when user does not exists', ()=> {

      expect(authenticateUser.execute({
        email: 'rbispo@rbispo.com',
        password: '123456'
      })).rejects.toBeInstanceOf(AppError)
    })

    it('should not be able to autenticate with password is wrong', async () => {

      await createUser.execute({
        name: 'rogerio',
        email: 'rbispo@rbispo.com',
        password: '123456'
      })

      await expect(authenticateUser.execute({
        email: 'rbispo@rbispo.com',
        password: 'wrong'
      })).rejects.toBeInstanceOf(AppError)
    })
  })
})
