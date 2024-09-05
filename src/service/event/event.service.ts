import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateEventDto } from 'src/dto/create-event.dto';
import { IEvent } from 'src/interface/event.interface';
import { Model } from 'mongoose';
import { UpdateEventDto } from 'src/dto/update-event.dto';

@Injectable()
export class EventService {
  constructor(@InjectModel('Event') private eventModel: Model<IEvent>) {}
  async createEvent(createEventDto: CreateEventDto): Promise<IEvent> {
    const newEvent = await new this.eventModel(createEventDto);
    return newEvent.save();
  }

  async updateEvent(
    eventId: string,
    updateEventDto: UpdateEventDto,
  ): Promise<IEvent> {
    const existingEvent = await this.eventModel.findByIdAndUpdate(
      eventId,
      updateEventDto,
      { new: true },
    );
    if (!existingEvent) {
      throw new NotFoundException(`Event #${eventId} not found`);
    }
    return existingEvent;
  }

  async getAllEvents(): Promise<IEvent[]> {
    const eventData = await this.eventModel.find();
    if (!eventData || eventData.length == 0) {
      throw new NotFoundException('Events data not found!');
    }
    return eventData;
  }
  async getEvent(eventId: string): Promise<IEvent> {
    const existingEvent = await this.eventModel.findById(eventId).exec();
    if (!existingEvent) {
      throw new NotFoundException(`Event #${eventId} not found`);
    }
    return existingEvent;
  }
  async deleteEvent(eventId: string): Promise<IEvent> {
    const deletedEvent = await this.eventModel.findByIdAndDelete(eventId);
    if (!deletedEvent) {
      throw new NotFoundException(`Event #${eventId} not found`);
    }
    return deletedEvent;
  }
}
