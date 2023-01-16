import { Model } from 'sequelize';

export class Person extends Model {
  public id!: number;
  public name!: string;
  public age!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}
