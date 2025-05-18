import {
  Table,
  Column,
  Model,
  ForeignKey,
  DataType,
  BelongsTo,
} from 'sequelize-typescript';
import { Event, Player, Team } from './';

@Table({ tableName: 'event_team_players', timestamps: false })
export class EventTeamPlayer extends Model<EventTeamPlayer> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  declare id: number;

  @ForeignKey(() => Event)
  @Column(DataType.INTEGER)
  eventId: number;

  @ForeignKey(() => Team)
  @Column(DataType.INTEGER)
  teamId: number;

  @ForeignKey(() => Player)
  @Column(DataType.INTEGER)
  playerId: number;

  @BelongsTo(() => Event)
  event: Event;

  @BelongsTo(() => Team)
  team: Team;

  @BelongsTo(() => Player)
  player: Player;
}
