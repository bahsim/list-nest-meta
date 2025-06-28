import { IsString, IsOptional } from 'class-validator';

export class CreateWishDto {
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;
} 