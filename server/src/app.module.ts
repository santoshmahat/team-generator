import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as joi from 'joi';
import { Event, EventTeamPlayer, Player, Team } from 'database/models';
import { PlayerModule } from './player/player.module';
import { TeamModule } from './team/team.module';
import { EventModule } from './event/event.module';
import { EventTeamPlayersModule } from './event-team-players/event-team-players.module';

@Module({
  imports: [
    SequelizeModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        database: configService.get('DB_NAME'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        dialect: configService.get('DB_DIALECT'),
        host: configService.get('DB_HOST'),
        models: [Player, Team, Event, EventTeamPlayer],
      }),
      inject: [ConfigService],
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: joi.object({
        DB_NAME: joi.string().required(),
        DB_USERNAME: joi.string().required(),
        DB_PASSWORD: joi.string().required(),
        DB_DIALECT: joi.string().required(),
        DB_HOST: joi.string().required(),
        PORT: joi.string().required(),
      }),
    }),
    SequelizeModule.forFeature([Player, Team, Event, EventTeamPlayer]),
    PlayerModule,
    TeamModule,
    EventModule,
    EventTeamPlayersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
