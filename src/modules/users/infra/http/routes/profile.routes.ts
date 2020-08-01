import { Router } from 'express';
import profileController from '../controllers/ProfileController'


const ProfileRouter = Router();

ProfileRouter.put('/', profileController.update);
ProfileRouter.get('/', profileController.show);


export default ProfileRouter;
