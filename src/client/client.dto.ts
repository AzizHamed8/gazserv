import { IsString, IsInt, IsNotEmpty, IsEnum, IsOptional } from 'class-validator';

export class CreateClientDto {
  @IsString()
  @IsNotEmpty()
  nom: string;

  @IsString()
  @IsNotEmpty()
  adresse: string;

  @IsEnum(['TPE', 'cheque', 'espece'])
  @IsNotEmpty()
  modePay: string;

  @IsEnum(['payé', 'non payé'])
  @IsNotEmpty()
  statut: string;
}

export class UpdateClientDto {
  @IsString()
  @IsOptional()
  nom?: string;

  @IsString()
  @IsOptional()
  adresse?: string;

  @IsEnum(['TPE', 'cheque', 'espece'])
  @IsOptional()
  modePay?: string;

  @IsEnum(['payé', 'non payé'])
  @IsOptional()
  statut?: string;
}