import {
  IsEmail,
  IsNotEmpty,
  IsBoolean,
  IsString,
  MinLength,
  IsNumber,
  IsEmpty,
} from 'class-validator';

export class UpdateUserDto {
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

  @IsNumber()
  @IsNotEmpty()
  phone: number;

  @IsBoolean()
  is_admin: boolean;

  @IsString()
  @IsEmpty()
  favorite: string[];

  avatar?: string;
}
