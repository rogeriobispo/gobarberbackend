import { Router } from 'express';

import appointmnetsRouter from '@modules/appointments/infra/http/routes/appointments.routes';
import providersRouter from '@modules/appointments/infra/http/routes/providers.routes';
import userRouter from '@modules/users/infra/http/routes/users.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import passwordRouter from '@modules/users/infra/http/routes/password.routes';
import profileRouter from '@modules/users/infra/http/routes/profile.routes'
import EnsureAuthenticated from '@modules/users/infra/http/midleware/ensureAuthenticated';

const routes = Router();

routes.use('/sessions', sessionsRouter);
routes.use('/users', userRouter);
routes.use('/password', passwordRouter)


routes.use(EnsureAuthenticated);
routes.use('/appointments', appointmnetsRouter);
routes.use('/profile', profileRouter);
routes.use('/providers', providersRouter);

export default routes;
