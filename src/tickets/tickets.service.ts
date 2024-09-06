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

  // Créer un nouveau ticket avec QR code
  async create(createTicketDto: CreateTicketDto): Promise<Ticket> {
    const { eventId, userId } = createTicketDto;

    const ticketNumber = this.generateTicketNumber();
    const qrCodeData = `${eventId}-${ticketNumber}`;
    const qrCode = await QRCode.toDataURL(qrCodeData);  // Générer le QR code en tant qu'image

    const newTicket = new this.ticketModel({
      eventId,
      userId,
      ticketNumber,
      qrCode,
      used: false,  // Par défaut, le ticket n'est pas utilisé
      createdAt: new Date(),
    });

    return await newTicket.save();
  }

  // Récupérer tous les tickets
  async findAll(): Promise<Ticket[]> {
    return await this.ticketModel.find().exec();
  }

  // Récupérer un ticket par ID
  async findOne(id: string): Promise<Ticket> {
    return await this.ticketModel.findById(id).exec();
  }

  // Mettre à jour un ticket (par exemple, marquer un ticket comme utilisé)
  async update(id: string, updateTicketDto: UpdateTicketDto): Promise<Ticket> {
    return await this.ticketModel.findByIdAndUpdate(id, updateTicketDto, { new: true }).exec();
  }

  // // Supprimer un ticket
  // async remove(id: string): Promise<Ticket> {
  //   return await this.ticketModel.findByIdAndRemove(id).exec();
  // }

  // Générer un numéro de ticket unique
  private generateTicketNumber(): string {
    return Math.random().toString(36).substr(2, 9).toUpperCase();
  }
}
