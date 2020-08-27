import { Router } from 'express';

import appointmentsRouter from '@modules/appointments/infra/http/routes/appointments.routes';
import providersRouter from '@modules/appointments/infra/http/routes/providers.routes';
import userRouter from '@modules/users/infra/http/routes/users.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import passwordRouter from '@modules/users/infra/http/routes/password.routes';
import profileRouter from '@modules/users/infra/http/routes/profile.routes';
import EnsureAuthenticated from '@modules/users/infra/http/midleware/ensureAuthenticated';

const routes = Router();

routes.use('/sessions', sessionsRouter);
routes.use('/users', userRouter);
routes.use('/password', passwordRouter);

routes.use('/appointments', EnsureAuthenticated, appointmentsRouter);
routes.use('/profile', EnsureAuthenticated, profileRouter);
routes.use('/providers', EnsureAuthenticated, providersRouter);

export default routes;
