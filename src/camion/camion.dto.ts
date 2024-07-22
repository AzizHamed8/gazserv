import { IsInt, IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateCamionDto {
  @IsInt()
  @IsNotEmpty()
  serie: number;

  @IsInt()
  @IsNotEmpty()
  chassis: number;

  @IsString()
  @IsNotEmpty()
  type: string;

  @IsInt()
  @IsNotEmpty()
  maxQt: number;

  @IsString()
  @IsNotEmpty()
  statut: string;
}

export class UpdateCamionDto {
  @IsInt()
  @IsOptional()
  serie?: number;

  @IsInt()
  @IsOptional()
  chassis?: number;

  @IsString()
  @IsOptional()
  type?: string;

  @IsInt()
  @IsOptional()
  maxQt?: number;

  @IsString()
  @IsOptional()
  statut?: string;
}