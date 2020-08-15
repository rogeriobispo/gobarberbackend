import FakeUsersRepository from '../fakes/FakeUsersRepository'
import FakeHashProvider from '../fakes/FakeHashProvider'
import FakeCacheProvider from '../fakes/FakeCacheProvider'
import CreateUserService from '../../services/CreateUserService'
import AppError from '@shared/errors/AppError'

let fakeUsersRepository: FakeUsersRepository
let fakeHashProvider: FakeHashProvider
let fakeCacheProvider: FakeCacheProvider
let createUser: CreateUserService

describe('CreateUserService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository()
    fakeHashProvider = new FakeHashProvider()
    fakeCacheProvider = new FakeCacheProvider()

    createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider, fakeCacheProvider)


  })
  describe('#execute', () => {
    it('should be able to create a new appointment',async () => {
      const user = await createUser.execute({
        name: 'rogerio',
        email: 'r@rbispo.com',
        password: '123456'
      })

      expect(user).toHaveProperty('id')
      expect(user.name).toBe('rogerio')
      expect(user.email).toBe('r@rbispo.com')
    })

    it('should not be able to create a new user with same email', async () => {
      const user = await createUser.execute({
        name: 'rogerio',
        email: 'r@rbispo.com',
        password: '123456'
      })


      await expect( createUser.execute({
        name: 'rogerio',
        email: 'r@rbispo.com',
        password: '123456'
      })).rejects.toBeInstanceOf(AppError)
    })
  })
})
