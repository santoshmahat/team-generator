import { Test, TestingModule } from '@nestjs/testing';
import { EventTeamPlayersController } from './event-team-players.controller';
import { EventTeamPlayersService } from './event-team-players.service';

describe('EventTeamPlayersController', () => {
  let controller: EventTeamPlayersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EventTeamPlayersController],
      providers: [EventTeamPlayersService],
    }).compile();

    controller = module.get<EventTeamPlayersController>(EventTeamPlayersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
