import { Request, Response } from 'express';
import { DecodedPermission, PersonType } from '@custom-types/index';
import jwt from 'jsonwebtoken';
import { controllerErrorWithMessage, getEnvOrFail } from '@utils/index';
import { Person } from '@db/models';
import { getSequelizeClient } from '@db/sequelize';

const sequelize = getSequelizeClient();

const secret = getEnvOrFail('JWT_SECRET');

// generate Token

// const permission = {
//   delete: true
// };
// const options = {
//   expiresIn: '1d'
// };
// // Generate the JWT
// const token = jwt.sign(permission, secret, options);
// console.log(token)

const getController = () => {
  return async (req: Request, res: Response) => {
    try {
      const result = await Person.findAll({
        attributes: ['name', 'age', 'id']
      });
      return res.json(result);
    } catch (err) {
      return controllerErrorWithMessage(res, err, 'Get person failed.');
    }
  };
};

const saveController = () => {
  return async (req: Request, res: Response) => {
    const { name, age } = req.body as PersonType;
    try {
      const result = await sequelize.transaction(async () => {
        return await Person.create({
          name,
          age
        });
      });
      return res.json(result);
    } catch (error) {
      return controllerErrorWithMessage(res, error, 'Save person failed.');
    }
  };
};

const deleteController = () => {
  return async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const result = await sequelize.transaction(async () => {
        return await Person.destroy({
          where: {
            id: Number(id)
          }
        });
      });
      if (!result) return res.status(404).json({ message: 'Person not found.' });
      return res.json({ message: `Person with id ${id} deleted.` });
    } catch (err) {
      return controllerErrorWithMessage(res, err, 'Delete person failed.');
    }
  };
};

const deletePersonTableController = () => {
  return async (req: Request, res: Response) => {
    const rawToken = req.headers.authorization;
    if (!rawToken) {
      return controllerErrorWithMessage(res, 'Token not provided.', 'Unauthorized.');
    }
    let token = rawToken;
    if (rawToken.startsWith('Bearer ')) {
      token = token.slice(7, token.length);
    }
    let decoded;
    try {
      decoded = jwt.verify(token, secret);
    } catch (err) {
      return controllerErrorWithMessage(res, err, 'Unauthorized.');
    }
    const permissions = JSON.parse(JSON.stringify(decoded)) as DecodedPermission;
    if (permissions.exp < Math.floor(Date.now() / 1000) || !permissions.delete) {
      return controllerErrorWithMessage(res, 'Token expired.', 'Unauthorized.');
    }
    try {
      await sequelize.transaction(async () => {
        await Person.destroy({
          where: {},
          truncate: true
        });
      });
      return res.json({ message: 'Person table truncated.' });
    } catch (err) {
      return controllerErrorWithMessage(res, err, 'Delete person table failed.');
    }
  };
};

export const dbController = {
  get: getController(),
  save: saveController(),
  delete: deleteController(),
  deletePersonTable: deletePersonTableController()
};
