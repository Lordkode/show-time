import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from '../modules/users/schemas/users.schema';
import { Event } from './events.schema';

@Schema({ timestamps: true })
export class Ticket extends Document {
  @Prop({ type: Types.ObjectId, ref: 'Event', required: true })
  event_id: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user_id: Types.ObjectId;

  @Prop({ required: true })
  ticket_type: string;

  @Prop({ required: true })
  price: number;

  @Prop({ default: 'paid', enum: ['paid', 'used'] })
  status: string;
}

export const TicketSchema = SchemaFactory.createForClass(Ticket);
