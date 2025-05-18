import { Module } from '@nestjs/common';
import { EventTeamPlayersService } from './event-team-players.service';
import { EventTeamPlayersController } from './event-team-players.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Event, EventTeamPlayer, Player, Team } from 'database/models';

@Module({
  imports: [SequelizeModule.forFeature([Event, Team, Player, EventTeamPlayer])],
  controllers: [EventTeamPlayersController],
  providers: [EventTeamPlayersService],
})
export class EventTeamPlayersModule {}
