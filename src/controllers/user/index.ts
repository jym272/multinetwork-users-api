import { loginController } from '@controllers/user/login';
import { signupController } from '@controllers/user/signup';

export const userController = {
  login: loginController(),
  signup: signupController()
};
