import { IsString, IsOptional } from 'class-validator';

export class CreateOfferDto {
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;
} 