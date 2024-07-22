// src/camion/camion.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { IsString, IsInt, IsNotEmpty } from 'class-validator';
import { Programme } from '../programme/programme.entity';

@Entity()
export class Camion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsInt()
  @IsNotEmpty()
  serie: number;

  @Column()
  @IsInt()
  @IsNotEmpty()
  chassis: number;

  @Column()
  @IsString()
  @IsNotEmpty()
  type: string;

  @Column()
  @IsInt()
  @IsNotEmpty()
  maxQt: number;

  @Column()
  @IsString()
  @IsNotEmpty()
  statut: string;

  @OneToMany(() => Programme, programme => programme.camion)
  programmes: Programme[];
}
