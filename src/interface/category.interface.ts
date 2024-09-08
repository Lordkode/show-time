import { Document } from 'mongoose';
export interface ICategory extends Document {
  readonly name: string;
  readonly description: string;
}
