import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
  @Prop({ unique: true, required: true, auto: true })
  id: number;

  @Prop({ required: true })
  username: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true, minlength: 4, maxlength: 12 })
  password: string;
  @Prop({ required: true })
  phone: number;

  @Prop({ default: false, required: true })
  is_admin: boolean;

  @Prop({ timestamps: true, default: Date.now(), immutable: true })
  created_at: Date;

  @Prop({ timestamps: true, default: Date.now(), immutable: true })
  updated_at: Date;

  @Prop({ default: null })
  favorite: object;

  @Prop({ default: null })
  avatar: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
