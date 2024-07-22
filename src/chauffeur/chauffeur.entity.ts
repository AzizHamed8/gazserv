// src/chauffeur/chauffeur.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { IsString, IsNotEmpty, IsEmail, IsInt } from 'class-validator';
import { Programme } from '../programme/programme.entity';

@Entity()
export class Chauffeur {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsString()
  @IsNotEmpty()
  nom: string;

  @Column()
  @IsString()
  @IsNotEmpty()
  prenom: string;

  @Column()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Column()
  @IsInt()
  @IsNotEmpty()
  cin: number;

  @Column()
  @IsInt()
  @IsNotEmpty()
  code: number;

  @Column()
  @IsString()
  @IsNotEmpty()
  statut: string;

  @Column()
  @IsString()
  @IsNotEmpty()
  login: string;

  @Column()
  @IsString()
  @IsNotEmpty()
  mdp: string;

  @OneToMany(() => Programme, programme => programme.chauffeur)
  programmes: Programme[];
}
