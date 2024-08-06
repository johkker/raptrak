import { Router } from 'express';
import { schemaValidator } from '../middlewares';
import { CreateUserSchema } from '../schemas';
import { createUserCTRL } from '../controllers';

const userRoutes = Router();

userRoutes.post('/register', schemaValidator(CreateUserSchema), createUserCTRL);

export default userRoutes;
