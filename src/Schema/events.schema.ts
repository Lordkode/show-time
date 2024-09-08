import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types, SchemaTypes } from 'mongoose';

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
  // @Prop({ type: Types.ObjectId, ref: 'Category', required: true })
  // category_id: Types.ObjectId;

  @Prop({ type: String, required: true })
  thumbnail: string;

  // @Prop({ ref: 'User', type: SchemaTypes.ObjectId, required: true })
  // userId: Types.ObjectId;
}

export const EventSchema = SchemaFactory.createForClass(Event);
