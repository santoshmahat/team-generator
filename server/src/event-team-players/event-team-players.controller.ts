import { Controller, Post, Body } from '@nestjs/common';
import { EventTeamPlayersService } from './event-team-players.service';
import { CreateEventTeamPlayerDto } from './dto/create-event-team-player.dto';
import { EventTeamPlayerResponse } from './types';

@Controller('event-team-players')
export class EventTeamPlayersController {
  constructor(
    private readonly eventTeamPlayersService: EventTeamPlayersService,
  ) {}

  @Post()
  create(
    @Body() createEventTeamPlayerDto: CreateEventTeamPlayerDto,
  ): Promise<EventTeamPlayerResponse> {
    return this.eventTeamPlayersService.create(createEventTeamPlayerDto);
  }
}
