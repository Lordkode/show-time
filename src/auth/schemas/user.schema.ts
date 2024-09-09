import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class User extends Document {
  @Prop({ required: true })
  username: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true, minlength: 4 })
  password: string;

  @Prop({ required: true })
  phone: number;

  @Prop({ default: false })
  is_admin: boolean;

  @Prop({ default: null, type: [String] })
  favorite: string[];

  @Prop({ default: null })
  avatar: string | null;
}

export const UserSchema = SchemaFactory.createForClass(User);
