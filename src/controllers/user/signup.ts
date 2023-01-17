import { Request, Response } from 'express';
import { cleanEmail, controllerErrorWithMessage, isValidEmail, isValidPassword } from '@utils/index';
import { getSequelizeClient } from '@db/sequelize';
import { AccessType } from '@custom-types/index';
import { User } from '@db/models';
import axios from 'axios';
const sequelize = getSequelizeClient();

export const signupController = () => {
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
    if (user) {
      return res.status(400).json({ message: 'Email already exists.' });
    }

    if (!isValidPassword(password)) {
      return res.status(400).json({ message: 'Invalid password.' });
    }

    let response;
    try {
      response = await axios.post('http://localhost:3051/hashed-password', {
        password,
        email
      });
      const data = response.data as { message: string | undefined };
      const messageInResponse = data.message ?? '';
      await sequelize.transaction(async () => {
        return await User.create({
          email
        });
      });
      return res.json({ message: `User created. ${messageInResponse}` });
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const response = err.response;
        if (response && response.status !== 200) {
          const data = response.data as { message: string | undefined };
          const message = data.message ?? 'Internal server error.';
          return res.status(400).json({ message });
        }
      }
      return controllerErrorWithMessage(res, err, 'Creating User failed.');
    }
  };
};
