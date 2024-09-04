import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Category extends Document {
  @Prop({ unique: true, required: true, auto: true })
  id: number;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ timestamps: true, default: Date.now(), immutable: true })
  created_at: Date;

  @Prop({ timestamps: true, default: Date.now(), immutable: true })
  updated_at: Date;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
