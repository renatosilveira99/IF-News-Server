import { Router } from 'express';

import { CreateUserController } from '../controllers/CreateUserController';
import { FindAllUsersController } from '../controllers/FindAllUsersController';
import { FindUserByIdController } from '../controllers/FindUserByIdController';
import { FindUserByEmailController } from '../controllers/FindUserByEmailController';
import { UpdateUserController } from '../controllers/UpdateUserController';
import { AuthenticateUserController } from '../controllers/AuthenticateUserController';

const usersRoutes = Router();

const createUserController = new CreateUserController();
const findAllUsersController = new FindAllUsersController();
const findUserByIdController = new FindUserByIdController();
const findUserByEmailController = new FindUserByEmailController();
const updateUserController = new UpdateUserController();
const authenticateUserController = new AuthenticateUserController();

usersRoutes.post('/create', createUserController.handle);
usersRoutes.get('/findAll', findAllUsersController.handle);
usersRoutes.get('/findById/:id', findUserByIdController.handle);
usersRoutes.get('/findByEmail/:email', findUserByEmailController.handle);
usersRoutes.put('/update', updateUserController.handle);
usersRoutes.post('/authenticate', authenticateUserController.handle);

export { usersRoutes };
