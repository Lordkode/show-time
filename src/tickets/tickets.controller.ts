import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';

@Controller('tickets')
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  // Route pour créer un ticket
  @Post()
  async create(@Body() createTicketDto: CreateTicketDto) {
    return await this.ticketsService.create(createTicketDto);
  }

  // Route pour récupérer tous les tickets
  @Get()
  async findAll() {
    return await this.ticketsService.findAll();
  }

  // Route pour récupérer un ticket par ID
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.ticketsService.findOne(id);
  }

  // Route pour mettre à jour un ticket (par exemple, marquer comme utilisé)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateTicketDto: UpdateTicketDto) {
    return await this.ticketsService.update(id, updateTicketDto);
  }

  // // Route pour supprimer un ticket
  // @Delete(':id')
  // async remove(@Param('id') id: string) {
  //   return await this.ticketsService.remove(id);
  // }
}
