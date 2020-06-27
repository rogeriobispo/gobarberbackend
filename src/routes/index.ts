import { Router } from 'express';

import appointmnetsRouter from './appointments.routes';
import userRouter from './users.routes';
import sessionsRouter from './sessions.routes';
import EnsureAuthenticated from '../midleware/ensureAuthenticated';

const routes = Router();

routes.use('/sessions', sessionsRouter);
routes.use('/users', userRouter);

routes.use(EnsureAuthenticated);
routes.use('/appointments', appointmnetsRouter);

export default routes;
