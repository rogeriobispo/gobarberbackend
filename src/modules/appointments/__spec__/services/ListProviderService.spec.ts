import FakeUsersRepository from '@modules/users/__spec__/fakes/FakeUsersRepository'
import ListProfileService from '../../services/ListProviderService'
import AppError from '@shared/errors/AppError'

let fakeUsersRepository: FakeUsersRepository
let listProfileService: ListProfileService
describe('ShowUserProfileService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository()
    listProfileService = new ListProfileService(
      fakeUsersRepository,
    )
  })
  describe('#execute', () => {
    it('should be able to list the providers', async () => {
      const user1 = await fakeUsersRepository.create({
        name: 'John Doe',
        email: 'johondoe@example.com',
        password: '123456'
      })

      const user2 = await fakeUsersRepository.create({
        name: 'John tre',
        email: 'johontre@example.com',
        password: '123456'
      })

      const loggedUser = await fakeUsersRepository.create({
        name: 'John tre',
        email: 'johontre@example.com',
        password: '123456'
      })

      const user3 = await fakeUsersRepository.create({
        name: 'John qua',
        email: 'johonqua@example.com',
        password: '123456'
      })

      const providers = await listProfileService.execute({
        user_id: loggedUser.id
      })

      expect(providers).toEqual([
        user1,
        user2,
        user3
      ])
    })
  })
})
