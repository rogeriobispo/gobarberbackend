import FakeAppointmentRepository from '../fakes/FakeAppointmentsRepository'
import CreateAppointService from '../../services/CreateAppointmentService'



describe('CreateAppointment', () => {
  describe('#execute', () => {
    it('should be able to create a new appointment',async () => {
      const fakeAppointmentRepository = new FakeAppointmentRepository()
      const createAppointment = new CreateAppointService(fakeAppointmentRepository)
      const appointment = await createAppointment.execute({
        schedule_date: new Date(),
        provider_id: '1232kljfdka'
      })

      expect(appointment).toHaveProperty('id')
      expect(appointment.provider_id).toBe('1232kljfdka')
    })

    // it('should not be able to create two appointment on same time', () => {
    //   expect(1 + 2).toBe(3)
    // })
  })
})
