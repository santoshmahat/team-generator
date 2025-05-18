import { Test, TestingModule } from '@nestjs/testing';
import { EventTeamPlayersService } from './event-team-players.service';

describe('EventTeamPlayersService', () => {
  let service: EventTeamPlayersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EventTeamPlayersService],
    }).compile();

    service = module.get<EventTeamPlayersService>(EventTeamPlayersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
