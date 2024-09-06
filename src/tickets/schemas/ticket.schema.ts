import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TicketDocument = Ticket & Document;

@Schema()
export class Ticket {
  @Prop({ required: true })
  eventId: string

  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  ticketNumber: string;

  @Prop({ required: true })
  qrCode: string;  // Stocke le QR code généré

  @Prop({ default: false })
  used: boolean;  // Indique si le ticket a été utilisé ou non

  @Prop({ required: true })
  createdAt: Date;
}

export const TicketSchema = SchemaFactory.createForClass(Ticket);
