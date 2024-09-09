import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
  UploadedFile,
  UseInterceptors,
  Redirect,
  Render,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { CreateEventDto } from 'src/dto/create-event.dto';
import { UpdateEventDto } from 'src/dto/update-event.dto';
import { EventService } from 'src/service/event/event.service';

@Controller('event')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  // Create a new event
  @Post()
  @Redirect('/events/dash')
  @UseInterceptors(
    FileInterceptor('thumbnail', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
        },
      }),
    }),
  )
  async createEvent(
    @Res() response,
    @Body() createEventDto: CreateEventDto,
    @UploadedFile() thumbnail: Express.Multer.File,
  ) {
    try {
      if (thumbnail) {
        createEventDto.thumbnail = thumbnail.filename;
      }
      const newEvent = await this.eventService.createEvent(createEventDto);
      return response.status(HttpStatus.CREATED).json({
        message: 'Event created successfully',
        newEvent,
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Error: Event not created!',
        error: 'Bad Request',
      });
    }
  }

  // View add event form
  @Get('/add-event')
  @Render('add-event')
  addEvent() {}

  // Update an event
  @Put('/:id')
  @UseInterceptors(
    FileInterceptor('thumbnail', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
        },
      }),
    }),
  )
  async updateEvent(
    @Res() response,
    @Param('id') eventId: string,
    @Body() updateEventDto: UpdateEventDto,
    @UploadedFile() thumbnail: Express.Multer.File,
  ) {
    try {
      if (thumbnail) {
        updateEventDto.thumbnail = thumbnail.filename;
      }
      const updatedEvent = await this.eventService.updateEvent(
        eventId,
        updateEventDto,
      );
      return response.status(HttpStatus.OK).json({
        message: 'Event updated successfully',
        updatedEvent,
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Error: Event not updated!',
        error: 'Bad Request',
      });
    }
  }

  // Get all events
  @Get()
  @Render('event/index')
  async getEvents(@Res() response) {
    try {
      const eventData = await this.eventService.getAllEvents();
      return { eventData };
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Error: Unable to get events',
        error: 'Bad Request',
      });
    }
  }

  // Get event by ID
  @Get('/:id')
  @Render('event/event-details')
  async getEvent(@Res() response, @Param('id') eventId: string) {
    try {
      const existingEvent = await this.eventService.getEvent(eventId);
      return { existingEvent };
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Error: Unable to get event',
        error: 'Bad Request',
      });
    }
  }

  // Delete an event
  @Delete('/:id')
  @Redirect('/events/dash')
  async deleteEvent(@Res() response, @Param('id') eventId: string) {
    try {
      const deletedEvent = await this.eventService.deleteEvent(eventId);
      return response.status(HttpStatus.OK).json({
        message: 'Event deleted successfully',
        deletedEvent,
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Error: Unable to delete event',
        error: 'Bad Request',
      });
    }
  }
}
