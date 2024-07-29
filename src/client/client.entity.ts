// src/client/client.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';
import { IsString, IsNotEmpty } from 'class-validator';
import { Programme } from '../programme/programme.entity';

@Entity()
export class Client {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsString()
  @IsNotEmpty()
  nom: string;

  @Column()
  @IsString()
  @IsNotEmpty()
  adresse: string;

  @Column()
  @IsString()
  @IsNotEmpty()
  modePay: string;

  @Column()
  @IsString()
  @IsNotEmpty()
  statut: string;

  @ManyToMany(() => Programme, programme => programme.clients)
  programmes: Programme[];
}
