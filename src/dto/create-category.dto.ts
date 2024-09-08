import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
export class CreateCategoryDto {
  @IsString()
  @MaxLength(50)
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @MaxLength(500)
  readonly description: string;
}
