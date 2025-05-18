import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'teams', timestamps: true })
export class Team extends Model<Team> {
  @Column({
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataType.INTEGER,
  })
  declare id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;
}
