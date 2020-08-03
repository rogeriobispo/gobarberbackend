import FakeAppointmentsRepository from '../fakes/FakeAppointmentsRepository'
import ListProviderMonthAvailabilityService from '../../services/ListProviderMonthAvailabilityService'

let listProviderMonthAvailabilityService: ListProviderMonthAvailabilityService
let fakeAppointmentsRepository: FakeAppointmentsRepository
describe('ListProviderMonthAvailabityService', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository()
    listProviderMonthAvailabilityService = new ListProviderMonthAvailabilityService(
      fakeAppointmentsRepository
      )
  })
  describe('#execute', () => {
    it('should be able to list the month availabitlity from provider', async () => {
      await fakeAppointmentsRepository.create({
        provider_id: 'user',
        user_id: 'user',
        date: new Date(2020, 4, 20, 8, 0, 0)
      })

      await fakeAppointmentsRepository.create({
        provider_id: 'user',
        user_id: 'user',
        date: new Date(2020, 4, 20, 9, 0, 0)
      })

      await fakeAppointmentsRepository.create({
        provider_id: 'user',
        user_id: 'user',
        date: new Date(2020, 4, 20, 10, 0, 0)
      })

      await fakeAppointmentsRepository.create({
        provider_id: 'user',
        user_id: 'user',
        date: new Date(2020, 4, 20, 11, 0, 0)
      })

      await fakeAppointmentsRepository.create({
        provider_id: 'user',
        user_id: 'user',
        date: new Date(2020, 4, 20, 12, 0, 0)
      })

      await fakeAppointmentsRepository.create({
        provider_id: 'user',
        user_id: 'user',
        date: new Date(2020, 4, 20, 13, 0, 0)
      })

      await fakeAppointmentsRepository.create({
        provider_id: 'user',
        user_id: 'user',
        date: new Date(2020, 4, 20, 14, 0, 0)
      })

      await fakeAppointmentsRepository.create({
        provider_id: 'user',
        user_id: 'user',
        date: new Date(2020, 4, 20, 15, 0, 0)
      })

      await fakeAppointmentsRepository.create({
        provider_id: 'user',
        user_id: 'user',
        date: new Date(2020, 4, 20, 16, 0, 0)
      })

      await fakeAppointmentsRepository.create({
        provider_id: 'user',
        user_id: 'user',
        date: new Date(2020, 4, 20, 17, 0, 0)
      })

      await fakeAppointmentsRepository.create({
        provider_id: 'user',
        user_id: 'user',
        date: new Date(2020, 4, 20, 18, 0, 0)
      })

      await fakeAppointmentsRepository.create({
        provider_id: 'user',
        user_id: 'user',
        date: new Date(2020, 4, 21, 10, 0, 0)
      })

      const availabitlity = await listProviderMonthAvailabilityService.execute({
        provider_id: 'user',
        year: 2020,
        month: 5
      })

      expect(availabitlity).toEqual(expect.arrayContaining([
        {day: 20, available: false},
        {day: 21, available: true},
        {day: 22, available: true}
      ]))
    })
  })
})
