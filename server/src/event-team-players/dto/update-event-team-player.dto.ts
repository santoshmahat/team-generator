import { PartialType } from '@nestjs/mapped-types';
import { CreateEventTeamPlayerDto } from './create-event-team-player.dto';

export class UpdateEventTeamPlayerDto extends PartialType(CreateEventTeamPlayerDto) {}
