import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from './users.schema';
import { Ticket } from './tickets.schema';

@Schema()
export class Payement extends Document {
  @Prop({ unique: true, required: true, auto: true })
  id: number;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user_id: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Ticket', required: true })
  ticket_id: Types.ObjectId;

  @Prop({ required: true })
  amount: number;

  @Prop({ required: true })
  payment_method: string;

  @Prop({ default: 'completed', enum: ['pending', 'completed', 'failed'] })
  payment_status: string;

  @Prop({ unique: true, required: true, auto: true })
  transaction_id: number;

  @Prop({ timestamps: true, default: Date.now(), immutable: true })
  payment_date: Date;
}

export const PayementSchema = SchemaFactory.createForClass(Payement);
