import { Document, Types } from 'mongoose';

export interface IEvent extends Document {
  readonly title: string;

  readonly description: Text;

  readonly promoteur: string;

  readonly location: string;

  readonly start_time: Date;

  readonly end_time: Date;

  readonly total_tickets: number;

  readonly available: number;

  readonly thumbnail: string;

  // readonly userId: string;
}
