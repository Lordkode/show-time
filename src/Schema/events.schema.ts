import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Event extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  promoteur: string;

  @Prop({ required: true })
  location: string;

  @Prop({ timestamps: true })
  start_time: Date;

  @Prop({ timestamps: true })
  end_time: Date;

  @Prop({ required: true })
  total_tickets: number;

  @Prop({ required: true })
  available: number;

  @Prop({ required: true })
  thumbnail: string;
}

export const EventSchema = SchemaFactory.createForClass(Event);
