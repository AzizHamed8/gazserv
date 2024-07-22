import { IsString, IsInt, IsNotEmpty, IsEmail, IsOptional } from 'class-validator';

export class CreateChauffeurDto {
  @IsString()
  @IsNotEmpty()
  nom: string;

  @IsString()
  @IsNotEmpty()
  prenom: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsInt()
  @IsNotEmpty()
  cin: number;

  @IsInt()
  @IsNotEmpty()
  code: number;

  @IsString()
  @IsNotEmpty()
  statut: string;

  @IsString()
  @IsNotEmpty()
  login: string;

  @IsString()
  @IsNotEmpty()
  mdp: string;
}

export class UpdateChauffeurDto {
  @IsString()
  @IsOptional()
  nom?: string;

  @IsString()
  @IsOptional()
  prenom?: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsInt()
  @IsOptional()
  cin?: number;

  @IsInt()
  @IsOptional()
  code?: number;

  @IsString()
  @IsOptional()
  statut?: string;

  @IsString()
  @IsOptional()
  login?: string;

  @IsString()
  @IsOptional()
  mdp?: string;
}