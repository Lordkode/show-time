import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as QRCode from 'qrcode';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { Ticket, TicketDocument } from './schemas/ticket.schema';

@Injectable()
export class TicketsService {
  constructor(@InjectModel(Ticket.name) private readonly ticketModel: Model<TicketDocument>) {}

  async create(createTicketDto: CreateTicketDto): Promise<Ticket> {
    const { eventId, userId } = createTicketDto;

    const ticketNumber = this.generateTicketNumber();
    const qrCodeData = `${eventId}-${ticketNumber}`;
    const qrCode = await QRCode.toDataURL(qrCodeData);  

    const newTicket = new this.ticketModel({
      eventId,
      userId,
      ticketNumber,
      qrCode,
      used: false,  
      createdAt: new Date(),
    });

    return await newTicket.save();
  }

  async findAll(): Promise<Ticket[]> {
    return await this.ticketModel.find().exec();
  }

  async findOne(id: string): Promise<Ticket> {
    return await this.ticketModel.findById(id).exec();
  }

  async update(id: string, updateTicketDto: UpdateTicketDto): Promise<Ticket> {
    return await this.ticketModel.findByIdAndUpdate(id, updateTicketDto, { new: true }).exec();
  }

  // // Supprimer un ticket
  // async remove(id: string): Promise<Ticket> {
  //   return await this.ticketModel.findByIdAndRemove(id).exec();
  // }

  private generateTicketNumber(): string {
    return Math.random().toString(36).substr(2, 9).toUpperCase();
  }
}
