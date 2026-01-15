import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Athlete } from '../athlete/athlete.entity';

@Entity('AthleteSportProfile')
export class AthleteSportProfile {
  @PrimaryGeneratedColumn('uuid')
  pkAthleteSportProfile: string;

  @Column('uuid')
  fkAthlete: string;

  @Column('text', { default: 'unknown' })
  dominantFoot: string;

  @Column('text', { nullable: true })
  primaryPosition: string;

  @Column('text', { nullable: true })
  secondaryPosition: string;

  @Column('integer', { nullable: true })
  heightCm: number;

  @Column('integer', { nullable: true })
  weightKg: number;

  @Column('integer', { nullable: true })
  jerseyNumber: number;

  @Column('text', { nullable: true })
  skillLevel: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToOne(() => Athlete)
  @JoinColumn({ name: 'fkAthlete' })
  athlete: Athlete;
}