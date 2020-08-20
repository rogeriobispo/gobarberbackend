import FakeAppointmentsRepository from '../fakes/FakeAppointmentsRepository';
import ListProviderDayAvailabilityService from '../../services/ListProviderDayAvailabilityService';

let listProviderDayAvailabilityService: ListProviderDayAvailabilityService;
let fakeAppointmentsRepository: FakeAppointmentsRepository;
describe('ListProviderDayAvailabityService', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    listProviderDayAvailabilityService = new ListProviderDayAvailabilityService(
      fakeAppointmentsRepository,
    );
  });
  describe('#execute', () => {
    it('should be able to list the Day availabitlity from provider', async () => {
      await fakeAppointmentsRepository.create({
        provider_id: 'user',
        user_id: 'user',
        date: new Date(2020, 4, 20, 14, 0, 0),
      });

      await fakeAppointmentsRepository.create({
        provider_id: 'user',
        user_id: 'user',
        date: new Date(2020, 4, 20, 15, 0, 0),
      });

      jest.spyOn(Date, 'now').mockImplementationOnce(() => {
        return new Date(2020, 4, 20, 11).getTime();
      });

      const availabitlity = await listProviderDayAvailabilityService.execute({
        provider_id: 'user',
        year: 2020,
        month: 5,
        day: 20,
      });

      expect(availabitlity).toEqual(
        expect.arrayContaining([
          { hour: 8, available: false },
          { hour: 9, available: false },
          { hour: 10, available: false },
          { hour: 13, available: true },
          { hour: 14, available: false },
          { hour: 15, available: false },
          { hour: 16, available: true },
        ]),
      );
    });
  });
});
