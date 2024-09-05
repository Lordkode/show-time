import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Category } from '../modules/categories/schemas/category.schema';

@Schema({ timestamps: true })
export class Event extends Document {
  @Prop({ required: true })
  username: string;

  @Prop({ required: true })
  description: Text;

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

  @Prop({ type: Types.ObjectId, ref: 'Category', required: true })
  category_id: Types.ObjectId;
}

export const EventSchema = SchemaFactory.createForClass(Event);
