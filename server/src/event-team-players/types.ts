import { Team, Player } from 'database/models';

export type TeamPlayersMapping = {
  team: Team;
  players: Player[];
  totalSkill: number;
};

export type EventTeamPlayerResponse = {
  title: string;
  slug: string;
  teams: Array<{
    team: string;
    players: Partial<Player>[];
  }>;
  url: string;
};
