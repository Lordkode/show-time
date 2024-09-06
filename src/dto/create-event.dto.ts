import {
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
  IsDate,
} from 'class-validator';

import { Type } from 'class-transformer';

import { Types } from 'mongoose';

export class CreateEventDto {
  @IsString()
  @MaxLength(100)
  @IsNotEmpty()
  readonly title: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(1500)
  readonly description: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  readonly promoteur: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(60)
  readonly location: string;

  @IsDate()
  @Type(() => Date)
  @IsNotEmpty()
  readonly start_time: Date;

  @IsDate()
  @Type(() => Date)
  @IsNotEmpty()
  readonly end_time: Date;

  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  readonly total_tickets: number;

  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  readonly available: number;

  //   @IsNumber()
  //   @Type(() => Types.ObjectId)
  //   @IsNotEmpty()
  //   readonly category_id: number;

  @IsString()
  @IsNotEmpty()
  readonly thumbnail: string;
}
