import { Type } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsBoolean,
  IsString,
  MinLength,
  IsNumber,
  IsOptional,
  IsArray,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @MinLength(4)
  @IsNotEmpty()
  password: string;

  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  phone: number;

  @Type(() => Boolean)
  @IsBoolean()
  is_admin: boolean;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  favorite: string[] | null;

  avatar?: string;
}
