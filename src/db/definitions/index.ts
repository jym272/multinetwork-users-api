import { Sequelize } from 'sequelize';

import * as person from '@db/definitions/Person';

const appLabels = [person];

export const initDefinitions = (sequelize: Sequelize) => {
  for (const label of appLabels) {
    label.init(sequelize);
  }
};
