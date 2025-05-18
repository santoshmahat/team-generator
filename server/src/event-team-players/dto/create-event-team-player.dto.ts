import { IsInt, IsNotEmpty } from 'class-validator';

export class CreateEventTeamPlayerDto {
  @IsInt()
  @IsNotEmpty()
  eventId: number;
}
