import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';
import { Player } from 'database/models';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class PlayerService {
  private readonly logger = new Logger(PlayerService.name);

  constructor(
    @InjectModel(Player) private readonly playerModel: typeof Player,
  ) {}

  async create(createPlayerDto: CreatePlayerDto): Promise<Player> {
    try {
      return await this.playerModel.create(createPlayerDto as Player);
    } catch (error) {
      const e = error as Error;
      this.logger.error(e?.message, e?.stack);
      throw e;
    }
  }

  async findAll(): Promise<Player[]> {
    return await this.playerModel.findAll();
  }

  async findOne(id: number): Promise<Player> {
    try {
      const player = await this.playerModel.findByPk(id);

      if (!player) {
        throw new NotFoundException(`Player with ${id} not found`);
      }

      return player;
    } catch (error) {
      const e = error as Error;
      this.logger.error(e?.message, e?.stack);
      throw e;
    }
  }

  async update(id: number, updatePlayerDto: UpdatePlayerDto): Promise<Player> {
    try {
      const [affected_rows] = await this.playerModel.update(updatePlayerDto, {
        where: { id },
      });

      if (affected_rows === 0) {
        throw new NotFoundException(`Player with id ${id} not found`);
      }

      return this.findOne(id);
    } catch (error) {
      const e = error as Error;
      this.logger.error(e?.message, e?.stack);
      throw e;
    }
  }

  async remove(id: number): Promise<void> {
    const player = await this.findOne(id);
    return await player.destroy();
  }
}
