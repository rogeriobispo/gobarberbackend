import FakeAppointmentRepository from '../fakes/FakeAppointmentsRepository'
import CreateAppointmentService from '../../services/CreateAppointmentService'
import AppError from '@shared/errors/AppError'



describe('CreateAppointment', () => {
  describe('#execute', () => {
    it('should be able to create a new user',async () => {
      const fakeAppointmentRepository = new FakeAppointmentRepository()
      const createAppointment = new CreateAppointmentService(fakeAppointmentRepository)
      const appointment = await createAppointment.execute({
        schedule_date: new Date(),
        provider_id: '1232kljfdka'
      })

      expect(appointment).toHaveProperty('id')
      expect(appointment.provider_id).toBe('1232kljfdka')
    })

    it('should not be able to create two appointment on same time', async () => {
      const fakeAppointmentRepository = new FakeAppointmentRepository()
      const createAppointment = new CreateAppointmentService(fakeAppointmentRepository)
      const appointmentDate = new Date(2020, 4, 10 , 11)
      const appointment = await createAppointment.execute({
        schedule_date: appointmentDate,
        provider_id: '1232kljfdka'
      })

      await expect(createAppointment.execute({
        schedule_date: appointmentDate,
        provider_id: '1232kljfdka'
      })).rejects.toBeInstanceOf(AppError)
    })
  })
})
