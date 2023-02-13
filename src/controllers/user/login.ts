import { Request, Response } from 'express';
import { authApiUrl, cleanEmail, controllerErrorWithMessage, isValidEmail, isValidPassword } from '@utils/index';
import { AccessType } from '@custom-types/index';
import { User } from '@db/models';
import axios from 'axios';

export const loginController = () => {
  return async (req: Request, res: Response) => {
    const { email: rawEmail, password } = req.body as AccessType;
    const email = cleanEmail(rawEmail);

    if (!isValidEmail(email)) {
      return res.status(400).json({ message: 'Invalid email.' });
    }
    const user = await User.findOne({
      where: {
        email
      }
    });
    if (!user) {
      return res.status(401).json({ message: 'Email does not exist.' });
    }

    if (!isValidPassword(password)) {
      return res.status(401).json({ message: 'Invalid password.' });
    }

    let response;
    try {
      response = await axios.post(`${authApiUrl}/update-token`, {
        password,
        email
      });
      const data = response.data as { token: string };
      const token = data.token;
      return res.json({ token });
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const response = err.response;
        if (response && response.status !== 200) {
          const data = response.data as { message: string | undefined };
          const message = data.message ?? 'Internal server error.';
          return res.status(400).json({ message });
        }
      }
      return controllerErrorWithMessage(res, err, 'Login failed.');
    }
  };
};
