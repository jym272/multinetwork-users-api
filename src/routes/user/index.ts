import { Router } from 'express';
import { userController } from '@controllers/user';

export const user = Router();

user.post('/login', userController.login);
user.post('/signup', userController.signup);
