import { DataTypes, Sequelize } from 'sequelize';
import { Person } from '@db/models';

export const init = (sequelize: Sequelize) => {
  Person.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        field: 'id'
      },
      name: {
        type: DataTypes.STRING(64),
        allowNull: false,
        unique: true,
        field: 'name'
      },
      age: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'age'
      }
    },
    {
      sequelize,
      tableName: 'person'
    }
  );
};

export default Person;
