import "reflect-metadata"
import AuthenticateUserService from '../../services/AuthenticateUserService'
import FakeHashProvider from '../fakes/FakeHashProvider'
import CreateUserService from '../../services/CreateUserService'
import FakeUsersRepository from '../fakes/FakeUsersRepository'
import AppError from '@shared/errors/AppError'


describe('AuthenticateUserService', () => {
  describe('#execute', () => {
    it('should be able to authenticate', async () => {
      const fakeUsersRepository = new FakeUsersRepository()
      const fakeHashProvider = new FakeHashProvider()

      const authenticateUser = new AuthenticateUserService(fakeUsersRepository, fakeHashProvider)
      const createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider)

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
      const fakeUsersRepository = new FakeUsersRepository()
      const fakeHashProvider = new FakeHashProvider()

      const authenticateUser = new AuthenticateUserService(fakeUsersRepository, fakeHashProvider)

      expect(authenticateUser.execute({
        email: 'rbispo@rbispo.com',
        password: '123456'
      })).rejects.toBeInstanceOf(AppError)
    })

    it('should not be able to autenticate with password is wrong', async () => {
      const fakeUsersRepository = new FakeUsersRepository()
      const fakeHashProvider = new FakeHashProvider()

      const authenticateUser = new AuthenticateUserService(fakeUsersRepository, fakeHashProvider)
      const createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider)

      await createUser.execute({
        name: 'rogerio',
        email: 'rbispo@rbispo.com',
        password: '123456'
      })

      expect(authenticateUser.execute({
        email: 'rbispo@rbispo.com',
        password: 'wrong'
      })).rejects.toBeInstanceOf(AppError)
    })
  })
})
