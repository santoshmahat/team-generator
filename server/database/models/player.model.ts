import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({ tableName: 'players', timestamps: true })
export class Player extends Model<Player> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  })
  declare id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name!: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      max: 5,
    },
  })
  skill!: number;
}
