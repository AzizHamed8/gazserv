import { IsInt, IsString, IsNotEmpty } from 'class-validator';

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

  clientIds: number[]; // Liste des IDs de clients associés
}

export class UpdateProgrammeDto {
  @IsInt()
  @IsNotEmpty()
  nbVide?: number;

  @IsInt()
  @IsNotEmpty()
  nbPleine?: number;

  @IsString()
  @IsNotEmpty()
  statut?: string;

  @IsInt()
  @IsNotEmpty()
  chauffeurId?: number;

  @IsInt()
  @IsNotEmpty()
  camionId?: number;

  clientIds?: number[]; // Liste des IDs de clients associés
}