import { Injectable, Logger } from '@nestjs/common';
import { nanoid } from 'nanoid';
import { CreateEventDto } from './dto/create-event.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Event } from 'database/models';

@Injectable()
export class EventService {
  private readonly logger = new Logger(EventService.name);

  constructor(@InjectModel(Event) private readonly eventModel: typeof Event) {}

  async create(createEventDto: CreateEventDto): Promise<Event> {
    try {
      const slug = `team-${nanoid()}`;
      return await this.eventModel.create({
        title: createEventDto.title,
        slug: slug,
      } as Event);
    } catch (error) {
      const e = error as Error;
      this.logger.error(e?.message, e?.stack);
      throw e;
    }
  }

  findAll() {
    return `This action returns all event`;
  }

  findOne(id: number) {
    return `This action returns a #${id} event`;
  }

  update(id: number) {
    return `This action updates a #${id} event`;
  }

  remove(id: number) {
    return `This action removes a #${id} event`;
  }
}
