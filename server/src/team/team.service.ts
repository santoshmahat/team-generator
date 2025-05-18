import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { Team } from 'database/models';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class TeamService {
  private readonly logger = new Logger(TeamService.name);

  constructor(@InjectModel(Team) private readonly teamModel: typeof Team) {}

  async create(createTeamDto: CreateTeamDto): Promise<Team> {
    try {
      return await this.teamModel.create(createTeamDto as Team);
    } catch (error) {
      const e = error as Error;
      this.logger.error(e?.message, e?.stack);
      throw e;
    }
  }

  async findAll(): Promise<Team[]> {
    return await this.teamModel.findAll();
  }

  async findOne(id: number): Promise<Team> {
    try {
      const team = await this.teamModel.findByPk(id);

      if (!team) {
        throw new NotFoundException(`Team with ${id} not found`);
      }

      return team;
    } catch (error) {
      const e = error as Error;
      this.logger.error(e?.message, e?.stack);
      throw e;
    }
  }

  async update(id: number, updateTeamDto: UpdateTeamDto): Promise<Team> {
    try {
      const [affected_rows] = await this.teamModel.update(updateTeamDto, {
        where: { id },
      });

      if (affected_rows === 0) {
        throw new NotFoundException(`Team with id ${id} not found`);
      }

      return this.findOne(id);
    } catch (error) {
      const e = error as Error;
      this.logger.error(e?.message, e?.stack);
      throw e;
    }
  }

  async remove(id: number): Promise<void> {
    const team = await this.findOne(id);
    return await team.destroy();
  }
}
