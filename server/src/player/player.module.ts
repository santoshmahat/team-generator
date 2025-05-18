import { Module } from '@nestjs/common';
import { PlayerService } from './player.service';
import { PlayerController } from './player.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Player } from 'database/models';

@Module({
  imports: [SequelizeModule.forFeature([Player])],
  controllers: [PlayerController],
  providers: [PlayerService],
})
export class PlayerModule {}
