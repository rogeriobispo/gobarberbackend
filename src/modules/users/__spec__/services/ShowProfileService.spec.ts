import FakeUsersRepository from '../fakes/FakeUsersRepository'
import ShowProfileService from '../../services/ShowProfileService'
import AppError from '@shared/errors/AppError'

let fakeUsersRepository: FakeUsersRepository
let showProfileService: ShowProfileService

describe('ShowUserProfileService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository()
    showProfileService = new ShowProfileService(
      fakeUsersRepository,
    )
  })
  describe('#execute', () => {
    it('should be able to show an user', async () => {
      const user = await fakeUsersRepository.create({
        name: 'John Doe',
        email: 'johondoe@example.com',
        password: '123456'
      })

      const userReturned = await showProfileService.execute({
        user_id: user.id
      })

      expect(userReturned.name).toBe('John Doe')
      expect(userReturned.email).toBe('johondoe@example.com')
    })

    it('should throw an error if user does not exist', async () => {

      await expect(showProfileService.execute({
        user_id: 'userdoesnotexists'
      })).rejects.toBeInstanceOf(AppError)

    })
  })
})
