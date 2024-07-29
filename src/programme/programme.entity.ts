// src/programme/programme.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, ManyToMany, JoinTable } from 'typeorm';
import { IsInt, IsString, IsNotEmpty } from 'class-validator';
import { Chauffeur } from '../chauffeur/chauffeur.entity';
import { Camion } from '../camion/camion.entity';
import { Client } from '../client/client.entity';

@Entity()
export class Programme {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsInt()
  @IsNotEmpty()
  nbVide: number;

  @Column()
  @IsInt()
  @IsNotEmpty()
  nbPleine: number;

  @Column()
  @IsString()
  @IsNotEmpty()
  statut: string;

  @ManyToOne(() => Chauffeur, chauffeur => chauffeur.programmes, { nullable: false })
  chauffeur: Chauffeur;

  @ManyToOne(() => Camion, camion => camion.programmes, { nullable: false })
  camion: Camion;

  @ManyToMany(() => Client, client => client.programmes)
  @JoinTable()
  clients: Client[];
}
