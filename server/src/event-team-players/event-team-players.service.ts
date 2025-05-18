import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateEventTeamPlayerDto } from './dto/create-event-team-player.dto';
import { Event, EventTeamPlayer, Player, Team } from 'database/models';
import { InjectModel } from '@nestjs/sequelize';
import { EventTeamPlayerResponse, TeamPlayersMapping } from './types';

@Injectable()
export class EventTeamPlayersService {
  private readonly logger = new Logger(EventTeamPlayersService.name);

  constructor(
    @InjectModel(EventTeamPlayer)
    private readonly eventTeamPlayerModel: typeof EventTeamPlayer,
    @InjectModel(Team)
    private readonly teamModel: typeof Team,
    @InjectModel(Player)
    private readonly playerModel: typeof Player,
    @InjectModel(Event)
    private readonly eventModel: typeof Event,
  ) {}

  async create(createEventTeamPlayerDto: CreateEventTeamPlayerDto) {
    try {
      const { eventId } = createEventTeamPlayerDto;

      const existingEvent = await this.eventModel.findOne({
        where: { id: eventId },
        include: ['eventTeamMembers'],
      });

      if (!existingEvent) {
        const errorMessage = `Event with ${eventId} not found`;
        this.logger.error(errorMessage);
        throw new NotFoundException(errorMessage);
      }

      let result: EventTeamPlayerResponse | [] = [];

      // if there is already existing teams for a event
      if (existingEvent.get('eventTeamMembers').length > 0) {
        result = await this.fetchExistingEventTeamMembers(
          existingEvent.get('slug'),
        );
      } else {
        console.log('create', existingEvent.get('eventTeamMembers').length);
        result = await this.createEventTeamPlayers(existingEvent);
      }

      return result;
    } catch (error) {
      const e = error as Error;
      this.logger.error(e?.message, e?.stack);
      throw e;
    }
  }

  async fetchExistingEventTeamMembers(slug: string) {
    try {
      const existingEventTeamMembers = await this.eventModel.findOne({
        where: { slug },
        include: [
          {
            model: EventTeamPlayer,
            include: ['team', 'player'],
          },
        ],
      });

      if (!existingEventTeamMembers) {
        throw new NotFoundException(`Team member not found with that ${slug}`);
      }

      const groupedByTeam: Record<string, { team: string; players: any[] }> =
        {};

      for (const entry of existingEventTeamMembers.get('eventTeamMembers')) {
        const teamName = entry.get('team').get('name');

        if (!groupedByTeam[teamName]) {
          groupedByTeam[teamName] = {
            team: teamName,
            players: [],
          };
        }

        groupedByTeam[teamName].players.push({
          id: entry.get('player').get('id'),
          name: entry.get('player').get('name'),
          skill: entry.get('player').get('skill'),
        });
      }

      return {
        title: existingEventTeamMembers.get('title'),
        slug: existingEventTeamMembers.get('slug'),
        teams: Object.values(groupedByTeam),
        url: `https://yourapp.com/generated/${existingEventTeamMembers.get('slug')}`,
      };
    } catch (error) {
      const e = error as Error;
      this.logger.error(e?.message, e?.stack);
      throw e;
    }
  }

  async createEventTeamPlayers(event: Event) {
    try {
      const teams = await this.teamModel.findAll();
      const players = await this.playerModel.findAll({
        order: [['skill', 'DESC']],
      });

      const teamPlayersMapping: TeamPlayersMapping[] = teams.map((team) => ({
        team,
        players: [],
        totalSkill: 0,
      }));

      for (const player of players) {
        const targetTeam = teamPlayersMapping.sort(
          (a, b) => a.totalSkill - b.totalSkill,
        )[0];

        targetTeam.players.push(player);
        targetTeam.totalSkill += player.get('skill');
      }

      const eventTeamPlayers: EventTeamPlayer[] = [];

      for (const bucket of teamPlayersMapping) {
        for (const player of bucket.players) {
          eventTeamPlayers.push({
            eventId: event.id,
            teamId: bucket.team.id,
            playerId: player.id,
          } as EventTeamPlayer);
        }
      }

      await this.eventTeamPlayerModel.bulkCreate(eventTeamPlayers);

      return {
        title: event.get('title'),
        slug: event.get('slug'),
        teams: teamPlayersMapping.map((t: TeamPlayersMapping) => ({
          team: t.team.get('name'),
          players: t.players.map((p) => ({
            id: p.get('id'),
            name: p.get('name'),
            skill: p.get('skill'),
          })),
        })),
        url: `${event.get('slug')}`,
      };
    } catch (error) {
      const e = error as Error;
      this.logger.error(e?.message, e?.stack);
      throw e;
    }
  }
}
