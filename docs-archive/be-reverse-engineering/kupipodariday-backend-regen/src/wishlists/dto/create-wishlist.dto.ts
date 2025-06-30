import { IsString, IsOptional } from 'class-validator';

export class CreateWishlistDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;
} 