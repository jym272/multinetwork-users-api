import * as dotenv from 'dotenv';
import { Response } from 'express';
dotenv.config();

export const getEnvOrFail = (key: string): string => {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Missing environment variable: ${key}`);
  }
  return value;
};

export const successConnectionMsg = (msg: string) => {
  // eslint-disable-next-line no-console
  console.log('\x1b[32m%s\x1b[0m', msg);
};

export const controllerErrorWithMessage = (res: Response, err: any, message: string) => {
  // eslint-disable-next-line no-console
  console.log('ERROR: ', err);
  return res.status(401).json({ message });
};
