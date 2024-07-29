// src/programme/programme.dto.ts
import { IsInt, IsString, IsNotEmpty, IsOptional, IsArray } from 'class-validator';

export class CreateProgrammeDto {
  @IsInt()
  @IsNotEmpty()
  nbVide: number;

  @IsInt()
  @IsNotEmpty()
  nbPleine: number;

  @IsString()
  @IsNotEmpty()
  statut: string;

  @IsInt()
  @IsNotEmpty()
  chauffeurId: number;

  @IsInt()
  @IsNotEmpty()
  camionId: number;

  @IsArray()
  @IsInt({ each: true })
  @IsOptional()
  clientIds?: number[]; // Liste des IDs de clients associés
}

export class UpdateProgrammeDto {
  @IsInt()
  @IsOptional()
  nbVide?: number;

  @IsInt()
  @IsOptional()
  nbPleine?: number;

  @IsString()
  @IsOptional()
  statut?: string;

  @IsInt()
  @IsOptional()
  chauffeurId?: number;

  @IsInt()
  @IsOptional()
  camionId?: number;

  @IsArray()
  @IsInt({ each: true })
  @IsOptional()
  clientIds?: number[]; // Liste des IDs de clients associés
}
