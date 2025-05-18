import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';
import { EventTeamPlayer } from './event-team-player.model';

@Table({ tableName: 'events', timestamps: true })
export class Event extends Model<Event> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  declare id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  title: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  slug: string;

  @HasMany(() => EventTeamPlayer)
  eventTeamMembers: EventTeamPlayer[];
}
